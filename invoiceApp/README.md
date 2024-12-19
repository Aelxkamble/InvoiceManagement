Invoice Management Application

Description

This project is a simple web application that allows users to manage invoices. The application consists of a React-based frontend and a Node.js backend with Express. Users can view a list of invoices and add new invoices via a form. The backend provides endpoints for retrieving and creating invoices, with data stored in memory or a JSON file.

Features

Frontend

Invoice List Page: Displays a list of invoices fetched from the backend.

Add Invoice Page: A form to add a new invoice with the following fields:

Client Name (text input)

Amount (number input)

Due Date (date picker)

Status (dropdown: Paid/Unpaid)

Validates form inputs (e.g., no empty fields, valid amounts).

Displays error messages for failed operations.

Styled using Material-UI.

Backend

GET /invoices: Returns a list of invoices.

POST /invoices: Adds a new invoice to the list.

Data is stored in memory or in a simple JSON file (no database required).

Installation and Usage

Prerequisites

Ensure you have the following installed:

Node.js

npm or yarn

Backend Setup

Navigate to the backend directory:

cd invoice-app-backend

Install dependencies:

npm install

Start the backend server:

npm start

The backend server will run on http://localhost:5000.

Frontend Setup

Navigate to the frontend directory:

cd invoice-app-frontend

Install dependencies:

npm install

Start the development server:

npm start

The frontend application will run on http://localhost:3000.

API Endpoints

GET /invoices

Description: Retrieve a list of invoices.

Response:

[
  {
    "id": "1",
    "clientName": "Client A",
    "amount": 1000,
    "dueDate": "2024-12-31",
    "status": "Unpaid"
  }
]

POST /invoices

Description: Add a new invoice.

Request Body:

{
  "clientName": "Client B",
  "amount": 500,
  "dueDate": "2024-12-20",
  "status": "Paid"
}

Response:

{
  "message": "Invoice added successfully"
}

Folder Structure

project/
|-- backend/
|   |-- controllers/  # Controller files
|   |-- models/       # Model files
|   |-- routes/       # API routes
|   |-- index.js      # Main backend file
|   |-- data.json     # Data storage 
|
|-- frontend/
    |-- src/
        |-- components/  # React components
        |-- api/         # API integration
        |-- App.js       # Main React app file

Validation

Client Name: Cannot be empty.

Amount: Must be a positive number.

Due Date: Must be a valid date.

Status: Must be either "Paid" or "Unpaid".

Technologies Used

Frontend

React

Material-UI

Axios

Backend

Node.js

Express