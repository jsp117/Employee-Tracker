-- Drops the animals_db if it exists currently --
DROP DATABASE IF EXISTS team_db;
CREATE DATABASE team_db;
USE team_db;

CREATE TABLE department (
    id INTEGER(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE role (
    id INTEGER(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL UNIQUE,
    salary INTEGER(10) NOT NULL,
    department_id INTEGER(10) NOT NULL,
	CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id INTEGER(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	role_id INTEGER(10) NOT NULL,
	manager_id INTEGER(10),
	CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
	CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
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
VALUES ("Jerri", "Fong", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ryan", "Kelley", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rachel", "Kelm-Southworth", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ivan", "Torres", 2, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kelly", "Falone", 3, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Albert", "Tuesday", 4, null);

-- SELECT * FROM employee;
-- SELECT * FROM role;
-- SELECT * FROM department;



-- select id from employee where first_name = "jerri";
-- UPDATE employee SET manager_id = 1 WHERE first_name = "Ryan";

-- SELECT title FROM employee INNER JOIN role ON employee.role_id = role.id;

-- UPDATE employee INNER JOIN role ON (employee.role_id = role.id) SET employee.role_id = role.id;
-- SELECT * FROM employee;
-- UPDATE employee SET manager_id = 2 WHERE first_name = "Todd";  
-- SELECT * FROM role WHERE title = "Developer";

-- SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee x ON employee.manager_id = x.id WHERE employee.manager_id = 1 ORDER BY id;

--   -- SELECT topAlbums.year AS year, topAlbums.artist AS artist, song, album
-- --           FROM topAlbums
-- --           INNER JOIN top5000 ON (topAlbums.artist = top5000.artist AND topAlbums.year = top5000.year) 
-- --           WHERE (topAlbums.artist = "${answers.artist}" AND top5000.artist = "${answers.artist}")
-- --           ORDER BY year ASC;

-- SELECT first_name FROM employee WHERE manager_id IS NOT NULL;

-- DELETE FROM employee
