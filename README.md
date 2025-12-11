# Employee Leave Management System (Full Project)

This archive contains a full-stack sample project (backend + frontend) for the Employee Leave Management System 
backend : npm install -> node seed.js -> npm run
frontend : npm install -> npm run
Seed manager: run `node seed.js` in `backend` to create a sample manager (manager@example.com / password123).



Frontend is minimal(no bootstrap either :(



 Project Structure


Employee_Leave_Management_System/
├── backend/                 # API server
├── frontend/                # Client interface
├── README.md               # This file
└── .gitignore


Setup & Installation

1. Clone the Repository

git clone https://github.com/abh1navrawat/Employee_Leave_Management_System.git
cd Employee_Leave_Management_System

3. Backend Setup

cd backend
npm install


Create a .env file (based on .env.example) if necessary, then:

node seed.js          # Seed example manager user (e.g., manager@example.com / password123)
npm start


The backend will start, typically on:

http://localhost:5000

3. Frontend Setup

Open a new terminal:

cd frontend
npm install
npm start


The frontend UI will launch in your browser (usually at http://localhost:3000).

 Usage
As an Employee

✔ Log in with an account
✔ View your leave balances
✔ Submit leave requests
✔ Track leave status

As a Manager

✔ Review incoming leave applications
✔ Approve or reject requests
✔ View history of leave activities

 Technologies Used
  
Layer	Tech
Frontend	HTML / CSS / JS / (React or similar)
Backend	Node.js, Express
Database	(Optional based on your setup, e.g., MongoDB/MySQL)
Authentication	JWT / local auth
