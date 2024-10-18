from flask import jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, Event, Registration, db
from config import app
from flask_restful import Resource, Api
from flask_cors import CORS


api = Api(app)
jwt = JWTManager(app)
CORS(app)


# Defined route to register a user
class Register(Resource):
    def post(self):
        data = request.get_json()
        
        if not data:
            return {"message": "Invalid request data."}, 400
        
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return {"message": "User already exists."}, 400
        
        new_user = User(
            username=data['username'],
            email=data['email'],
            password_hash=generate_password_hash(data['password']),
            role=data['role']  
        )
        db.session.add(new_user)
        db.session.commit()
        
        return {"message": "User registered successfully."}, 201


# Defined route to loginclass Login(Resource):
class Login(Resource):
    def post(self):
        data = request.json
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            return {"message": "User not found"}, 404
        elif not check_password_hash(user.password_hash, data['password']):
            return {"message": "Invalid password"}, 401
        else:
            access_token = create_access_token(identity={'id': user.id, 'email': user.email, 'role': user.role})
            return {"access_token": access_token}, 200

# Defined route to refresh the access token
class Refresh(Resource):
  @jwt_required(refresh=True)
  def post(self):
      current_user_id = get_jwt_identity()
      new_access_token = create_access_token(identity=current_user_id)
      return jsonify(access_token=new_access_token), 200


# Defined route to get a list of all events
class Events(Resource):
    def get(self):
        events = Event.query.all()
        return jsonify([event.to_dict() for event in events])

# Defined route to get a specific event by ID
class EventResource(Resource):
  def get(self, event_id):
      event = Event.query.get_or_404(event_id)
      return jsonify(event.serialize()), 200


  @jwt_required()
  def put(self, event_id):
      data = request.json
      event = Event.query.get_or_404(event_id)
      event.title = data['title']
      event.description = data['description']
      event.date = data['date']
      event.time = data['time']
      event.location = data['location']
      db.session.commit()
      return jsonify(message="Event updated successfully."), 200


  @jwt_required()
  def delete(self, event_id):
      event = Event.query.get_or_404(event_id)
      db.session.delete(event)
      db.session.commit()
      return jsonify(message="Event deleted successfully."), 200


# Defined route to register for an event
class RegisterForEvent(Resource):
  @jwt_required()
  def post(self, event_id):
      user_id = get_jwt_identity()
      user = User.query.get(user_id)
      event = Event.query.get(event_id)
      
      if not user or not event:
          return jsonify(message="Invalid user or event."), 400
      
      existing_registration = Registration.query.filter_by(user_id=user_id, event_id=event_id).first()
      if existing_registration:
          return jsonify(message="User is already registered for this event."), 400
      
      new_registration = Registration(user_id=user_id, event_id=event_id)
      db.session.add(new_registration)
      db.session.commit()
      return jsonify(message="User registered for the event successfully."), 201


# Defined route to get all events a user has registered for
class RegisteredEvents(Resource):
  @jwt_required()
  def get(self):
      user_id = get_jwt_identity()
      user = User.query.get(user_id)
      
      if not user:
          return jsonify(message="Invalid user."), 400
      
      registered_events = user.registrations
      return jsonify([event.event.serialize() for event in registered_events])


# Route to create a new event ADMIN
class CreateEvent(Resource):
  @jwt_required()
  def post(self):
      current_user = get_jwt_identity()
      data = request.json
      
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
api.add_resource(EventResource, '/events/<int:event_id>')
api.add_resource(RegisterForEvent, '/events/<int:event_id>/register')
api.add_resource(RegisteredEvents, '/registered-events')
api.add_resource(CreateEvent, '/events/admin')


if __name__ == '__main__':
    app.run(debug=True)