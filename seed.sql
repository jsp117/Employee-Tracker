USE team_db;

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