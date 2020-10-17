const inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
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
            choices: ["Add Department", "Add Roles", "Add Employees", "View Departments", "View Roles", "View Employees", "Update Employee Roles"]
        }
    ]).then(function (res) {
        switch (res.do) {
            case "Add Department":
                return addDept();
            case "Add Roles":
                return addRole();
            case "Add Employees":
                return addEmployees();
            case "View Departments":
                return viewDept();
            case "View Roles":
                return viewRole();
            case "View Employees":
                return viewEmployees();
            case "Update Employee Roles":
                return employeeRoles();
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
        }
    ]).then(function (res) {
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: res.role,
                salary: res.salary
            },
            function (err) {
                if (err) throw err;
                console.log(res.role, "Added to database");
                start();
            }
        );

    });
}
function addEmployees() {
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
            name: "roleId",
            type: "input",
            message: "Enter role id: "
        },
        {
            name: "manager",
            type: "input",
            message: "Enter manager id: "
        }
    ]).then(function (res) {
        connection.query(
            "INSERT INTO department SET ?",
            {
                first_name: res.first,
                last_name: res.last,
                role_id: res.roleId,
                manager_id: res.manager
            },
            function (err) {
                if (err) throw err;
                console.log(res.role, "Added to database");
                start();
            }
        );

    });
}
function viewDept() {

}
function viewRole() {

}
function viewEmployees() {

}
function employeeRoles() {

}

start();