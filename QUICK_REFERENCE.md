# Quick Reference Guide

## Directory Structure

```
studentrecordapp/
├── Documentation
│   ├── README.md                  ← START HERE
│   ├── SETUP.md                   ← Installation guide
│   ├── API_DOCUMENTATION.md       ← API reference
│   ├── ARCHITECTURE.md            ← System design
│   ├── PROJECT_SUMMARY.md         ← Project overview
│   └── QUICK_REFERENCE.md         ← This file
│
├── Backend (Spring Boot)
│   ├── pom.xml                    ← Maven config
│   ├── src/main/
│   │   ├── java/com/studentrecord/
│   │   │   ├── StudentRecordApplication.java
│   │   │   ├── controller/StudentController.java
│   │   │   ├── model/Student.java
│   │   │   ├── repository/StudentRepository.java
│   │   │   └── service/StudentService.java
│   │   └── resources/application.properties
│   └── .gitignore
│
├── Frontend (React)
│   ├── package.json               ← NPM config
│   ├── public/index.html
│   ├── src/
│   │   ├── App.js                 ← Main component
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── StudentForm.js      ← Add/Edit form
│   │   │   ├── StudentForm.css
│   │   │   ├── StudentList.js      ← Display table
│   │   │   └── StudentList.css
│   │   └── services/
│   │       └── StudentService.js   ← API calls
│   └── .gitignore
│
└── Database (MySQL)
    └── student_db.sql            ← Schema + sample data
```

## Installation (Copy & Paste)

### Terminal 1: Database Setup
```bash
cd /path/to/studentrecordapp
mysql -u root -p < database/student_db.sql
# Enter your MySQL password when prompted
```

### Terminal 2: Backend Server
```bash
cd /path/to/studentrecordapp/backend
mvn spring-boot:run
# Wait for "Started StudentRecordApplication in X.XXX seconds"
```

### Terminal 3: Frontend App
```bash
cd /path/to/studentrecordapp/frontend
npm install
npm start
# Browser opens at http://localhost:3000
```

## API Endpoints

**Base URL:** `http://localhost:8080/api`

```bash
# Create student
POST /students
{"name":"John","age":20,"email":"john@example.com"}

# Get all students
GET /students

# Get student by ID
GET /students/1

# Update student
PUT /students/1
{"name":"Jane","age":21,"email":"jane@example.com"}

# Delete student
DELETE /students/1
```

## Testing with cURL

```bash
# Create
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","age":20,"email":"test@example.com"}'

# Get All
curl http://localhost:8080/api/students

# Update
curl -X PUT http://localhost:8080/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated","age":21,"email":"new@example.com"}'

# Delete
curl -X DELETE http://localhost:8080/api/students/1
```

## Configuration Files

### Backend Configuration
**File:** `backend/src/main/resources/application.properties`

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/studentdb
spring.datasource.username=root
spring.datasource.password=password  # ← Change to your MySQL password

# Server
server.port=8080

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Frontend Configuration
**File:** `frontend/src/services/StudentService.js`

```javascript
const API_BASE_URL = 'http://localhost:8080/api/students';
// Change if backend URL is different
```

## Required Versions

```
Java:     17+
Maven:    3.6+
Node.js:  16+
MySQL:    8.0+
npm:      8+
```

## Verify Installation

```bash
# Check Java
java -version

# Check Maven
mvn --version

# Check Node.js
node --version

# Check npm
npm --version

# Check MySQL
mysql --version
```

## Troubleshooting Checklist

| Issue | Solution |
|-------|----------|
| "Connection refused" | Start MySQL: `sudo service mysql start` |
| "Access denied" | Update password in application.properties |
| "Port 8080 in use" | Kill process: `lsof -i :8080` |
| "Port 3000 in use" | Kill process: `lsof -i :3000` |
| "mvn not found" | Install Maven or add to PATH |
| "npm not found" | Install Node.js |
| "CORS error" | Frontend must be on port 3000 |
| MySQL won't start | Check MySQL service status |

## Component Quick Reference

### React Components

**StudentForm.js**
- Add new student
- Edit existing student
- Form validation
- Props: `onStudentSaved`, `editingStudent`, `onCancelEdit`

**StudentList.js**
- Display all students in table
- Edit/Delete buttons
- Props: `refreshTrigger`, `onEditStudent`

