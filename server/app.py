
from config import app, db
from flask_migrate import Migrate
from routes import *  # Import routes here
from dotenv import load_dotenv
load_dotenv()
# Initialize extensions
migrate = Migrate(app, db)

# Register the home route
@app.route('/')
def home():
    return "Welcome to the Event Management System API!"

if __name__ == "__main__":
    app.run(debug=True)  