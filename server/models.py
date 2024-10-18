from config import db
from datetime import datetime
from sqlalchemy.orm import relationship

class User(db.Model):
  __tablename__ = 'users'
  
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(80), nullable=False, unique=True)
  email = db.Column(db.String(120), nullable=False, unique=True)
  password_hash = db.Column(db.String(128), nullable=False)
  role = db.Column(db.String(10), default='user') 
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  refresh_token = db.Column(db.String(255))  
  
  # Define a relationship with Registration
  registrations = relationship('Registration', back_populates='user')

class Event(db.Model):
  __tablename__ = 'events'
  
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100), nullable=False)
  description = db.Column(db.String(500), nullable=False)
  date = db.Column(db.Date, nullable=False)
  time = db.Column(db.Time, nullable=False)
  location = db.Column(db.String(100), nullable=False)
  created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)

  def __repr__(self):
    return f"Event('{self.title}', '{self.date}', '{self.time}')"

  # Define a relationship with User
  creator = db.relationship('User', backref='created_events')

  # Define a relationship with Registration
  registrations = db.relationship('Registration', back_populates='event')

class Registration(db.Model):
  __tablename__ = 'registrations'
  
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
  registered_at = db.Column(db.DateTime, default=datetime.utcnow)

  # Define relationships with User and Event
  user = relationship('User', back_populates='registrations')
  event = relationship('Event', back_populates='registrations')