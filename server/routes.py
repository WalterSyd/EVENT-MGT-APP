from flask import jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, create_refresh_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, Event, Registration, db
from config import app
from flask_restful import Resource, Api

api = Api(app)
jwt = JWTManager(app)

#Defined route to register an user
class Register(Resource):
    def post(self):
        # Get the request data
        data = request.get_json()
        
        # Check for validity of request data
        if not data:
            return jsonify(message="Invalid request data."), 400
        
        # Check if user already exists
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return jsonify(message="User already exists."), 400
        
        # Create a new user
        new_user = User(
            username=data['username'],
            email=data['email'],
            password_hash=generate_password_hash(data['password']),
            role=data['role']  
        )
        db.session.add(new_user)
        db.session.commit()
        
        # Create a new registration for the user
        new_registration = Registration(
            user_id=new_user.id,
            event_id=None  
        )
        db.session.add(new_registration)
        db.session.commit()
        
        return jsonify(message="User registered successfully."), 201

#Defined route to login
class Login(Resource):
    def post(self):
        # Get the request data
        data = request.json
        
        # Check if the user exists and the password is correct
        user = User.query.filter_by(email=data['email']).first()
        if user and check_password_hash(user.password_hash, data['password']):
            # Create an access token
            access_token = create_access_token(identity={'email': user.email, 'role': user.role})
            return jsonify(access_token=access_token, refresh_token='dummy_refresh_token'), 200
        return jsonify(message='Invalid credentials'), 401

#Defined route to refresh the access token
class Refresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        # Get the current user
        current_user = User.query.filter_by(id=get_jwt_identity()).first()
        
        # Create a new access token
        new_access_token = create_access_token(identity=current_user.id)
        return jsonify(access_token=new_access_token), 200

#Defined route to get a list of all events
class Events(Resource):
    def get(self):
        # Get all events
        events = Event.query.all()
        return jsonify([event.serialize() for event in events])

#Defined route to get a specific event by ID
class Event(Resource):
    def get(self, event_id):
        # Get the event by ID
        event = Event.query.get_or_404(event_id)
        return jsonify({
            'id': event.id,
            'title': event.title,
            'description': event.description,
            'date': event.date,
            'time': event.time,
            'location': event.location
        }), 200

    #Defined route to update an event
    @jwt_required()
    def put(self, event_id):
        # Get the request data
        data = request.json
        
        # Get the event by ID
        event = Event.query.get_or_404(event_id)
        
        # Update the event
        event.title = data['title']
        event.description = data['description']
        event.date = data['date']
        event.time = data['time']
        event.location = data['location']
        db.session.commit()
        return jsonify(message="Event updated successfully."), 200

    #Defined route to delete an event
    @jwt_required()
    def delete(self, event_id):
        # Get the event by ID
        event = Event.query.get_or_404(event_id)
        
        # Delete the event
        db.session.delete(event)
        db.session.commit()
        return jsonify(message="Event deleted successfully."), 200

#Defined route to register for an event
class RegisterForEvent(Resource):
    def post(self, event_id):
        # Get the user ID
        user_id = get_jwt_identity()['id']
        
        # Get the user and event
        user = User.query.get(user_id)
        event = Event.query.get(event_id)
        
        # Check if the user and event exist
        if not user or not event:
            return jsonify(message="Invalid user or event."), 400
        
        # Check if the user is already registered for the event
        existing_registration = Registration.query.filter_by(user_id=user_id, event_id=event_id).first()
        if existing_registration:
            return jsonify(message="User is already registered for this event."), 400
        
        # Create a new registration
        new_registration = Registration(
            user_id=user_id,
            event_id=event_id
        )
        db.session.add(new_registration)
        db.session.commit()
        return jsonify(message="User registered for the event successfully."), 201

#Defined route to get all events a user has registered for
class RegisteredEvents(Resource):
    def get(self):
        # Get the user ID
        user_id = get_jwt_identity()['id']
        
        # Get the user
        user = User.query.get(user_id)
        
        # Check if the user exists
        if not user:
            return jsonify(message="Invalid user."), 400
        
        # Get the registered events
        registered_events = user.registrations
        return jsonify([event.event.serialize() for event in registered_events])

#Route to create a new event ADMIN
class CreateEvent(Resource):
    @jwt_required() 
    def post(self):
        # Get the current user
        current_user = get_jwt_identity()  
        
        # Get the request data
        data = request.json
        
        # Create a new event
        new_event = Event(
            title=data['title'],
            description=data['description'],
            date=data['date'],
            time=data['time'],
            location=data['location'],
            created_by=current_user['email']  
        )
        db.session.add(new_event)
        db.session.commit()
        return jsonify(message="Event created successfully"), 201

api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(Refresh, '/refresh')
api.add_resource(Events, '/events')
api.add_resource(Event, '/events/<int:event_id>')
api.add_resource(RegisterForEvent, '/events/<int:event_id>/register')
api.add_resource(RegisteredEvents, '/registered-events')
api.add_resource(CreateEvent, '/events/admin')