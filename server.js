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
            choices: ["Add Department", "Add Role", "Add Employee", "View Departments", "View Roles", "View Employees", "View Employees by Manager", "View utilized budget", "Update Employee Role", "Update Employee Manager", "Delete", "Quit"]
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
            case "View Employees by Manager":
                managers();
                break;
            case "View utilized budget":
                budget();
                console.log("Budget for dept: ", initial);
                break;
            case "Update Employee Role":
                employeeRoles();
                break;
            case "Update Employee Manager":
                updateManager();
                break;
            case "Delete":
                deleteAny();
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
    var depts = [];
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            var x = res[i].name;
            // var y = res.id;
            depts.push(x);
        }

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
                name: "dept",
                type: "list",
                message: "Select department for this role: ",
                choices: depts
            }
        ]).then(function (res) {
            var resHold = res;
            connection.query(`SELECT id FROM department where name = '${res.dept}'`, function (err, res) {
                if(err) throw err;
                var newId = parseInt(res[0].id);
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: resHold.role,
                        salary: resHold.salary,
                        department_id: newId
                    },
                    function (err) {
                        if (err) throw err;
                        console.log(resHold.role, " Added to database");
                        start();
                    }
                );
            });
        });
    });
}

var roles = [];
var test;
var man1;
function addEmployees() {
    man.length = 0;
    roles.length = 0;
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        // console.log(res);
        for (let i = 0; i < res.length; i++) {
            var x = res[i].title;
            roles.push(x);
        }
        connection.query("SELECT * FROM employee WHERE manager_id IS NULL", function (err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                var x = res[i].first_name;
                man.push(x);
            }
            console.log(man);

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
                    type: "list",
                    message: "Please Select a manager",
                    choices: [...man, "This employee is a manager"]
                }
            ]).then(function (res) {

                var test = res;
                connection.query(`SELECT * FROM role WHERE role.title = "${res.role}"`, function (err, res) {
                    if (err) throw err;
                    // console.log(res[0].id);
                    id = parseInt(res[0].id);

                    connection.query(`SELECT * FROM employee WHERE first_name = '${test.manager}'`, function (err, res) {
                        if (err) throw err;
                        // console.log(res);
                        if (test.manager === "This employee is a manager") {
                            man1 = null;
                        } else {
                            man1 = parseInt(res[0].id);
                        }
                        // console.log(id);

                        connection.query("INSERT INTO employee SET ?",
                            {
                                first_name: test.first,
                                last_name: test.last,
                                role_id: id,
                                manager_id: man1
                            },
                            function (err) {
                                if (err) throw err;
                                console.log(test.first, "Added to database");
                                start();
                            }
                        );
                    });
                });
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
                    choices: [...test, "Cancel"]
                },
                {
                    name: "role",
                    type: "number",
                    message: "Enter the role you wish to assign to this employee:  "
                },
            ]
        ).then(function (res) {
            if (res.employee === "Cancel") {
                start();
            } else {
                connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?",
                    [res.role, res.employee],
                    function (err) {
                        if (err) throw err;
                        console.log(res.employee + "'s role was changed to " + res.role);
                        start();
                    });
            }
        });
    });
}

