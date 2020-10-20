-- Drops the animals_db if it exists currently --
DROP DATABASE IF EXISTS team_db;
CREATE DATABASE team_db;
USE team_db;

CREATE TABLE department (
    id INTEGER(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INTEGER(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary INTEGER(10),
    department_id INTEGER(10),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id INTEGER(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	role_id INTEGER(10),
	manager_id INTEGER(10),
	CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
	CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES role(id) ON DELETE SET NULL
);

-- Creates new rows containing data in all named columns --
INSERT INTO department(name)
VALUES("Development");

INSERT INTO department(name)
VALUES("Legal");

INSERT INTO department(name)
VALUES("HR");

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Developer", 120000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Developer", 100000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 95000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("HR Representative", 80000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jon", "SanPedro", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ryan", "Kelley", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rachel", "Kelm-Southworth", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jerri", "Fong", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ivan", "Torres", 2, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kelly", "Falone", 3, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Albert", "Tuesday", 4, null);


SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;




