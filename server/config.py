
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import timedelta
import os

app = Flask(__name__)

# Set the database URI to use the instance folder
app.config['SQLALCHEMY_DATABASE_URI'] = (
    'postgresql://events_db_render:ZpzO7AUMNhArofLYhF9AgpLJBYjisEE6@dpg-csgjl8tds78s73c181c0-a/events_db_6xb3?sslmode=require'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'  # Change this to a secure random key in production
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=40)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30) 

db = SQLAlchemy(app)
migrate = Migrate(app, db)

