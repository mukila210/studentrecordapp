# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Web Browser                               │
│                    (http://localhost:3000)                       │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                    HTTP/HTTPS │ CORS
                               │
┌──────────────────────────────▼──────────────────────────────────┐
│                    React Frontend (Port 3000)                    │
├─────────────────────────────────────────────────────────────────┤
│  Components:                                                      │
│  ├── StudentForm.js      (Add/Edit Student)                     │
│  ├── StudentList.js      (Display Students)                     │
│  └── App.js              (Main Container)                       │
│                                                                   │
│  Services:                                                        │
│  └── StudentService.js   (API Integration)                      │
│                                                                   │
│  Styling:                                                         │
│  ├── App.css                                                     │
│  ├── StudentForm.css                                            │
│  └── StudentList.css                                            │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                   RESTful API │ (JSON)
                               │
┌──────────────────────────────▼──────────────────────────────────┐
│            Spring Boot Backend (Port 8080)                       │
├─────────────────────────────────────────────────────────────────┤
│  Controller Layer:                                                │
│  └── StudentController.java  (REST Endpoints)                   │
│      ├── POST   /students          (Create)                     │
│      ├── GET    /students          (Read All)                   │
│      ├── GET    /students/{id}     (Read One)                   │
│      ├── PUT    /students/{id}     (Update)                     │
│      └── DELETE /students/{id}     (Delete)                     │
│                                                                   │
│  Service Layer:                                                   │
│  └── StudentService.java   (Business Logic)                     │
│      ├── createStudent()                                         │
│      ├── getAllStudents()                                        │
│      ├── getStudentById()                                        │
│      ├── updateStudent()                                         │
│      └── deleteStudent()                                         │
│                                                                   │
│  Repository Layer:                                                │
│  └── StudentRepository.java (Database Access)                   │
│      ├── save()                                                  │
│      ├── findAll()                                               │
│      ├── findById()                                              │
│      ├── delete()                                                │
│      └── [JPA Generated Methods]                                │
│                                                                   │
│  Model Layer:                                                     │
│  └── Student.java        (Entity)                               │
│      ├── id                                                      │
│      ├── name                                                    │
│      ├── age                                                     │
│      ├── email                                                   │
│      ├── createdAt                                              │
│      └── updatedAt                                              │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                   JDBC/SQL    │
                               │
┌──────────────────────────────▼──────────────────────────────────┐
│              MySQL Database (Port 3306)                          │
├─────────────────────────────────────────────────────────────────┤
│  Database: studentdb                                             │
│                                                                   │
│  Table: student                                                  │
│  ├── id (INT, PRIMARY KEY, AUTO_INCREMENT)                      │
│  ├── name (VARCHAR(100))                                        │
│  ├── age (INT)                                                  │
│  ├── email (VARCHAR(100), UNIQUE)                               │
│  ├── created_at (TIMESTAMP)                                     │
│  └── updated_at (TIMESTAMP)                                     │
└─────────────────────────────────────────────────────────────────┘
```

## Layered Architecture

### Frontend Architecture

```
React Application
├── Presentation Layer (Components)
│   ├── StudentForm.js
│   │   ├── Form Input Fields
│   │   ├── Validation
│   │   └── Submit Handler
│   │
│   ├── StudentList.js
│   │   ├── Student Table
│   │   ├── Edit Button
│   │   └── Delete Button
│   │
│   └── App.js
│       ├── State Management
│       ├── Component Orchestration
│       └── Props Distribution
│
└── Service Layer
    └── StudentService.js
        ├── API Configuration
        ├── HTTP Methods (GET, POST, PUT, DELETE)
        └── Request/Response Handling
```

### Backend Architecture

```
Spring Boot Application
├── Controller Layer
│   └── StudentController.java
│       ├── Request Mapping
│       ├── Response Entity
│       └── HTTP Method Handling
│
├── Service Layer
│   └── StudentService.java
│       ├── Business Logic
│       ├── Validation
│       └── Error Handling
│
├── Repository Layer
│   └── StudentRepository.java
│       ├── Database Queries
│       └── CRUD Operations
│
└── Model Layer
    └── Student.java
        ├── Entity Definition
        ├── JPA Annotations
        └── Data Validation
```

## Data Flow Diagram

### Create Student (POST)

```
User Input
    ↓
StudentForm Component
    ↓
Form Validation
    ↓
StudentService.createStudent()
    ↓
HTTP POST Request
    ↓
StudentController.createStudent()
    ↓
StudentService.createStudent()
    ↓
StudentRepository.save()
    ↓
MySQL INSERT Query
    ↓
Student Object Created
    ↓
Response (201 Created)
    ↓
Frontend Updates State
    ↓
UI Renders New Student
```

### Read All Students (GET)

```
Page Load / Refresh
    ↓
StudentList Component
    ↓
StudentService.getAllStudents()
    ↓
HTTP GET Request
    ↓
StudentController.getAllStudents()
    ↓
StudentService.getAllStudents()
    ↓
StudentRepository.findAll()
    ↓
MySQL SELECT Query
    ↓
List<Student> Retrieved
    ↓
Response (200 OK)
    ↓
Frontend Updates State
    ↓
UI Renders Table
```

### Update Student (PUT)

```
User Clicks Edit
    ↓
StudentForm Populated
    ↓
User Modifies Fields
    ↓
User Clicks Update
    ↓
Form Validation
    ↓
StudentService.updateStudent(id)
    ↓
HTTP PUT Request
    ↓
StudentController.updateStudent()
    ↓
StudentService.updateStudent()
    ↓
StudentRepository.save()
    ↓
MySQL UPDATE Query
    ↓
Updated Student Object
    ↓
Response (200 OK)
    ↓
Frontend Updates State
    ↓
UI Renders Updated Data
```

### Delete Student (DELETE)

```
User Clicks Delete
    ↓
Confirmation Dialog
    ↓
User Confirms
    ↓
StudentService.deleteStudent(id)
    ↓
HTTP DELETE Request
    ↓
StudentController.deleteStudent()
    ↓
StudentService.deleteStudent()
    ↓
StudentRepository.deleteById()
    ↓
MySQL DELETE Query
    ↓
Response (200 OK)
    ↓
Frontend Removes from List
    ↓
UI Updates
```

## Technology Stack

### Frontend Stack
- **React 18.2** - UI Library
- **Axios** - HTTP Client
- **CSS3** - Styling
- **JavaScript (ES6+)** - Programming Language

### Backend Stack
- **Java 17** - Programming Language
- **Spring Boot 3.1.5** - Framework
  - Spring Web - REST API
  - Spring Data JPA - ORM
- **Lombok** - Code Generation
- **Maven** - Build Tool

### Database Stack
- **MySQL 8.0** - Relational Database
- **JDBC** - Database Driver

### Infrastructure
- **Node.js** - Frontend Runtime
- **JVM** - Backend Runtime
- **Git** - Version Control

## Component Relationships

### Frontend Components

```
App (Root)
├── StudentForm
│   └── Input Fields
│       ├── Name Input
│       ├── Age Input
│       └── Email Input
│
└── StudentList
    └── Student Table
        ├── Table Headers
        └── Table Rows
            ├── Student Data
            ├── Edit Button
            └── Delete Button
```

### Backend Components

```
StudentRecordApplication
├── StudentController
│   └── StudentService
│       └── StudentRepository
│           └── Student Entity
│
└── Configuration
    ├── CORS Configuration
    └── Database Configuration
```

## Database Schema Relationships

```
Student Table
┌─────────────────────────────────────────┐
│              STUDENT                     │
├─────────────────────────────────────────┤
│ PK │ id (INT, AUTO_INCREMENT)           │
├────┼─────────────────────────────────────┤
│    │ name (VARCHAR 100) NOT NULL        │
│    │ age (INT) NOT NULL                 │
│    │ email (VARCHAR 100) NOT NULL, UNIQ │
│    │ created_at (TIMESTAMP)             │
│    │ updated_at (TIMESTAMP)             │
└────┴─────────────────────────────────────┘
```

## Configuration Files

### Backend Configuration
- `pom.xml` - Maven dependencies and build configuration
- `application.properties` - Spring Boot application configuration
  - Database URL, username, password
  - Server port
  - JPA configuration

### Frontend Configuration
- `package.json` - NPM dependencies and scripts
- `.gitignore` - Files to ignore in version control

## Deployment Architecture

### Development Environment
```
Local Machine
├── Frontend (npm start on port 3000)
├── Backend (mvn spring-boot:run on port 8080)
└── Database (MySQL on port 3306)
```

### Production Environment (Suggested)
```
Server/Cloud
├── Frontend
│   └── React Build (Static Files)
│       └── Web Server (Nginx/Apache)
│
├── Backend
│   └── JAR File
│       └── Application Server (Tomcat)
│
└── Database
    └── MySQL Server
```

## Security Considerations

### Current Implementation
- CORS enabled for localhost:3000
- Input validation on form level

### Recommended for Production
- JWT Authentication
- HTTPS/SSL
- Rate Limiting
- Input Sanitization
- SQL Injection Prevention
- CSRF Protection
- Password Hashing
- Role-Based Access Control

## Performance Optimization

### Current Implementation
- Lazy component loading
- Efficient API calls
- Pagination ready (can be added)

### Recommended Enhancements
- API Response Caching
- Database Indexing
- Pagination Implementation
- Search Functionality
- Lazy Loading Images
- Code Splitting (Frontend)

## Scalability Considerations

### Horizontal Scaling
- Multiple backend instances behind load balancer
- Database replication
- Caching layer (Redis)

### Vertical Scaling
- Increase server resources
- Database optimization
- Query optimization

---

For detailed information on specific components, see:
- [API Documentation](./API_DOCUMENTATION.md)
- [README.md](./README.md)
- [Setup Guide](./SETUP.md)
