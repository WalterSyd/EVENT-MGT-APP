# EVENT-MGT-APP

The Event Management System is a comprehensive web application designed to streamline the process of creating, managing, and registering for events. It provides an intuitive interface for both users and event organizers, allowing for easy browsing, registration, and event management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Registration & Login**: Users can create accounts and log in to manage their event registrations.
- **Event Browsing**: View a list of upcoming events with detailed information.
- **Event Registration**: Register for events and receive confirmation.
- **Event Creation (Admin Feature)**: Admins can create, edit, and delete events.

## Tech Stack

- **Frontend**: React
- **Backend**: Flask
- **Database**: SQLAlchemy (SQLite for development)
- **Authentication**: JWT
- **Styling**: CSS and any preferred library eg Bootstrap and Tailwind

## Installation

### Prerequisites

- Node.js and npm
- Python 3.x
- Virtualenv (optional but recommended)

### Backend Setup

1. **Clone the repository**:
bash
git clone https://github.com/yourusername/event-management-system.git
cd event-management-system/backend


2. **Create and activate a virtual environment**:
bash
pipenv install
pipenv shell  # On Windows use venv\Scripts\activate


3. **Install dependencies**:
bash
pip install -r requirements.txt


4. **Set up the database**:
bash
flask db init
flask db migrate -m "Initial migration."
flask db upgrade


5. **Run the Flask app**:
bash
python3 app.py


### Frontend Setup

1. **Navigate to the frontend directory**:
bash
cd ../frontend


2. **Install dependencies**:
bash
npm install


3. **Run the React app**:
bash
npm start


## Usage

- Access the application at `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend API.
- Register as a new user or log in with existing credentials.
- Browse available events and register for those of interest and locate them in   the my events section.
- Admin users can create, edit, and delete events through the admin panel.

## File Structure

event-management-system/
├── backend/
│   ├── app/
│   │   ├── init.py
│   │   ├── models.py
│   │   ├── routes.py
│   │   ├── auth.py
│   │   └── config.py
│   ├── migrations/
│   ├── instance/
│   │   └── config.py
│   ├── .env
│   ├── run.py
│   └── requirements.txt
└── frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── EventList.js
│   │   ├── EventDetail.js
│   │   ├── EventForm.js
│   │   ├── LoginForm.js
│   │   └── RegisterForm.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   └── AdminPage.js
│   └── App.js
├── package.json
└── .env


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## Demo Video

You can download and watch the demo video [here](./tools/EVENT-MGT-APP_Video-Explainer.mp4).
     