// var manView;
var manId = [];
function managers() {
    man.length = 0;
    connection.query("SELECT first_name, id FROM employee WHERE manager_id IS NULL", function (err, res) {
        if (err) throw err;
        console.table(res);
        for (let i = 0; i < res.length; i++) {
            let x = res[i].first_name;
            let y = res[i].id;
            man.push(x);
            manId.push(y);
        }
        inquirer.prompt([
            {
                name: "employee",
                type: "list",
                message: "Select Manager: ",
                choices: man
            }
        ]).then(function (res) {
            connection.query(`SELECT id FROM employee WHERE first_name = '${res.employee}'`, function (err, res) {
                if (err) throw err;
                // console.log(res[0].id);
                connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee x ON employee.manager_id = x.id WHERE employee.manager_id = ${res[0].id} ORDER BY id`, function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    start();
                });

            });
        });
        // console.table(res);
    });
}

var emp = [];
var man = [];
var update;
function updateManager() {
    emp.length = 0;
    man.length = 0;
    connection.query("SELECT first_name FROM employee WHERE manager_id IS NOT NULL", function (err, res) {
        if (err) throw err;
        // console.table(res);
        for (let i = 0; i < res.length; i++) {
            let x = res[i].first_name;
            emp.push(x);
        }
        connection.query("SELECT first_name FROM employee WHERE manager_id IS NULL", function (err, res) {
            if (err) throw err;
            // console.table(res);
            for (let i = 0; i < res.length; i++) {
                let x = res[i].first_name;
                man.push(x);
            }

            inquirer.prompt([{
                name: "empUpdate",
                type: "list",
                message: "Select Employee you wish to update :",
                choices: emp
            },
            {
                name: "manager",
                type: "list",
                message: "Select manager",
                choices: man
            }
            ]).then(function (res) {
                // console.log(res.manager);
                update = res.empUpdate;
                var newMan = res.manager;
                connection.query(`SELECT * FROM employee WHERE first_name = "${res.manager}"`, function (err, res) {
                    if (err) throw err;
                    var manId = parseInt(res[0].id);
                    connection.query(`UPDATE employee SET manager_id = ${manId} WHERE first_name = '${update}'`, function (err) {
                        if (err) throw err;
                        console.log(update + " manager changed to " + newMan);
                        start();
                    });
                });
            });
        });
    });
}

function deleteAny() {
    inquirer.prompt([{
        name: "delete",
        type: "list",
        message: "What would you like to delete: ",
        choices: ["Employees", "Roles", "Departments", "Back"]
    }
    ]).then(function (res) {
        switch (res.delete) {
            case "Employees":
                delEmp();
                break;
            case "Roles":
                delRole();
                break;
            case "Departments":
                delDept();
                break;
            case "Back":
                start();
                break;
        }
    });
}

function delEmp() {
    emp.length = 0;
    connection.query("SELECT first_name, last_name FROM employee", function (err, res) {
        if (err) throw err;
        // console.log(res);
        for (let i = 0; i < res.length; i++) {
            var x = res[i].first_name;
            var y = res[i].last_name;
            emp.push(x + " " + y);
        }
        inquirer.prompt([
            {
                name: "delete",
                type: "list",
                message: "Who would you like to remove? ",
                choices: [...emp, "Cancel"]
            }
        ]).then(function (res) {
            if (res.delete === "Cancel") {
                start();
            } else {
                var temp = res.delete.split(" ")[0];
                // console.log(temp);
                connection.query(`DELETE FROM employee WHERE first_name = '${temp}'`, function (err, res) {
                    if (err) throw err;
                    console.log(temp + " was removed");
                    start();
                });

            }
        });
    });
}

function delRole() {
    var roleArr = [];
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            var x = res[i].title;
            roleArr.push(x);
        }
        inquirer.prompt([
            {
                name: "delete",
                type: "list",
                message: "What role would you like to remove ",
                choices: [...roleArr, "Cancel"]
            }
        ]).then(function (res) {
            if (res.delete === "Cancel") {
                start();
            } else {
                connection.query(`DELETE FROM role WHERE title = '${res.delete}'`, function (err) {
                    if (err) throw err;
                    // console.log(res);
                    console.log(res.delete + " was removed");
                    start();

                });
            }
        });
    });
}

function delDept() {
    dept.length = 0;
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            var x = res[i].name;
            dept.push(x);
        }
        inquirer.prompt([
            {
                name: "delete",
                type: "list",
                message: "What department would you like to remove ",
                choices: [...dept, "Cancel"]
            }
        ]).then(function (res) {
            if (res.delete === "Cancel") {
                start();
            } else {
                connection.query(`DELETE FROM department WHERE name = '${res.delete}'`, function (err) {
                    if (err) throw err;
                    // console.log(res);
                    console.log(res.delete + " was removed");
                    start();

                });
            }
        });
    });
}
var dept = [];
var hold;
var idHold = 0;
// var sal = [];
// var roleId = [];
let holder = {
    sal: [],
    id: [],
    count: 0,
    mult: [],
    final: 0
};
var initial = 0;
// var final = 0;
function budget() {
    initial = 0;
    dept.length = 0;
    holder['sal'].length = 0;
    holder['id'].length = 0;
    holder['count'] = 0;
    // holder['count'].length = 0;
    holder['mult'].length = 0;
    connection.query("SELECT name FROM department", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            var x = res[i].name;
            dept.push(x);
        }
        inquirer.prompt([
            {
                name: "dept",
                type: "list",
                message: "Please select a department: ",
                choices: [...dept, "Cancel"]
            }
        ]).then(function (res) {
            if (res.dept === "Cancel") {
                start();
            } else {
                hold = res.dept;
                connection.query(`SELECT id FROM department WHERE name = '${hold}'`, function (err, res) {
                    if (err) throw err;
                    idHold = res[0].id;
                    // console.log(idHold);
                    connection.query(`SELECT * FROM role WHERE department_id = ${idHold}`, function (err, res) {
                        if (err) throw err;
                        for (let i = 0; i < res.length; i++) {
                            let x = res[i].salary;
                            let y = res[i].id;
                            let z = res[i].title;
                            holder['sal'].push(x);
                            holder['id'].push(y);
                            holder['mult'].push(z);
                        }

                        for (let i = 0; i < holder['id'].length; i++) {
                            let query = `SELECT * FROM employee WHERE role_id = ${holder['id'][i]}`;
                            connection.query(query, function (err, res) {
                                if (err) throw err;
                                var newTest = parseInt(res.length);
                                holder['count'] = newTest;
                                initial += parseInt(holder['sal'][i] * newTest);
                                holder['final'] = initial;
                                if (i <= parseInt(holder['id'].length) - 1) {
                                    console.log(`Total Salary for ${holder['mult'][i]}s = ${parseInt(holder['sal'][i]) * newTest}`)
                                }

                                if (i == parseInt(holder['id'].length) - 1) {
                                    console.log("Final Budget : ", initial);
                                }
                            });
                        }
                        setTimeout(function () { start(); }, 2000);
                    });
                });
            }

        });
    });
}

start();