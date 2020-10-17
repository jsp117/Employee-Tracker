-- Drops the animals_db if it exists currently --
DROP DATABASE IF EXISTS team_db;
CREATE DATABASE team_db;
USE team_db;

CREATE TABLE employee (
 id INTEGER(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER(10),
  manager_id INTEGER(10)
);

CREATE TABLE role (
    id INTEGER(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary INTEGER(10),
    department_id INTEGER(10)
);

CREATE TABLE department (
    id INTEGER(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

-- Creates new rows containing data in all named columns --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jon", "SanPedro", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ryan", "Kelley", 2, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 120000, 11);

INSERT INTO role (title, salary, department_id)
VALUES ("Developer", 100000, 12);

INSERT INTO department(name)
VALUES("Accounting");

INSERT INTO department(name)
VALUES("HR");


SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;




