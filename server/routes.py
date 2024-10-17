# routes.py
from flask import jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, \
    jwt_required, create_refresh_token, get_jwt_identity, check_password_hash
from models import User, Event, Registration, db
from config import app
from werkzeug.security import generate_password_hash

jwt = JWTManager(app)

#Defined route to register anuser
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify(message="Invalid request data."), 400

    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify(message="User already exists."), 400

    new_user = User(
        username=data['username'],
        email=data['email'],
        password_hash=generate_password_hash(data['password']),
        role=data['role']  # Store the role from the request
    )
    db.session.add(new_user)
    db.session.commit()

    # Create a new registration for the user
    new_registration = Registration(
        user_id=new_user.id,
        event_id=None  # No event is associated with the registration yet
    )
    db.session.add(new_registration)
    db.session.commit()

    return jsonify(message="User registered successfully."), 201

#Defined route to login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity={'email': user.email, 'role': user.role})
        return jsonify(access_token=access_token, refresh_token='dummy_refresh_token'), 200
    return jsonify(message='Invalid credentials'), 401

@app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = User.query.filter_by(id=get_jwt_identity()).first()
    new_access_token = create_access_token(identity=current_user.id)
    return jsonify(access_token=new_access_token), 200

#Defined route to get a list of all events
@app.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([event.serialize() for event in events])

#Defined route to get a specific event by ID
@app.route('/events/<int:event_id>', methods=['GET'])
@jwt_required()
def get_event(event_id):
    event = Event.query.get_or_404(event_id)
    return jsonify({
        'id': event.id,
        'title': event.title,
        'description': event.description,
        'date': event.date,
        'time': event.time,
        'location': event.location
    }), 200

#Defined route to register for an event
@app.route('/events/<int:event_id>/register', methods=['POST'])
def register_for_event(event_id):
    user_id = get_jwt_identity()['id']
    user = User.query.get(user_id)
    event = Event.query.get(event_id)

    if not user or not event:
        return jsonify(message="Invalid user or event."), 400

    # Check if the user is already registered for the event
    existing_registration = Registration.query.filter_by(user_id=user_id, event_id=event_id).first()
    if existing_registration:
        return jsonify(message="User is already registered for this event."), 400

    # Create a new registration for the user
    new_registration = Registration(
        user_id=user_id,
        event_id=event_id
    )
    db.session.add(new_registration)
    db.session.commit()

    return jsonify(message="User registered for the event successfully."), 201

#Defined route to get all events a user has registered for
@app.route('/registered-events', methods=['GET'])
def get_registered_events():
    user_id = get_jwt_identity()['id']
    user = User.query.get(user_id)

    if not user:
        return jsonify(message="Invalid user."), 400

    registered_events = user.registrations
    return jsonify([event.event.serialize() for event in registered_events])

#Route to create a new event ADMIN
@app.route('/events', methods=['POST'])
@jwt_required()  # Protect this route so only authenticated users can access it
def create_event():
    current_user = get_jwt_identity()  # Get user identity from token
    data = request.json

    new_event = Event(
        title=data['title'],
        description=data['description'],
        date=data['date'],
        time=data['time'],
        location=data['location'],
        created_by=current_user['email']  # Use the user's email as the creator
    )
    
    db.session.add(new_event)
    db.session.commit()
    return jsonify(message="Event created successfully"), 201

#Route to update an event
@app.route('/events/<int:event_id>', methods=['PUT'])
@jwt_required()
def update_event(event_id):
    data = request.json
    event = Event.query.get_or_404(event_id)
    event.title = data['title']
    event.description = data['description']
    event.date = data['date']
    event.time = data['time']
    event.location = data['location']
    db.session.commit()
    return jsonify(message="Event updated successfully."), 200

#Route to delete an event
@app.route('/events/<int:event_id>', methods=['DELETE'])
@jwt_required()
def delete_event(event_id):
    event = Event.query.get_or_404(event_id)
    db.session.delete(event)
    db.session.commit()
    return jsonify(message="Event deleted successfully."), 200