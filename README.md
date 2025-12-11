## Student Record Management System

A simple full-stack application to manage student information.
This project was built to practice CRUD operations, REST API development, and connecting a React frontend with a Java Spring Boot backend.

## Features

 **Create** - Add new students with name, age, and email  
 **Read** - View all students in a table format  
 **Update** - Edit student information  
 **Delete** - Remove students from the system  


## Features

**Frontend (React)**

  Add new students

  View list of students

  Edit existing student details

  Delete a student

  Form validation

  Clean and simple UI

**Backend (Spring Boot)**

  REST API for all CRUD operations

  Connected to H2 database (can be switched to MySQL)

  Java-based service and controller layers

  Handles validation and request mapping

**Database**

  H2 in-memory database used for development

  Student table with fields:

    id

    name

    age

    email

## Technologies Used

**Frontend**

  React

  Axios

  CSS

**Backend**

  Java

  Spring Boot

  Spring Data JPA

  H2 Database (development)

## How to Run the Project

**Backend**
    cd backend
    mvn spring-boot:run


Backend will run on:
http://localhost:8080

**Frontend**
    cd frontend
    npm install
    npm start


Frontend will run on:
http://localhost:3000


## Project Structure
student-record-app/
 ├── backend/
 ├── frontend/
 ├── database/
 ├── README.md
 └── .gitignore

## Future Improvements

  Connect to MySQL database

  Add search and filter

  Add pagination

  Improve UI design