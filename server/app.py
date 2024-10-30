
from config import app, db
from flask_migrate import Migrate
from routes import *  # Import routes here
import os

# Initialize extensions
migrate = Migrate(app, db)

# Register the home route
@app.route('/')
def home():
    return "Welcome to the Event Management System API!"

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5555))
    app.run(host="0.0.0.0", port=port, debug=True)