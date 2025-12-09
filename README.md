# Student Record Management System

A full-stack CRUD application for managing student records with React frontend, Spring Boot backend, and MySQL database.

## Features

✅ **Create** - Add new students with name, age, and email  
✅ **Read** - View all students in a table format  
✅ **Update** - Edit student information  
✅ **Delete** - Remove students from the system  

## Project Structure

```
studentrecordapp/
├── backend/                          # Java Spring Boot API
│   ├── src/main/java/com/studentrecord/
│   │   ├── StudentRecordApplication.java  # Main application
│   │   ├── controller/
│   │   │   └── StudentController.java     # REST endpoints
│   │   ├── model/
│   │   │   └── Student.java               # Student entity
│   │   ├── repository/
│   │   │   └── StudentRepository.java     # Database access
│   │   └── service/
│   │       └── StudentService.java        # Business logic
│   ├── src/main/resources/
│   │   └── application.properties         # Configuration
│   └── pom.xml                            # Maven dependencies
│
├── frontend/                         # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentForm.js         # Add/Edit form
│   │   │   ├── StudentList.js         # Display students
│   │   │   ├── StudentForm.css
│   │   │   └── StudentList.css
│   │   ├── services/
│   │   │   └── StudentService.js      # API client
│   │   ├── App.js                     # Main component
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── .gitignore
│
└── database/
    └── student_db.sql                # Database schema
```

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.1.5
- Spring Data JPA
- MySQL 8.0
- Maven

### Frontend
- React 18.2
- Axios (for API calls)
- CSS3

## Prerequisites

1. **Java Development Kit (JDK 17+)** - https://www.oracle.com/java/technologies/downloads/
2. **Maven 3.6+** - https://maven.apache.org/download.cgi
3. **Node.js and npm** - https://nodejs.org/
4. **MySQL Server 8.0+** - https://dev.mysql.com/downloads/mysql/

## Setup Instructions

### 1. Database Setup

```bash
# Start MySQL server
sudo service mysql start

# Create database and tables
mysql -u root -p < database/student_db.sql
```

### 2. Backend Setup

```bash
cd backend

# Update application.properties with your MySQL password if needed

# Build and run
mvn clean install
mvn spring-boot:run
```

API available at: `http://localhost:8080/api`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Application opens at: `http://localhost:3000`

## API Endpoints

- `POST /api/students` - Create student
- `GET /api/students` - Get all students
- `GET /api/students/{id}` - Get student by ID
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

## Usage Guide

### Add Student
1. Fill form with Name, Age (5-100), Email
2. Click "Add" button

### View Students
Students display in table format with ID, Name, Age, Email

### Delete Student
Click the "Delete" button and confirm

## Database Schema

```sql
CREATE TABLE student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection refused | Ensure MySQL is running |
| Access denied | Update password in application.properties |
| CORS error | Ensure frontend runs on port 3000 |
| npm not found | Install Node.js |
| mvn not found | Install Maven |

## Testing with cURL

```bash
# Create student
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","age":20,"email":"john@example.com"}'

# Get all students
curl http://localhost:8080/api/students

# Update student
curl -X PUT http://localhost:8080/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","age":21,"email":"jane@example.com"}'

# Delete student
curl -X DELETE http://localhost:8080/api/students/1
```

## License

MIT License - Feel free to use this project for learning and development.

---

**Happy Coding!** 🚀
