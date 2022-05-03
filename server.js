const express = require('express');
const mysql = require('mysql');
const PORT = process.env.PORT || 3001;
const inquirer = require("inquirer");
const Prompt = require('inquirer/lib/prompts/base');
require("console.table");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'ronaldinho',
    database: 'employee_db'
  },
)
db.connect(function (err) {
  if (err) throw err;
  console.log(`
  *▄▄▄▄▄▄▄▄▄▄▄**▄▄*******▄▄**▄▄▄▄▄▄▄▄▄▄▄**▄************▄▄▄▄▄▄▄▄▄▄▄**▄*********▄**▄▄▄▄▄▄▄▄▄▄▄**▄▄▄▄▄▄▄▄▄▄▄*******▄▄*******▄▄**▄▄▄▄▄▄▄▄▄▄▄**▄▄********▄**▄▄▄▄▄▄▄▄▄▄▄**▄▄▄▄▄▄▄▄▄▄▄**▄▄▄▄▄▄▄▄▄▄▄**▄▄▄▄▄▄▄▄▄▄▄*
▐░░░░░░░░░░░▌▐░░▌*****▐░░▌▐░░░░░░░░░░░▌▐░▌**********▐░░░░░░░░░░░▌▐░▌*******▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌*****▐░░▌*****▐░░▌▐░░░░░░░░░░░▌▐░░▌******▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
▐░█▀▀▀▀▀▀▀▀▀*▐░▌░▌***▐░▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌**********▐░█▀▀▀▀▀▀▀█░▌▐░▌*******▐░▌▐░█▀▀▀▀▀▀▀▀▀*▐░█▀▀▀▀▀▀▀▀▀******▐░▌░▌***▐░▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌░▌*****▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀*▐░█▀▀▀▀▀▀▀▀▀*▐░█▀▀▀▀▀▀▀█░▌
▐░▌**********▐░▌▐░▌*▐░▌▐░▌▐░▌*******▐░▌▐░▌**********▐░▌*******▐░▌▐░▌*******▐░▌▐░▌**********▐░▌***************▐░▌▐░▌*▐░▌▐░▌▐░▌*******▐░▌▐░▌▐░▌****▐░▌▐░▌*******▐░▌▐░▌**********▐░▌**********▐░▌*******▐░▌
▐░█▄▄▄▄▄▄▄▄▄*▐░▌*▐░▐░▌*▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌**********▐░▌*******▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄*▐░█▄▄▄▄▄▄▄▄▄******▐░▌*▐░▐░▌*▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌*▐░▌***▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌*▄▄▄▄▄▄▄▄*▐░█▄▄▄▄▄▄▄▄▄*▐░█▄▄▄▄▄▄▄█░▌
▐░░░░░░░░░░░▌▐░▌**▐░▌**▐░▌▐░░░░░░░░░░░▌▐░▌**********▐░▌*******▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌*****▐░▌**▐░▌**▐░▌▐░░░░░░░░░░░▌▐░▌**▐░▌**▐░▌▐░░░░░░░░░░░▌▐░▌▐░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
▐░█▀▀▀▀▀▀▀▀▀*▐░▌***▀***▐░▌▐░█▀▀▀▀▀▀▀▀▀*▐░▌**********▐░▌*******▐░▌*▀▀▀▀█░█▀▀▀▀*▐░█▀▀▀▀▀▀▀▀▀*▐░█▀▀▀▀▀▀▀▀▀******▐░▌***▀***▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌***▐░▌*▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌*▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀*▐░█▀▀▀▀█░█▀▀*
▐░▌**********▐░▌*******▐░▌▐░▌**********▐░▌**********▐░▌*******▐░▌*****▐░▌*****▐░▌**********▐░▌***************▐░▌*******▐░▌▐░▌*******▐░▌▐░▌****▐░▌▐░▌▐░▌*******▐░▌▐░▌*******▐░▌▐░▌**********▐░▌*****▐░▌**
▐░█▄▄▄▄▄▄▄▄▄*▐░▌*******▐░▌▐░▌**********▐░█▄▄▄▄▄▄▄▄▄*▐░█▄▄▄▄▄▄▄█░▌*****▐░▌*****▐░█▄▄▄▄▄▄▄▄▄*▐░█▄▄▄▄▄▄▄▄▄******▐░▌*******▐░▌▐░▌*******▐░▌▐░▌*****▐░▐░▌▐░▌*******▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄*▐░▌******▐░▌*
▐░░░░░░░░░░░▌▐░▌*******▐░▌▐░▌**********▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌*****▐░▌*****▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌*****▐░▌*******▐░▌▐░▌*******▐░▌▐░▌******▐░░▌▐░▌*******▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌*******▐░▌
*▀▀▀▀▀▀▀▀▀▀▀**▀*********▀**▀************▀▀▀▀▀▀▀▀▀▀▀**▀▀▀▀▀▀▀▀▀▀▀*******▀*******▀▀▀▀▀▀▀▀▀▀▀**▀▀▀▀▀▀▀▀▀▀▀*******▀*********▀**▀*********▀**▀********▀▀**▀*********▀**▀▀▀▀▀▀▀▀▀▀▀**▀▀▀▀▀▀▀▀▀▀▀**▀*********▀*
********************************************************************************************************************************************************************************************************
`); 
    Prompt();
});

function Prompt(){
  inquirer.prompt([
    {
      type: 'list',
      name:'userChoice',
      message: 'What would you like to do?',
      choices: [
      'View All Employees',
      'Add Employee',
      'Update Employee Role',
      'View All Roles',
      'Add Role',
      'View All Departments',
      'Add Department',
      'Exit'
      ]
        
    }
  
    ]).then((res) => {
      console.log(res.userChoice);
      switch(res.userChoice){
        case 'View All Employees':
          viewEmployees();
          break;
        case 'View All Roles':
          viewRoles();
          break;
        case 'View All Departments':
          viewDepartments();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee Role':
          updateRole();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Exit':
          connection.end();
          break;
        }
        
      }).catch((err) => {
          console.error(err);
    });
  }



  //FUNCIONES 

  function viewEmployees{
    let query = 
    `SELECT *
    FROM employee
    LEFT JOIN role
        ON employee.role_id = role.id
    LEFT JOIN department
        ON department.id = role.department_id
    LEFT JOIN employee manager
        ON manager.id = employee.manager_id`
  
    connection.query(query, (err, res)=>{
      if (err) throw err;
      console.table(res);
      firstPrompt();
    });
  }
  function viewDepartments{

  }
  function viewRoles{

  }
  function addRole{

  }
  function addDepartment{

  }
  function addEmployee{

  }
  function updateRole{

  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  