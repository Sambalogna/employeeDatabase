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

}
//view roles
function viewRoles(){

}
//add a role
function addRole(){

}
//view employees
function viewEmployees(){

}
//add employee
function addEmployee(){

}
//update employee
function updateEmployee(){

}
menu();