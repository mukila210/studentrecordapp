import React, { useState, useEffect } from 'react';
import StudentService from '../services/StudentService';
import './StudentForm.css';

const StudentForm = ({ onStudentSaved, editingStudent, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    } else {
      setFormData({ name: '', age: '', email: '' });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (!formData.name || !formData.age || !formData.email) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (isNaN(formData.age) || formData.age < 5 || formData.age > 100) {
      setError('Age must be a number between 5 and 100');
      setLoading(false);
      return;
    }

    try {
      if (editingStudent) {
        // UPDATE
        await StudentService.updateStudent(editingStudent.id, formData);
        alert('Student updated successfully!');
      } else {
        // CREATE
        await StudentService.createStudent(formData);
        alert('Student added successfully!');
      }
      setFormData({ name: '', age: '', email: '' });
      onStudentSaved();
    } catch (err) {
      setError('Error: ' + (err.response?.data?.message || err.message));
      console.error('Error saving student:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
            min="5"
            max="100"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-buttons">
          <button 
            type="submit" 
            className="btn-submit"
            disabled={loading}
          >
            {loading ? 'Processing...' : (editingStudent ? 'Update' : 'Add')}
          </button>
          {editingStudent && (
            <button 
              type="button" 
              className="btn-cancel"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
