import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [editingStudent, setEditingStudent] = useState(null);

  const handleStudentSaved = () => {
    setRefreshTrigger(prev => prev + 1);
    setEditingStudent(null);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Record Management System</h1>
        <p className="subtitle">Manage student information with ease</p>
      </header>
      
      <main className="App-main">
        <div className="container">
          <StudentForm 
            onStudentSaved={handleStudentSaved}
            editingStudent={editingStudent}
            onCancelEdit={handleCancelEdit}
          />
          <StudentList 
            refreshTrigger={refreshTrigger}
            onEditStudent={handleEditStudent}
          />
        </div>
      </main>

      <footer className="App-footer">
        <p>&copy; 2024 Student Record Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
