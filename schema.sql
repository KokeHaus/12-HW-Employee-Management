
CREATE database employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name TEXT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title TEXT NULL,
  salary INT NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
   id INT NOT NULL AUTO_INCREMENT,
  first_name TEXT NULL,
  last_name TEXT NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);