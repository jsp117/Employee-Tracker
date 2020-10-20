const { createConnection } = require("mysql");

createConnection.query("SELECT role.id LEFT JOIN ON role employee.role_id = role.id RIGHT JOIN department ON role.id = department.id