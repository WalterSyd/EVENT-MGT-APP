from flask import jsonify, request, make_response
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, Event, Registration, db
from config import app
from flask_restful import Resource, Api
from flask_cors import CORS

api = Api(app)
jwt = JWTManager(app)
CORS(app)

# User Registration
class Register(Resource):
    def post(self):
        data = request.get_json()
        
        if not data or 'email' not in data or 'password' not in data:
            return {"message": "Invalid request data."}, 400
        
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return {"message": "User already exists."}, 400
        
        new_user = User(
            username=data['username'],
            email=data['email'],
            password_hash=generate_password_hash(data['password']),
            role=data.get('role', 'user')  # Default role if not specified
        )
        db.session.add(new_user)
        db.session.commit()
        
        return {"message": "User registered successfully."}, 201

# User Login
class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email=data.get('email')).first()
        
        if not user:
            return {"message": "User not found."}, 404
        
        if not check_password_hash(user.password_hash, data['password']):
            return {"message": "Invalid password."}, 401
        
        access_token = create_access_token(identity={'id': user.id, 'email': user.email, 'role': user.role})
        return {"access_token": access_token}, 200

# Refresh Access Token
class Refresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user_id = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user_id)
        return jsonify(access_token=new_access_token), 200

# List all Events
class Events(Resource):
    def get(self):
        events = Event.query.all()
        return make_response([event.to_dict() for event in events], 200)

# Event Resource for specific actions on an event
class EventResource(Resource):
    def get(self, event_id):
        event = Event.query.get_or_404(event_id)
        return make_response(jsonify(event.to_dict()), 200)

    @jwt_required()
    def put(self, event_id):
        data = request.get_json()
        event = Event.query.get_or_404(event_id)
        event.title = data['title']
        event.description = data['description']
        # event.date = data['date']
        # event.time = data['time']
        event.location = data['location']
        db.session.commit()
        return make_response(jsonify(message="Event updated successfully."), 200)

    @jwt_required()
    def delete(self, event_id):
        event = Event.query.get_or_404(event_id)
        db.session.delete(event)
        db.session.commit()
        return jsonify(message="Event deleted successfully."), 204

# Register for an Event
class RegisterForEvent(Resource):
    # @jwt_required()
    def post(self):
        # user_id = get_jwt_identity()['id']
        data = request.get_json()
        event = Event.query.filter_by(id=data['event']).first()
        
        existing_registration = Registration.query.filter_by(user_id=data["user_id"], event_id=event.id).first()
        if existing_registration:
            return jsonify(message="User is already registered for this event."), 400
        
        new_registration = Registration(user_id=data["user_id"], event_id=event.id)
        db.session.add(new_registration)
        db.session.commit()
        return jsonify(message="User registered for the event successfully."), 201

# Get all events a user has registered for
class RegisteredEvents(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()['id']
        registered_events = Registration.query.filter_by(user_id=user_id).all()
        event_ids = [registration.event_id for registration in registered_events]
        events = Event.query.filter(Event.id.in_(event_ids)).all()
        return jsonify([event.to_dict() for event in events]), 200

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()['id']
        data = request.get_json()
        event_ids = data.get('event_ids', [])
        for event_id in event_ids:
            event = Event.query.get_or_404(event_id)
            registration = Registration.query.filter_by(user_id=user_id, event_id=event_id).first()
            if not registration:
                new_registration = Registration(user_id=user_id, event_id=event_id)
                db.session.add(new_registration)
                db.session.commit()
        return jsonify(message="Events saved successfully."), 201

# Create a new Event (Admin)
class CreateEvent(Resource):
    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        data = request.get_json()
        
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
    

# Update User Profile
class UpdateProfile(Resource):
    @jwt_required()
    def put(self):
        data = request.get_json()
        user_id = get_jwt_identity()['id']
        user = User.query.get_or_404(user_id)
        
        if not user:
            return {"message": "User not found."}, 404
        
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.role = data.get('role', user.role)
        
        db.session.commit()
        
        return {"message": "User profile updated successfully."}, 200


# Change User Password
class ChangePassword(Resource):
    @jwt_required()
    def put(self):
        data = request.get_json()
        user_id = get_jwt_identity()['id']
        user = User.query.get_or_404(user_id)
        
        if not user:
            return {"message": "User not found."}, 404
        
        if not check_password_hash(user.password_hash, data['current_password']):
            return {"message": "Invalid current password."}, 401
        
        user.password_hash = generate_password_hash(data['new_password'])
        
        db.session.commit()
        
        return {"message": "User password changed successfully."}, 200


# Delete User Profile
class DeleteProfile(Resource):
    @jwt_required()
    def delete(self):
        user_id = get_jwt_identity()['id']
        user = User.query.get_or_404(user_id)
        
        if not user:
            return {"message": "User not found."}, 404
        
        db.session.delete(user)
        db.session.commit()
        
        return {"message": "User profile deleted successfully."}, 204

# Define the API resources and routes
api.add_resource(Register, '/api/register')
api.add_resource(Login, '/api/login')
api.add_resource(Refresh, '/api/refresh')
api.add_resource(Events, '/api/events')
api.add_resource(EventResource, '/api/events/<int:event_id>')
api.add_resource(RegisterForEvent, '/api/events/<int:event_id>/register')
api.add_resource(RegisteredEvents, '/api/registered-events')
api.add_resource(CreateEvent, '/api/events/admin')
api.add_resource(UpdateProfile, '/api/profile/update')
api.add_resource(ChangePassword, '/api/profile/change-password')
api.add_resource(DeleteProfile, '/api/profile/delete')

if __name__ == '__main__':
    app.run(debug=True)
