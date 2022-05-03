const inquirer = require("inquirer");
const mysql = require('mysql2');
const ctable = require('console.table');
const { Console } = require("console");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Password1234!',
        database: "employeeTracker_db"
    }
)

function menu(){
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'start',
                choices: [
                    'View All Employees',
                    'Add Employee',
                    'Update Employee Role',
                    'View All Roles',
                    'Add Role',
                    'View All Departments',
                    'Add Department',
                    'Quit'
                ]
            }
        ])
        .then((res) =>{
            if(res.start === 'View All Employees'){
                viewEmployees();
            } else if(res.start === ''){
                addEmployee();
            } else if(res.start === ''){
                updateEmployee();
            } else if(res.start === ''){
                viewRoles();
            } else if(res.start === ''){
                addRole();
            } else if(res.start === ''){
                viewDepartments();
            } else if(res.start === ''){
                addDepartment();
            } else if(res.start === ''){
                
            } 
        })
}
//view Departments 
function viewDepartments() {
    console.log('Viewing all departments')
    const SQL = `SELECT * FROM department`;
    db.query(SQL, function(err, results) {
        if(err){
            console.log(error)
        }
        console.table(results)
        menu();
    })
}
//add to a department
function addDepartment() {
    console.log('Adding a department..')
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the new deaprtment\'s name?',
                name: 'new_department'
            }
        ])
        .then((res) =>{
            const SQL = `INSERT INTO department(name) VALUES(?);`
            const params = `${res.new_department}`;
            db.query(SQL, params, function(err, results, fields){
                console.log('A new department has been added.')
                viewDepartments();
            })
        })
}
//view roles
function viewRoles(){
    console.log('Viewing all roles.')
    const SQL = `SELECT * FROM role`;
    db.query(SQL, function(err, results, fields){
        console.table(results);
        menu();
    })
}
//add a role
function addRole(){
    console.log('Adding a role..')
    //queries current department name
    db.query(`SELECT name, id as value FROM department`, (err, data) => {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the new role\'s title?',
                    name: 'new_role_title'
                },
                {
                    type: 'input',
                    message: 'What is the new role\'s salary?',
                    name: 'new_role_salary'
                },
                {
                    type: 'list',
                    message: 'What is the new role\'s department?',
                    name: 'new_role_department',
                    choices: data
                }
            ])
            .then((res)=> {
                const SQL = `INSERT INTO role(title, salary, department_id) VALUES(?,?,?);`
                const params = [res.new_role_title, res.new_role_salary, res.new_role_department]
                db.query(SQL, params, function(err,results, fields)
                {
                    console.log('A new role has been added.')
                    viewRoles();
                })
            })
    })
}
//view employees
function viewEmployees(){
    console.log('Viewing all employees')
    const SQL = `SELECT role.title as Role, concat(employee.first_name, " ", employee.last_name) as EMPLOYEE, concat(manager.first_name, " ", manager.last_name) AS MANAGER, role.salary as SALARY FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN employee as manager on employee.manager_id = manager.id ORDER BY employee.first_name `

    db.query(SQL, function (err, results, fields){
        console.table(results)
        menu();
    })
}
//add employee
function addEmployee(){

}
//update employee
function updateEmployee(){

}
menu();