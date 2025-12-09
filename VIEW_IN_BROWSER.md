# 🌐 How to View & Run the Project in Browser

## Step-by-Step Guide

### Prerequisites (Install if not already installed)
- **Java 17+** - https://www.oracle.com/java/technologies/downloads/
- **Maven 3.6+** - https://maven.apache.org/download.cgi
- **Node.js 16+** - https://nodejs.org/
- **MySQL 8.0+** - https://dev.mysql.com/downloads/mysql/

---

## Method 1: Run on Your Local Machine (Recommended for Learning)

### Step 1: Setup Database
```bash
cd /path/to/studentrecordapp

# Run the SQL script to create database and tables
mysql -u root -p < database/student_db.sql

# When prompted, enter your MySQL password
```

✓ **What happens:** Creates `studentdb` database with `student` table and sample data

---

### Step 2: Start Backend Server
```bash
# Open a NEW terminal (Terminal 1)
cd /path/to/studentrecordapp/backend

# Run the Spring Boot application
mvn spring-boot:run

# You should see:
# Started StudentRecordApplication in X.XXX seconds
```

✓ **Backend runs on:** http://localhost:8080/api

✓ **You can test it with:**
```bash
curl http://localhost:8080/api/students
```

---

### Step 3: Start Frontend App
```bash
# Open another NEW terminal (Terminal 2)
cd /path/to/studentrecordapp/frontend

# Install dependencies (first time only)
npm install

# Start the React development server
npm start

# Browser should automatically open
# If not, manually go to: http://localhost:3000
```

✓ **Frontend runs on:** http://localhost:3000

✓ **You should see:**
- Beautiful Student Record Management System page
- Form on the left to add students
- Table on the right showing students

---

## What You'll See in Browser

### Dashboard Features:
1. **Header** - "Student Record Management System" with gradient background
2. **Left Side - Add Student Form**
   - Name input field
   - Age input field (5-100)
   - Email input field
   - "Add" button to submit
3. **Right Side - Student List Table**
   - ID | Name | Age | Email | Actions
   - Edit button (click to populate form)
   - Delete button (with confirmation)

### How to Test CRUD:

**CREATE (Add Student):**
1. Fill in form: Name="John Doe", Age=20, Email="john@test.com"
2. Click "Add"
3. See success message
4. Student appears in table

**READ (View Students):**
1. Students automatically load on page load
2. Table displays all students with details
3. Counter shows total students

**UPDATE (Edit Student):**
1. Click "Edit" button on any student row
2. Form populates with student data
3. Modify fields (e.g., age from 20 to 21)
4. Click "Update" button
5. Table updates automatically

**DELETE (Remove Student):**
1. Click "Delete" button on any student
2. Confirmation dialog appears
3. Confirm deletion
4. Student disappears from table

---

## Terminal Setup (Easiest Method)

**If using VS Code with 3 terminals:**

```bash
# Terminal 1 - Database Setup
cd /path/to/studentrecordapp
mysql -u root -p < database/student_db.sql

# Terminal 2 - Backend
cd /path/to/studentrecordapp/backend
mvn spring-boot:run

# Terminal 3 - Frontend
cd /path/to/studentrecordapp/frontend
npm install
npm start
```

Then open browser to: **http://localhost:3000**

---

## Troubleshooting View Issues

### Problem: Cannot connect to database
```
Error: Access denied for user 'root'@'localhost'
```
**Solution:** Check MySQL password in `backend/src/main/resources/application.properties`
```properties
spring.datasource.password=YOUR_PASSWORD_HERE
```

### Problem: Frontend shows "Cannot fetch students"
```
Error: CORS error or connection refused
```
**Solution:** 
1. Make sure backend is running on port 8080
2. Check if backend is actually started
3. Look for errors in backend terminal

### Problem: Port already in use
```
Error: Port 3000/8080 is already in use
```
**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or change port in backend application.properties
# server.port=8081
```

### Problem: npm command not found
**Solution:** Install Node.js from https://nodejs.org/

### Problem: mvn command not found
**Solution:** Install Maven from https://maven.apache.org/

---

## Quick Test API with cURL

While application is running:

```bash
# Get all students
curl http://localhost:8080/api/students

# Get one student
curl http://localhost:8080/api/students/1

# Add new student
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","age":22,"email":"alice@test.com"}'

# Update student
curl -X PUT http://localhost:8080/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Bob","age":23,"email":"bob@test.com"}'

# Delete student
curl -X DELETE http://localhost:8080/api/students/1
```

---

## Expected Browser Output

### Initial Load (with sample data):
```
STUDENT RECORD MANAGEMENT SYSTEM

┌─────────────────────────┐  ┌──────────────────────────────────────┐
│   ADD NEW STUDENT       │  │  STUDENT LIST (3)                    │
│                         │  │                                      │
│ Name: [_____________]   │  │ ID │ Name  │ Age │ Email  │ Actions│
│ Age:  [_____________]   │  ├────┼───────┼─────┼────────┼────────┤
│ Email:[_____________]   │  │ 1  │ John  │ 20  │ john@  │E D     │
│                         │  │    │ Doe   │     │ exam   │        │
│  [ADD Button]           │  ├────┼───────┼─────┼────────┼────────┤
│                         │  │ 2  │ Jane  │ 21  │ jane@  │E D     │
│                         │  │    │ Smith │     │ exam   │        │
└─────────────────────────┘  └──────────────────────────────────────┘
```

(E = Edit button, D = Delete button)

---

## Performance Notes

- **Initial load:** ~2-3 seconds
- **Add student:** ~1 second
- **List refresh:** ~500ms
- **Edit/Delete:** ~1-2 seconds

---

## Next: Hosting on GitHub

Once you've tested locally and everything works:

1. [See the GitHub Hosting Guide](./GITHUB_HOSTING.md)
2. Push code to GitHub
3. Create a professional README for GitHub
4. Add to your resume/portfolio

---

## Tips for Best Experience

1. **Use 3 terminals** for database, backend, and frontend
2. **Keep all terminals visible** to monitor errors
3. **Test all CRUD operations** before moving to GitHub
4. **Check browser console** (F12) for any errors
5. **Monitor backend logs** for SQL queries and errors

---

## Questions?

- **Form validation not working?** Check browser console (F12 → Console)
- **API not responding?** Check backend terminal logs
- **Database not connecting?** Verify MySQL is running
- **Port conflicts?** Check if ports 3000, 8080, 3306 are free

---

**All set? Now go to GITHUB_HOSTING.md for deployment instructions!** 🚀