**App.js**
- Main container
- State management
- Component orchestration

### Spring Boot Components

**StudentController.java**
- 5 REST endpoints
- CORS enabled
- Request/response handling

**StudentService.java**
- CRUD business logic
- Validation
- Database operations

**StudentRepository.java**
- JPA repository
- Database queries
- Auto-generated methods

**Student.java**
- Entity model
- Validation annotations
- JPA mappings

## Database

**Database Name:** `studentdb`

**Table:** `student`

**Columns:**
- `id` - PRIMARY KEY, AUTO_INCREMENT
- `name` - VARCHAR(100), NOT NULL
- `age` - INT, NOT NULL
- `email` - VARCHAR(100), NOT NULL, UNIQUE
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

**Sample Data Included:**
- John Doe, 20, john@example.com
- Jane Smith, 21, jane@example.com
- Mike Johnson, 19, mike@example.com

## Project Flows

### Adding a Student
```
Form Input → Validation → API POST → Database INSERT → Refresh List
```

### Viewing Students
```
Component Mount → API GET → Database SELECT → Display Table
```

### Editing a Student
```
Click Edit → Load Form → Modify → API PUT → Database UPDATE → Refresh List
```

### Deleting a Student
```
Click Delete → Confirm → API DELETE → Database DELETE → Refresh List
```

## Development Server Commands

**Backend:**
```bash
cd backend
mvn clean install          # Build
mvn spring-boot:run        # Run
mvn test                   # Test
```

**Frontend:**
```bash
cd frontend
npm install                # Install dependencies
npm start                  # Start dev server
npm build                  # Build for production
npm test                   # Run tests
```

## Production Build

**Backend:**
```bash
cd backend
mvn clean package -DskipTests
java -jar target/student-record-api-1.0.0.jar
```

**Frontend:**
```bash
cd frontend
npm run build
# Outputs to: frontend/build/
# Serve with: npx serve build
```

## Common Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend | 8080 | http://localhost:8080/api |
| MySQL | 3306 | localhost:3306 |

## File Patterns

### Java Files (.java)
```
backend/src/main/java/com/studentrecord/
├── StudentRecordApplication.java
├── controller/StudentController.java
├── model/Student.java
├── repository/StudentRepository.java
└── service/StudentService.java
```

### React Files (.js)
```
frontend/src/
├── App.js
├── index.js
├── components/
│   ├── StudentForm.js
│   └── StudentList.js
└── services/
    └── StudentService.js
```

### Style Files (.css)
```
frontend/src/
├── App.css
├── index.css
└── components/
    ├── StudentForm.css
    └── StudentList.css
```

## HTTP Methods

```
GET    /api/students           - Read all
GET    /api/students/{id}      - Read one
POST   /api/students           - Create
PUT    /api/students/{id}      - Update
DELETE /api/students/{id}      - Delete
```

## Response Status Codes

```
200 OK              - Successful read/update
201 Created         - Successful create
404 Not Found       - Resource not found
400 Bad Request     - Invalid input
500 Server Error    - Server error
```

## Input Validation

**Name:**
- Required
- Max 100 characters

**Age:**
- Required
- Integer
- Range: 5-100

**Email:**
- Required
- Valid email format
- Unique in database

## Help & Documentation

| Document | Purpose |
|----------|---------|
| README.md | Main documentation, features, overview |
| SETUP.md | Installation & configuration |
| API_DOCUMENTATION.md | Complete API reference |
| ARCHITECTURE.md | System design & diagrams |
| PROJECT_SUMMARY.md | Project details & metrics |
| QUICK_REFERENCE.md | This file - quick lookup |

## Next Steps

1. **First Time?** → Read `README.md`
2. **Need to Install?** → Follow `SETUP.md`
3. **Using the API?** → Check `API_DOCUMENTATION.md`
4. **Understand the System?** → See `ARCHITECTURE.md`
5. **Quick Lookup?** → Use this file

## Support

**Error?** → Check `SETUP.md` Troubleshooting section

**API Question?** → See `API_DOCUMENTATION.md`

**Architecture?** → Review `ARCHITECTURE.md`

**Feature Request?** → Check `PROJECT_SUMMARY.md` Future Enhancements

---

**Last Updated:** January 2024
**Version:** 1.0.0
**Status:** ✅ Production Ready

Happy Coding! 🚀
