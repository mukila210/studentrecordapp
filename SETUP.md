# Setup and Installation Guide

## Quick Start (5 minutes)

### Prerequisites Check
Ensure you have:
- Java 17+ ([Download](https://www.oracle.com/java/technologies/downloads/))
- Maven 3.6+ ([Download](https://maven.apache.org/download.cgi))
- Node.js 16+ ([Download](https://nodejs.org/))
- MySQL 8.0+ ([Download](https://dev.mysql.com/downloads/mysql/))

### Step 1: Database Setup (2 minutes)

**On Linux/Mac:**
```bash
# Start MySQL
sudo service mysql start

# Run the SQL script
cd /path/to/studentrecordapp
mysql -u root -p < database/student_db.sql
```

**On Windows:**
```bash
# Start MySQL (if using MySQL installer)
net start MySQL80

# Run the SQL script
cd C:\path\to\studentrecordapp
mysql -u root -p < database\student_db.sql
```

When prompted for password, enter your MySQL root password.

### Step 2: Backend Setup (2 minutes)

**Terminal 1:**
```bash
cd /path/to/studentrecordapp/backend

# Update if your MySQL password is different:
# Edit: src/main/resources/application.properties
# Change: spring.datasource.password=password

# Build and run
mvn clean install
mvn spring-boot:run
```

Wait for message: `Started StudentRecordApplication`

### Step 3: Frontend Setup (1 minute)

**Terminal 2:**
```bash
cd /path/to/studentrecordapp/frontend

npm install
npm start
```

Browser opens automatically at `http://localhost:3000`

---

## Detailed Configuration

### MySQL Database Configuration

**Default credentials in application.properties:**
- Username: `root`
- Password: `password`
- Database: `studentdb`
- Port: `3306`

**To change credentials:**
1. Edit `backend/src/main/resources/application.properties`
2. Update `spring.datasource.password` with your MySQL password
3. Restart the backend server

### Backend Configuration

**Default port:** 8080
**API Base URL:** `http://localhost:8080/api`

**To change port:**
1. Edit `backend/src/main/resources/application.properties`
2. Change `server.port=8080` to your desired port
3. Restart the server
4. Update frontend API URL in `frontend/src/services/StudentService.js`

### Frontend Configuration

**Default port:** 3000
**API Endpoint:** `http://localhost:8080/api/students`

**To change:**
1. Edit `frontend/src/services/StudentService.js`
2. Change `API_BASE_URL` variable
3. Restart React dev server

---

## Building for Production

### Backend

```bash
cd backend

# Create executable JAR
mvn clean package -DskipTests

# Run the JAR
java -jar target/student-record-api-1.0.0.jar
```

### Frontend

```bash
cd frontend

# Create production build
npm run build

# Output in: frontend/build/

# Serve with any HTTP server
npx serve build
```

---

## Verification Steps

### Test Database Connection
```bash
mysql -u root -p
USE studentdb;
SHOW TABLES;
DESC student;
```

### Test Backend API
```bash
# Create student
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","age":20,"email":"test@example.com"}'

# Get all students
curl http://localhost:8080/api/students

# Get specific student
curl http://localhost:8080/api/students/1

# Update student
curl -X PUT http://localhost:8080/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated","age":21,"email":"updated@example.com"}'

# Delete student
curl -X DELETE http://localhost:8080/api/students/1
```

### Test Frontend
Open `http://localhost:3000` and try:
1. ✅ Adding a student
2. ✅ Viewing the list
3. ✅ Deleting a student

---

## Common Issues & Solutions

| Problem | Cause | Solution |
|---------|-------|----------|
| "Connection refused" | MySQL not running | Start MySQL service |
| "Access denied" | Wrong password | Update `application.properties` |
| "Port 8080 already in use" | Another app using port | Kill process or change port |
| "CORS error" | Frontend not on port 3000 | Check React dev server |
| "npm: command not found" | Node.js not installed | Install from nodejs.org |
| "mvn: command not found" | Maven not in PATH | Add Maven to system PATH |

---

## Project Dependencies

### Backend (Maven)
- Spring Boot 3.1.5
- Spring Web
- Spring Data JPA
- MySQL Connector Java 8.0.33
- Lombok

### Frontend (npm)
- React 18.2.0
- ReactDOM 18.2.0
- Axios 1.6.0
- React Scripts 5.0.1

---

## File Structure Reference

```
studentrecordapp/
├── README.md                    # Main documentation
├── SETUP.md                     # This file
│
├── database/
│   └── student_db.sql           # Database initialization
│
├── backend/
│   ├── pom.xml                  # Maven configuration
│   ├── .gitignore
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/studentrecord/
│   │   │   │       ├── StudentRecordApplication.java
│   │   │   │       ├── controller/
│   │   │   │       ├── model/
│   │   │   │       ├── repository/
│   │   │   │       └── service/
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── target/                  # Build output (after mvn build)
│
└── frontend/
    ├── package.json             # NPM configuration
    ├── .gitignore
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── StudentForm.js
    │   │   ├── StudentList.js
    │   │   ├── StudentForm.css
    │   │   └── StudentList.css
    │   ├── services/
    │   │   └── StudentService.js
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── node_modules/            # Dependencies (after npm install)
    └── build/                   # Production build (after npm run build)
```

---

## Support & Troubleshooting

For detailed troubleshooting, see **README.md** Troubleshooting section.

For additional help:
1. Check console output for error messages
2. Verify all ports are available
3. Ensure all prerequisites are installed
4. Check database credentials

---

**Happy Coding!** 🚀
