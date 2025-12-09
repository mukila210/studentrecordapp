import axios from 'axios';

// Use relative URL - proxy will forward to backend
const API_BASE_URL = '/api/students';

class StudentService {
  // CREATE - Add a new student
  createStudent(student) {
    return axios.post(API_BASE_URL, student);
  }

  // READ - Get all students
  getAllStudents() {
    return axios.get(API_BASE_URL);
  }

  // READ - Get a student by ID
  getStudentById(id) {
    return axios.get(`${API_BASE_URL}/${id}`);
  }

  // UPDATE - Update student details
  updateStudent(id, student) {
    return axios.put(`${API_BASE_URL}/${id}`, student);
  }

  // DELETE - Remove a student
  deleteStudent(id) {
    return axios.delete(`${API_BASE_URL}/${id}`);
  }
}

export default new StudentService();
