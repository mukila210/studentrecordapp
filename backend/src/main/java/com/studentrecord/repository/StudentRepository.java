package com.studentrecord.repository;

import com.studentrecord.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // JpaRepository provides all CRUD operations
    // findAll(), findById(), save(), delete(), etc.
}
