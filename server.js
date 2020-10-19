const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("console.table");

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
            choices: ["Add Department", "Add Roles", "Add Employees", "View Departments", "View Roles", "View Employees", "Update Employee Roles", "Quit"]
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
            case "Quit":
                console.log("Thank You!");
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
            "INSERT INTO employee SET ?",
            {
                first_name: res.first,
                last_name: res.last,
                role_id: res.roleId,
                manager_id: res.manager
            },
            function (err) {
                if (err) throw err;
                console.log(res.first, "Added to database");
                start();
            }
        );

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
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        // console.log(res);
        console.table("Employees: ", res);
        start();
    });
}
function employeeRoles() {
    inquirer.prompt(
        [
            {
                name: "employee",
                type: "input",
                message: "Enter the name of the Employee you wish to update:  "
            },
            {
                name: "role",
                type: "number",
                message: "Enter the role you wish to assign to this employee:  "
            },

        ]
    ).then(function (res) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = 'Jon'",
            [res.role, res.employee],
            function (err) {
                if (err) throw err;
                console.log(res.employee + "'s role was changed to " + res.role);
                start();
            });
    });
}

start();