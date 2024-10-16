from faker import Faker
from models import db, User, Event
from config import app
from werkzeug.security import generate_password_hash
from datetime import datetime, time

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

        # Create fake events
        for _ in range(10):
            event_date = datetime.strptime(fake.date(), '%Y-%m-%d')  # Parse the date string to a date object
            event_time = datetime.strptime(fake.time(), '%H:%M:%S').time()  # Parse the time string into a time object
            event = Event(
                title=fake.catch_phrase(),
                description=fake.text(max_nb_chars=200),
                date=event_date,  # Use the parsed date object
                time=event_time,  # Use the parsed time object
                location=fake.city(),
                created_by=1  # Assuming the first user is the creator
            )
            db.session.add(event)

        db.session.commit()  # Commit the changes to the database
        print("Database seeded successfully.")

seed_db()