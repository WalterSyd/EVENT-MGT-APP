# routes.py
from flask import jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, \
    jwt_required, create_refresh_token, get_jwt_identity
from models import User, Event, Registration, db
from config import app
from werkzeug.security import generate_password_hash

jwt = JWTManager(app)

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify(message="User already exists."), 400
    
    new_user = User(username=data['username'], email=data['email'], password_hash=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(message="User registered successfully."), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    
    if user and user.password_hash == data['password']:  # Password check should use hashing
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        user.refresh_token = refresh_token  # Save refresh token in the database
        db.session.commit()
        
        return jsonify(access_token=access_token, refresh_token=refresh_token), 200
    return jsonify(message="Invalid credentials."), 401

@app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = User.query.filter_by(id=get_jwt_identity()).first()
    new_access_token = create_access_token(identity=current_user.id)
    return jsonify(access_token=new_access_token), 200

@app.route('/events', methods=['GET'])
@jwt_required()
def get_events():
    events = Event.query.all()
    for event in events:
        return jsonify([
            {
                'id': event.id,
                'title': event.title,
                'description': event.description,
                'datetime': f"{event.date} {event.time}",
                'location': event.location
            } 
        ]), 200

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

@app.route('/events', methods=['POST'])
@jwt_required()
def create_event():
    data = request.json
    new_event = Event(
        title=data['title'],
        description=data['description'],
        date=data['date'],
        time=data['time'],
        location=data['location'],
        created_by=get_jwt_identity()
    )
    db.session.add(new_event)
    db.session.commit()
    return jsonify(message="Event created successfully."), 201

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

@app.route('/events/<int:event_id>', methods=['DELETE'])
@jwt_required()
def delete_event(event_id):
    event = Event.query.get_or_404(event_id)
    db.session.delete(event)
    db.session.commit()
    return jsonify(message="Event deleted successfully."), 200