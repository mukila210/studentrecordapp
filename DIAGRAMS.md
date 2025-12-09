# System Diagrams & Flowcharts

## Overall System Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                         STUDENT RECORD SYSTEM                         │
└──────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────┐
│     REACT FRONTEND          │  (Port 3000)
│  ┌───────────────────────┐  │
│  │    User Interface     │  │
│  │  - StudentForm        │  │
│  │  - StudentList        │  │
│  │  - App Container      │  │
│  └───────────────────────┘  │
│           ↑ ↓               │
│  ┌───────────────────────┐  │
│  │  StudentService       │  │
│  │  (Axios HTTP Client)  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
            ↓ HTTP ↑
        (JSON Data)
            ↓ ↑
┌─────────────────────────────┐
│   SPRING BOOT BACKEND       │  (Port 8080)
│  ┌───────────────────────┐  │
│  │  StudentController    │  │
│  │  (REST Endpoints)     │  │
│  └───────────────────────┘  │
│           ↓                 │
│  ┌───────────────────────┐  │
│  │ StudentService        │  │
│  │ (Business Logic)      │  │
│  └───────────────────────┘  │
│           ↓                 │
│  ┌───────────────────────┐  │
│  │ StudentRepository     │  │
│  │ (Data Access)         │  │
│  └───────────────────────┘  │
│           ↓                 │
│  ┌───────────────────────┐  │
│  │ Student Entity        │  │
│  │ (Data Model)          │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
            ↓ SQL ↑
      (INSERT/SELECT)
            ↓ ↑
┌─────────────────────────────┐
│    MYSQL DATABASE           │  (Port 3306)
│  ┌───────────────────────┐  │
│  │  studentdb (Database) │  │
│  │  ┌─────────────────┐  │  │
│  │  │ student (Table) │  │  │
│  │  │ - id            │  │  │
│  │  │ - name          │  │  │
│  │  │ - age           │  │  │
│  │  │ - email         │  │  │
│  │  │ - created_at    │  │  │
│  │  │ - updated_at    │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

---

## Data Flow - Add Student (POST)

```
┌─────────────────────────────────────────────────────────────┐
│ FRONTEND - REACT                                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 1. User fills form:                                        │
│    ├─ Name: "John Doe"                                    │
│    ├─ Age: 20                                             │
│    └─ Email: "john@example.com"                           │
│                                                             │
│ 2. User clicks "Add" button                                │
│                                                             │
│ 3. StudentForm validates:                                 │
│    ├─ Name is not empty ✓                                │
│    ├─ Age is 5-100 ✓                                     │
│    └─ Email is valid ✓                                   │
│                                                             │
│ 4. Call StudentService.createStudent(data)               │
│                                                             │
└──────────────────┬──────────────────────────────────────────┘
                   │
              ↓ HTTP POST ↑
         /api/students
         Content-Type: application/json
         {
           "name":"John Doe",
           "age":20,
           "email":"john@example.com"
         }
                   │
┌──────────────────▼──────────────────────────────────────────┐
│ BACKEND - SPRING BOOT                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 5. StudentController.createStudent(@RequestBody) called   │
│                                                             │
│ 6. Call StudentService.createStudent(student)             │
│                                                             │
│ 7. StudentService validates:                             │
│    ├─ Name not null ✓                                    │
│    ├─ Age in range ✓                                    │
│    └─ Email unique ✓                                    │
│                                                             │
│ 8. Call StudentRepository.save(student)                   │
│                                                             │
│ 9. JPA converts to SQL INSERT                            │
│                                                             │
└──────────────────┬──────────────────────────────────────────┘
                   │
              ↓ SQL ↑
         INSERT INTO student
         (name, age, email, created_at, updated_at)
         VALUES (...)
                   │
┌──────────────────▼──────────────────────────────────────────┐
│ DATABASE - MYSQL                                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 10. Execute INSERT statement                              │
│                                                             │
│ 11. Validate constraints:                                 │
│     ├─ Email UNIQUE ✓                                    │
│     └─ NOT NULL fields ✓                                │
│                                                             │
│ 12. Create row:                                          │
│     id: 4 (AUTO_INCREMENT)                              │
│     name: "John Doe"                                    │
│     age: 20                                             │
│     email: "john@example.com"                          │
│     created_at: 2024-01-15 10:30:00                   │
│     updated_at: 2024-01-15 10:30:00                   │
│                                                             │
│ 13. Return success + row data                           │
│                                                             │
└──────────────────┬──────────────────────────────────────────┘
                   │
              ↓ HTTP 201 ↑
         {
           "id": 4,
           "name": "John Doe",
           "age": 20,
           "email": "john@example.com",
           "createdAt": "2024-01-15T10:30:00",
           "updatedAt": "2024-01-15T10:30:00"
         }
                   │
┌──────────────────▼──────────────────────────────────────────┐
│ FRONTEND - REACT                                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 14. Response received (201 Created)                       │
│                                                             │
│ 15. Show success message: "Student added successfully!"  │
│                                                             │
│ 16. Clear form fields                                    │
│                                                             │
│ 17. Trigger list refresh:                               │
│     setRefreshTrigger(prev => prev + 1)                │
│                                                             │
│ 18. StudentList component updates:                       │
│     └─ Fetch all students again                        │
│     └─ Render updated table                            │
│                                                             │
│ 19. User sees new student in list!                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow - Edit Student (PUT)

```
┌────────────────────────────────────────────┐
│ User clicks "Edit" button next to student │
└────────────┬───────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────┐
│ StudentList passes student to onEditStudent│
└────────────┬───────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────┐
│ App state updates: editingStudent = student│
└────────────┬───────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────┐
│ StudentForm detects editingStudent prop   │
│ and populates form with existing data:    │
│ ├─ Name: "John Doe"                      │
│ ├─ Age: 20                               │
│ └─ Email: "john@example.com"             │
│                                          │
│ Form title changes to "Edit Student"    │
│ Button changes to "Update"               │
└────────────┬───────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────┐
│ User modifies form fields:                │
│ ├─ Name: "John Doe" → "Jane Doe"        │
│ ├─ Age: 20 → 21                         │
│ └─ Email: same                          │
└────────────┬───────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────┐
│ User clicks "Update" button               │
│                                          │
│ Form validates input ✓                   │
│                                          │
│ Call StudentService.updateStudent(id, data)
└────────────┬───────────────────────────────┘
             │
        ↓ HTTP PUT ↑
      /api/students/4
      {
        "name":"Jane Doe",
        "age":21,
        "email":"john@example.com"
      }
             │
             ▼
