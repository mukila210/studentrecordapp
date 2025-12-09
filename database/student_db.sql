-- Create Database
CREATE DATABASE IF NOT EXISTS studentdb;

-- Use Database
USE studentdb;

-- Create Student Table
CREATE TABLE IF NOT EXISTS student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data (optional)
INSERT INTO student (name, age, email) VALUES
('John Doe', 20, 'john@example.com'),
('Jane Smith', 21, 'jane@example.com'),
('Mike Johnson', 19, 'mike@example.com');
