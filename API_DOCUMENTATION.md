# API Documentation

## Base URL
```
http://localhost:8080/api
```

## Student Endpoints

### 1. Create Student (POST)

**Endpoint:**
```
POST /students
```

**Description:** Add a new student to the system

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "age": 20,
  "email": "john@example.com"
}
```

**Success Response (201 Created):**
```json
{
  "id": 1,
  "name": "John Doe",
  "age": 20,
  "email": "john@example.com",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "Invalid input data"
}
```

**Field Validation:**
- `name`: Required, string, max 100 characters
- `age`: Required, integer, minimum 5, maximum 100
- `email`: Required, valid email format, unique in database

---

### 2. Get All Students (GET)

**Endpoint:**
```
GET /students
```

**Description:** Retrieve all students from the database

**Request Headers:**
```
Accept: application/json
```

**Success Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "age": 20,
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-01-15T10:30:00"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "age": 21,
    "email": "jane@example.com",
    "createdAt": "2024-01-15T11:00:00",
    "updatedAt": "2024-01-15T11:00:00"
  }
]
```

**Empty Response (200 OK):**
```json
[]
```

---

### 3. Get Student by ID (GET)

**Endpoint:**
```
GET /students/{id}
```

**Description:** Retrieve a specific student by their ID

**URL Parameters:**
- `id` (required): Student ID (integer)

**Success Response (200 OK):**
```json
{
  "id": 1,
  "name": "John Doe",
  "age": 20,
  "email": "john@example.com",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

**Error Response (404 Not Found):**
```json
null
```

---

### 4. Update Student (PUT)

**Endpoint:**
```
PUT /students/{id}
```

**Description:** Update an existing student's information

**URL Parameters:**
- `id` (required): Student ID (integer)

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Updated",
  "age": 21,
  "email": "johnupdated@example.com"
}
```

**Note:** All fields are optional. Only include fields you want to update.

**Success Response (200 OK):**
```json
{
  "id": 1,
  "name": "John Updated",
  "age": 21,
  "email": "johnupdated@example.com",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T11:45:00"
}
```

**Error Response (404 Not Found):**
```json
null
```

---

### 5. Delete Student (DELETE)

**Endpoint:**
```
DELETE /students/{id}
```

**Description:** Remove a student from the system

**URL Parameters:**
- `id` (required): Student ID (integer)

**Success Response (200 OK):**
```json
"Student deleted successfully"
```

**Error Response (404 Not Found):**
```json
"Student not found"
```

---

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:3000` (React development server)

**Allowed Methods:** GET, POST, PUT, DELETE, OPTIONS

**Allowed Headers:** All

**Credentials:** Allowed

---

## Error Handling

### Common HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## Sample cURL Commands

### Create Student
```bash
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 20,
    "email": "john@example.com"
  }'
```

### Get All Students
```bash
curl http://localhost:8080/api/students
```

### Get Student by ID
```bash
curl http://localhost:8080/api/students/1
```

### Update Student
```bash
curl -X PUT http://localhost:8080/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "age": 21,
    "email": "jane@example.com"
  }'
```

### Delete Student
```bash
curl -X DELETE http://localhost:8080/api/students/1
```

---

## JavaScript/Axios Examples

### Create Student
```javascript
import axios from 'axios';

const newStudent = {
  name: "John Doe",
  age: 20,
  email: "john@example.com"
};

axios.post('http://localhost:8080/api/students', newStudent)
  .then(response => console.log('Student created:', response.data))
  .catch(error => console.error('Error:', error));
```

### Get All Students
```javascript
axios.get('http://localhost:8080/api/students')
  .then(response => console.log('Students:', response.data))
  .catch(error => console.error('Error:', error));
```

### Update Student
```javascript
const updatedData = {
  name: "Jane Doe",
  age: 21,
  email: "jane@example.com"
};

axios.put('http://localhost:8080/api/students/1', updatedData)
  .then(response => console.log('Student updated:', response.data))
  .catch(error => console.error('Error:', error));
```

### Delete Student
```javascript
axios.delete('http://localhost:8080/api/students/1')
  .then(response => console.log('Student deleted:', response.data))
  .catch(error => console.error('Error:', error));
```

---

## Response Format

All responses are in JSON format with the following characteristics:

- **Success:** Returns 200, 201, or appropriate status code with data
- **Error:** Returns appropriate status code with error message
- **Timestamp Fields:** Formatted as ISO 8601 (YYYY-MM-DDTHH:mm:ss)

---

## Rate Limiting

Currently, no rate limiting is implemented. For production deployments, consider implementing rate limiting to prevent abuse.

---

## Authentication

Currently, no authentication is implemented. For production use, add:
- JWT tokens
- OAuth 2.0
- API keys
- Role-based access control

---

## Version

**API Version:** 1.0.0
**Last Updated:** January 2024

---

For more information, see [README.md](./README.md)
