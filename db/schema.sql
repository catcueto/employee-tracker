DROP DATABASE IF EXISTS staff_db;
CREATE DATABASE staff_db;

USE staff_db;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  -- this name refers to the department's name
  names VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE roles(
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- will hold role title
  title VARCHAR(30),
  -- role salary
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL 
);

CREATE TABLE employee(
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  FOREIGN KEY(role_id)
  REFERENCES roles(id)
  manager_id INT,
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL 
);


