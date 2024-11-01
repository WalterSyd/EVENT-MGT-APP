from config import db
from datetime import datetime
from sqlalchemy.orm import relationship
from sqlalchemy_serializer import SerializerMixin

class User(db.Model, SerializerMixin):
  __tablename__ = 'users'
  
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String, nullable=False, unique=True)
  email = db.Column(db.String, nullable=False, unique=True)
  password_hash = db.Column(db.String, nullable=False)
  role = db.Column(db.String, default='user') 
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  refresh_token = db.Column(db.String)  
  
  # Define a relationship with Registration
  registrations = relationship('Registration', back_populates='user')
   # Define a relationship with User
  created_events = db.relationship('Event',back_populates='creator')

  serialize_rules =('-registrations', '-created_events')

class Event(db.Model, SerializerMixin):
  __tablename__ = 'events'
  
  id = db.Column(db.Integer, primary_key=True)
  category = db.Column(db.String, nullable=False)
  title = db.Column(db.String, nullable=False)
  description = db.Column(db.String, nullable=False)
  date = db.Column(db.Date, nullable=False)
  time = db.Column(db.Time, nullable=False)
  location = db.Column(db.String, nullable=False)
  created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)

  def __repr__(self):
    return f"Event('{self.title}', '{self.date}', '{self.time}')"

  # Define a relationship with User
  creator = db.relationship('User',back_populates='created_events')

  # Define a relationship with Registration
  registrations = db.relationship('Registration', back_populates='event')

  serialize_rules =('-registrations', '-creator')
  

class Registration(db.Model, SerializerMixin):
  __tablename__ = 'registrations'
  
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
  registered_at = db.Column(db.DateTime, default=datetime.utcnow)

  # Define relationships with User and Event
  user = relationship('User', back_populates='registrations')
  event = relationship('Event', back_populates='registrations')

  serialize_rules =('-user', '-event')