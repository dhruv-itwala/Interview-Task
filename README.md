
# Interview Scheduling Application

This is a simple application designed to assist HR professionals with scheduling interviews. The application provides an interactive calendar interface for selecting time slots and assigning them for interviews, similar to Google Calendar. It allows HRs to create, delete, and update interview timeslots, ensuring no events overlap or clash.

## Features

- **Frontend:**
  - A calendar interface where HR can select available time slots for interviews.
  - Display a list of scheduled interviews with the ability to update or delete them.
  - Optionally implement login for HRs to create and manage schedules independently.

- **Backend (API):**
  - API endpoints to manage interview time slots.
  - Prevent slot conflicts to ensure no double-booking of time slots.
  - HR user registration and login functionality.

## API Endpoints

- **Interview Timeslots API:**
  - `GET /api/ts/all` — Get all available timeslots.
  - `POST /api/ts/create` — Create a new interview timeslot.
  - `PUT /api/ts/update` — Update an existing interview timeslot.
  - `DELETE /api/ts/delete` — Delete a timeslot.

- **HR API:**
  - `POST /api/hr/register` — Register a new HR.
  - `POST /api/hr/login` — Log in as an HR.


### Prerequisites

- Node.js (preferably version 14 or later)
- MongoDB (if using MongoDB for data storage)
- React (for the frontend)


## Live Demo

- **Frontend**: [Live Demo Link (Replace with actual URL)](https://interview-task-wy45.onrender.com)
Test email id : tu1@gmail.com 
Test password : 1234567890
