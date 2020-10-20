const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "team_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

function start() {
    inquirer.prompt([
        {
            name: "do",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add Department", "Add Role", "Add Employee", "View Departments", "View Roles", "View Employees", "View Managers", "Update Employee Role", "Update Employee Manager", "Quit"]
        }
    ]).then(function (res) {
        switch (res.do) {
            case "Add Department":
                addDept();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployees();
                break;
            case "View Departments":
                viewDept();
                break;
            case "View Roles":
                viewRole();
                break;
            case "View Employees":
                viewEmployees();
                break;
            case "View Managers":
                managers();
                break;
            case "Update Employee Role":
                employeeRoles();
                break;
            case "Update Employee Manager":
                updateManager();
                break;
            case "Quit":
                console.log("Thank You!");
                connection.end();
                break;
        }
    });
}

function addDept() {
    inquirer.prompt([
        {
            name: "dept",
            type: "input",
            message: "Enter Department name you would like to add: "
        }
    ]).then(function (res) {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: res.dept
            },
            function (err) {
                if (err) throw err;
                console.log(res.dept, "Added to database");
                start();
            }
        );
    });
}

function addRole() {
    inquirer.prompt([
        {
            name: "role",
            type: "input",
            message: "Enter Role name you would like to add: "
        },
        {
            name: "salary",
            type: "input",
            message: "Enter the salary for this role: "
        },
        {
            name: "deptId",
            type: "input",
            message: "Enter the department id for this role: "
        }
    ]).then(function (res) {
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: res.role,
                salary: res.salary,
                department_id: res.deptId
            },
            function (err) {
                if (err) throw err;
                console.log(res.role, "Added to database");
                start();
            }
        );
    });
}

var roles = [];
var test;

function addEmployees() {
    roles.length = 0;
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.log(res);
        for (let i = 0; i < res.length; i++) {
            var x = res[i].title;
            roles.push(x);
        }
        inquirer.prompt([
            {
                name: "first",
                type: "input",
                message: "Enter the first name of the Employee you would like to add:  "
            },
            {
                name: "last",
                type: "input",
                message: "Enter the last name of the Employee you would like to add:  "
            },
            {
                name: "role",
                type: "list",
                message: "Please select the employees role: ",
                choices: roles
            },
            {
                name: "manager",
                type: "input",
                message: "Enter manager id: "
            }
        ]).then(function (res) {
            var test = res;
            connection.query(`SELECT * FROM role WHERE role.title = "${res.role}"`, function (err, res) {
                if (err) throw err;
                // console.log(res[0].id);
                id = parseInt(res[0].id);
                // console.log(id);
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: test.first,
                        last_name: test.last,
                        role_id: id,
                        manager_id: test.manager
                    },
                    function (err) {
                        if (err) throw err;
                        console.log(test.first, "Added to database");

                        // start();
                    }
                );
            });
        });
    });
}

function viewDept() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        // console.log(res);
        console.table("Departments: ", res);
        start();
    });
}

function viewRole() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        // console.log(res);
        console.table("Roles: ", res);
        start();
    });
}

function viewEmployees() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee x ON employee.manager_id = x.id ORDER BY id;", function (err, res) {
        if (err) throw err;
        // console.log(res);
        console.table("Employees: ", res);
        start();
    });
}

var test = [];
function employeeRoles() {
    test.length = 0;
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            var choice = res[i].first_name;
            test.push(choice);
        }
        inquirer.prompt(
            [
                {
                    name: "employee",
                    type: "list",
                    message: "Select Employee you wish to update :",
                    choices: test
                },
                {
                    name: "role",
                    type: "number",
                    message: "Enter the role you wish to assign to this employee:  "
                },
            ]
        ).then(function (res) {
            connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?",
                [res.role, res.employee],
                function (err) {
                    if (err) throw err;
                    console.log(res.employee + "'s role was changed to " + res.role);
                    start();
                });
        });
    });
}

function managers() {
    connection.query("SELECT * FROM employee WHERE manager_id IS NULL", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

var emp = [];
var update;
function updateManager() {
    emp.length = 0;
    connection.query("SELECT first_name FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        for(let i = 0; i< res.length; i++){
            let x = res[i].first_name;
            emp.push(x);
        }
        connection.query("SELECT first_name FROM employee WHERE manager_id IS NULL", function (err, res) {
            if (err) throw err;
            console.table(res);
            
        });
        inquirer.prompt({
            name: "empUpdate",
            type: "list",
            message: "Select Employee you wish to update :",
            choices: emp
        }).then(function(res){
            update = res.empUpdate;
            connection.query("")

        });
    });
}

start();