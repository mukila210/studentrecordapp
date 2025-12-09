import React, { useState, useEffect } from 'react';
import StudentService from '../services/StudentService';
import './StudentList.css';

const StudentList = ({ refreshTrigger, onEditStudent }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, [refreshTrigger]);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await StudentService.getAllStudents();
      setStudents(response.data);
    } catch (err) {
      setError('Failed to fetch students: ' + err.message);
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    onEditStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await StudentService.deleteStudent(id);
        setStudents(students.filter(student => student.id !== id));
        alert('Student deleted successfully!');
      } catch (err) {
        alert('Error deleting student: ' + err.message);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading students...</div>;
  }

  return (
    <div className="student-list-container">
      <h2>Student List ({students.length})</h2>
      {error && <div className="error-message">{error}</div>}
      {students.length === 0 ? (
        <p className="no-students">No students found. Add a new student to get started!</p>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.email}</td>
                <td className="action-buttons">
                  <button 
                    className="btn-edit"
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