┌────────────────────────────────────────────┐
│ Backend StudentController receives PUT    │
│                                          │
│ Calls StudentService.updateStudent(4,...)
│                                          │
│ Finds existing student by ID             │
│                                          │
│ Updates fields:                          │
│ ├─ name = "Jane Doe"                   │
│ ├─ age = 21                            │
│ └─ email unchanged                     │
│                                          │
│ Sets updatedAt = NOW()                  │
│                                          │
│ Calls StudentRepository.save()          │
│                                          │
│ Executes: UPDATE student SET ... WHERE id=4
└────────────┬───────────────────────────────┘
             │
        ↓ HTTP 200 ↑
      {
        "id": 4,
        "name": "Jane Doe",
        "age": 21,
        ...
        "updatedAt": "2024-01-15T11:45:00"
      }
             │
             ▼
┌────────────────────────────────────────────┐
│ Frontend receives response                │
│                                          │
│ Show success: "Student updated!"        │
│                                          │
│ Clear form                              │
│                                          │
│ Set editingStudent = null               │
│                                          │
│ Trigger list refresh                    │
│                                          │
│ StudentList re-renders with updated data
│                                          │
│ User sees: "Jane Doe | 21 | ..."       │
└────────────────────────────────────────────┘
```

---

## Data Flow - Delete Student (DELETE)

```
User sees student in list
         ↓
    ┌─────────────┐
    │ Click Delete│
    └──────┬──────┘
           ↓
  ┌──────────────────────┐
  │ Confirmation Dialog  │
  │ "Are you sure?"      │
  │ [Yes] [No]          │
  └──────┬──────────────┘
         │
    (Yes clicked)
         │
         ▼
  StudentList calls:
  StudentService.deleteStudent(id)
         │
    ↓ HTTP DELETE ↑
  /api/students/4
         │
         ▼
  Backend StudentController
  │
  ├─ Check student exists
  ├─ Call StudentService.deleteStudent(4)
  ├─ Call StudentRepository.deleteById(4)
  ├─ Execute: DELETE FROM student WHERE id=4
  │
  └─ Return 200 OK
         │
    ↓ HTTP 200 ↑
  "Student deleted successfully"
         │
         ▼
  Frontend:
  ├─ Show: "Student deleted successfully!"
  ├─ Remove from students array
  ├─ Re-render table
  │
  └─ Student disappears from list
```

---

## Component Hierarchy

```
App (Root)
├── Header
│   ├── Title: "Student Record Management System"
│   └── Subtitle: "Manage student information with ease"
│
├── Main Container
│   ├── StudentForm
│   │   ├── Input: Name
│   │   ├── Input: Age (5-100)
│   │   ├── Input: Email
│   │   ├── Button: Add/Update
│   │   └── Button: Cancel (if editing)
│   │
│   └── StudentList
│       ├── Table Header
│       │   ├── ID
│       │   ├── Name
│       │   ├── Age
│       │   ├── Email
│       │   └── Actions
│       │
│       └── Table Body
│           └── Row (for each student)
│               ├── ID
│               ├── Name
│               ├── Age
│               ├── Email
│               ├── Button: Edit
│               └── Button: Delete
│
└── Footer
    └── Copyright notice
