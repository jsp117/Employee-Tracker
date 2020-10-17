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

}
function addEmployees() {

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