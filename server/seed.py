from faker import Faker
from models import db, User, Event
from config import app
from werkzeug.security import generate_password_hash
from datetime import datetime
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
            username = fake.user_name()
            email = fake.email()
            password = fake.password()
            hashed_password = generate_password_hash(password)

            # Debugging output
            print(f"Username: {username} (Length: {len(username)})")
            print(f"Email: {email} (Length: {len(email)})")
            print(f"Password Hash: {hashed_password} (Length: {len(hashed_password)})")

            user = User(
                username=username,
                email=email,
                password_hash=hashed_password,
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

            # Debugging output for events
            print(f"Event Title: {event.title} (Length: {len(event.title)})")
            print(f"Event Description: {event.description} (Length: {len(event.description)})")

            db.session.add(event)

        db.session.commit() 
        print("Database seeded successfully.")

seed_db()
