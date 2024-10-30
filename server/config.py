
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import timedelta
import os
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# Set the database URI to use the instance folder
app.config['SQLALCHEMY_DATABASE_URI'] ='postgresql://event_mastarz_eq03_user:vngczNzfWA1iuUHPUrgKsqa3dgh7tj7i@dpg-csguiljtq21c73e0258g-a.oregon-postgres.render.com/event_mastarz_eq03'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'  # Change this to a secure random key in production
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=40)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30) 

db = SQLAlchemy(app)
migrate = Migrate(app, db)

