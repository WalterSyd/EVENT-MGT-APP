from faker import Faker
from models import db, User, Event
from config import app
from werkzeug.security import generate_password_hash
from datetime import datetime, time
import random


fake = Faker()


def seed_db():
    print("Seeding database...")
    with app.app_context():
        db.create_all()  # Create tables


        # Clear existing data
        db.session.query(User).delete()
        db.session.query(Event).delete()


        # Create fake users
        for _ in range(10):
            user = User(
                username=fake.user_name(),
                email=fake.email(),
                password_hash=generate_password_hash(fake.password()),  # Hashing the password
                role='user'
            )
            db.session.add(user)


        # Define a list of categories
        categories = ['All', 'Sports', 'Art', 'Food']

        # Create fake events
        for _ in range(24):
            event_date = datetime.strptime(fake.date(), '%Y-%m-%d')  
            event_time = datetime.strptime(fake.time(), '%H:%M:%S').time() 
            category = random.choice(categories)  # Select a random category
            event = Event(
                title=fake.catch_phrase(),
                description=fake.text(max_nb_chars=200),
                date=event_date,  
                time=event_time, 
                location=fake.city(),
                category=category,  # Add the category field
                created_by=1  
            )
            db.session.add(event)


        db.session.commit() 
        print("Database seeded successfully.")


seed_db()