```

---

## Database Schema Diagram

```
┌─────────────────────────────────────────────────┐
│               STUDENT TABLE                      │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌────────────────────────────────────────┐   │
│  │ Column Name    │ Type         │ Props  │   │
│  ├────────────────┼──────────────┼────────┤   │
│  │ id             │ INT          │ PK, AI │   │
│  │ name           │ VARCHAR(100) │ NN     │   │
│  │ age            │ INT          │ NN     │   │
│  │ email          │ VARCHAR(100) │ NN, U  │   │
│  │ created_at     │ TIMESTAMP    │        │   │
│  │ updated_at     │ TIMESTAMP    │        │   │
│  └────────────────────────────────────────┘   │
│                                                 │
│  Legend:                                       │
│  PK = Primary Key                             │
│  AI = Auto Increment                          │
│  NN = Not Null                                │
│  U  = Unique                                  │
│                                                 │
└─────────────────────────────────────────────────┘

Sample Data:
┌────┬──────────────┬─────┬──────────────────┐
│ id │ name         │ age │ email            │
├────┼──────────────┼─────┼──────────────────┤
│ 1  │ John Doe     │ 20  │ john@example.com │
│ 2  │ Jane Smith   │ 21  │ jane@example.com │
│ 3  │ Mike Johnson │ 19  │ mike@example.com │
└────┴──────────────┴─────┴──────────────────┘
```

---

## API Endpoint Flowchart

```
                    REST API Requests
                            │
           ┌────────────────┼────────────────┐
           │                │                │
        POST             GET            PUT/DELETE
      CREATE          READ            UPDATE/DELETE
           │                │                │
           ▼                ▼                ▼
      /students        /students      /students/{id}
           │                │                │
           ├──────────────┬─┴────────────────┤
           │              │                  │
           ▼              ▼                  ▼
      Controller Controller          Controller
           │              │                  │
           ▼              ▼                  ▼
      Service         Service           Service
           │              │                  │
           ▼              ▼                  ▼
      Repository     Repository        Repository
           │              │                  │
           ▼              ▼                  ▼
        Database        Database          Database
```

---

## Request-Response Lifecycle

```
┌─────────────────────────────────────────────────────┐
│ CLIENT (Browser/Postman)                            │
│ Sends HTTP Request                                  │
│ ├─ Method: GET/POST/PUT/DELETE                     │
│ ├─ URL: /api/students[/{id}]                       │
│ ├─ Headers: Content-Type: application/json         │
│ └─ Body: JSON data (if applicable)                 │
└─────────────┬───────────────────────────────────────┘
              │
         NETWORK
              │
┌─────────────▼───────────────────────────────────────┐
│ SERVER (Spring Boot on :8080)                       │
│ ├─ Route to correct endpoint                        │
│ ├─ Parse request                                    │
│ ├─ Validate input                                   │
│ ├─ Process business logic                          │
│ ├─ Interact with database                          │
│ └─ Generate response                               │
│    ├─ Status: 200/201/400/404/500                  │
│    ├─ Headers: Content-Type: application/json      │
│    └─ Body: JSON response data                     │
└─────────────┬───────────────────────────────────────┘
              │
         NETWORK
              │
┌─────────────▼───────────────────────────────────────┐
│ CLIENT (Browser)                                    │
│ Receives HTTP Response                             │
│ ├─ Parse JSON                                      │
│ ├─ Update component state                          │
│ ├─ Re-render UI                                    │
│ └─ Display results to user                         │
└─────────────────────────────────────────────────────┘
```

---

## Deployment Architecture

```
Development Environment:
┌──────────────────────────────────────────────┐
│ Developer's Machine                          │
├──────────────────────────────────────────────┤
│ ┌────────────────┐ ┌────────────────────┐   │
│ │ npm start      │ │ mvn spring-boot:run│   │
│ │ Port: 3000     │ │ Port: 8080         │   │
│ └────────────────┘ └────────────────────┘   │
│        ↑                    ↑                │
│        └─────────┬──────────┘                │
│                  │                          │
│         MySQL localhost:3306                │
└──────────────────────────────────────────────┘

Production Environment (Suggested):
┌─────────────────────────────────────────────────┐
│ Server / Cloud Platform                         │
├─────────────────────────────────────────────────┤
│                                                 │
│ ┌────────────────────────┐                     │
│ │ Web Server (Nginx)     │ Port: 80/443        │
│ │ ├─ Frontend Build      │ (HTTPS)             │
│ │ └─ Static Files        │                     │
│ └────────────┬───────────┘                     │
│              │ (Proxy)                         │
│              ▼                                 │
│ ┌────────────────────────┐                     │
│ │ App Server (Tomcat)    │ Port: 8080          │
│ │ ├─ Spring Boot JAR     │ (Internal)          │
│ │ └─ REST API            │                     │
│ └────────────┬───────────┘                     │
│              │ (JDBC)                          │
│              ▼                                 │
│ ┌────────────────────────┐                     │
│ │ Database (MySQL)       │ Port: 3306          │
│ │ ├─ studentdb           │ (Internal)          │
│ │ └─ student table       │                     │
│ └────────────────────────┘                     │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

**These diagrams help visualize the system architecture and data flows.**

For more details, refer to [ARCHITECTURE.md](./ARCHITECTURE.md)
