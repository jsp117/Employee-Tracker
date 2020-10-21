# Employee Tracker

## Description
This is a console application that allows you to view and organize an employee database using MySQL. To begin this project, I created a MySQL schema for a database called "team_db". The schema was used to build three tables: department, role, and employee. After setting these tables up to work with foreign keys, the tables were filled with data using a seed sql file. After creating the table, I set up inquirer in server.js to prompt the user, using a switch statement to call functions based on their response. The add functions all utilize inquirer to prompt the user, then use MySQL statements to update the database accordingly. The view functions simply pull all data related to a given table. After completing these functions, I added delete functions to remove data from the selected tables, as well as the ability to view employees by manager and update employee managers. These statements utilize multiple queries to pull the necessary data from multiple tables. The last function added was budget, which also required gathering data from multiple tables, and using the data to calculate the budget. In order to calculate the correct budget, it required gathering the number of employees in a given role, multiplied by the salary for that role, and added to any other roles in the same department.
  
## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Code Snippets](#code_snippets)
* [Built With](#built_with)
* [Author](#author)
* [License](#license)


## Installation
To install all dependencies, run Npm install in your terminal while opened to the file path you downloaded to. 

## Usage
To run this application, open your terminal to the folder it is located in and type "npm install". You must also create a database utilizing the schema and seed files provided with this application. After the tables are created and populated, type "node index.js" to run the application in your terminal. Follow prompts to view, add, update, and delete information from the database. Select done when you would like to exit.



## Code Snippets

Code snippet text

![Validate characters](./assets/validator.png)

Code snippet text

![Employee Constructor](./assets/employee.png)


## Built_with
* JavaScript
* [MySQL](https://www.mysql.com/)
* [NodeJS](https://nodejs.org/en/)
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [Console Table](https://www.npmjs.com/package/console.table)
* [Github](https://github.com/)
  
## Author
Jonathan SanPedro - Bachelors of Information Technology at Rutgers New Brunswick - Student at Berkeley Coding Bootcamp
  
![Github Profile Picture](https://github.com/jsp117.png?size=150)

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MIT License

Copyright &copy; [2020] [Jonathan J. SanPedro]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.