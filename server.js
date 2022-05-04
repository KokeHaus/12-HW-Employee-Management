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
    initPrompt();
});

function initPrompt(){
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
      'Quit'
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
          getRoles();
          break;
        case 'Update Employee Role':
          updateRole();
          break;
        case 'Add Role':
          getDept();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Quit':
          db.end();
          break;
        }
        
      }).catch((err) => {
          console.error(err);
    });
  }



  //FUNCIONES 

  function viewEmployees(){
    let query = 
    `SELECT 
        employee.id, 
        employee.first_name, 
        employee.last_name, 
        role.title, 
        department.name AS department, 
        role.salary, 
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role
        ON employee.role_id = role.id
    LEFT JOIN department
        ON department.id = role.department_id
    LEFT JOIN employee manager
        ON manager.id = employee.manager_id`
  
    db.query(query, (err, res)=>{
      if (err) throw err;
      console.table(res);
      initPrompt();
    });
   }
   function viewDepartments(){
    let query = 
    `SELECT * FROM department`
  
    db.query(query, (err, res)=>{
      if (err) throw err;
      console.table(res);
      initPrompt();
    });
   }
   function viewRoles(){
    let query = 
    `SELECT * FROM role`
  
    db.query(query, (err, res)=>{
      if (err) throw err;
      console.table(res);
      initPrompt();
    });
   }
   function addRole(deptchoices){
    inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the name of the role?"
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?"
      },
      {
        type: "list",
        name: "department",
        message: "What is the department for this role?",
        choices: deptchoices
      },
    ]).then((res)=>{
    let query = `INSERT INTO role SET ?`;
    db.query(query, {title: res.title,salary: res.salary,department_id:res.department}, (err, res)=>{
      if(err) throw err;
      initPrompt();
    });
  });
   }

   function getDept(){
    let query = `SELECT * FROM department`
   db.query(query,(err, res) => {
     if(err) throw err;
     const deptchoices = res.map((choices) => ({
       value: choices.id, name: choices.name
     }));
     console.table(res);
     addRole(deptchoices);
   })

}
   function addDepartment(){
    inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department?"
      }
    ]).then((res)=>{
    let query = `INSERT INTO department(name) VALUES(?)`;
    db.query(query, res.name,(err, res)=>{
      if(err) throw err;
      initPrompt();
    });
  });
   }
   function addEmployee(roles){
     db.query('SELECT * FROM employee', (err, res) => {
       const managers = res.map(res => `${res.first_name} ${res.last_name} ${res.id}`);
        managers.push('none')
       inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the employee's first name?"
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name?"
    },
    {
      type: "list",
      name: "roleId",
      message: "What is the employee's role?",
      choices: roles
    },
     {
       type: "list",
       name: "managerID",
       message: "Whos is their manager?",
       choices: managers
     }
  ])
.then((res)=>{
   let roleid=res.roleId;
   const finalid=parseInt(roleid.replace( /^\D+/g, ''));
   let managerid = parseInt(res.managerID.replace( /^\D+/g, ''));
   

      let query = `INSERT INTO employee SET ?`
      db.query(query,{
        first_name: res.firstName,
        last_name: res.lastName,
        role_id: finalid,
         manager_id: managerid,
      },(err, res)=>{
        if(err) throw err;
        initPrompt();
    });
  });
});
   }
  function getRoles(){
      let query = 
      `SELECT * FROM role`
  
   db.query(query,(err, res)=>{
      if(err)throw err;
      const roles = res.map(choices => `${choices.title} ${choices.id}`);
      addEmployee(roles)
    });
  }
  function getEmployees(){
    var employees;
    let query = 
    `SELECT * FROM employee`
    db.query(query,(err, res)=>{
    if(err)throw err;
     employees = res.map(res => `${res.first_name} ${res.last_name} ${res.id}`);
  });
  return employees;
}
 function updateRole(){
  var employees;
  let query = 
  `SELECT * FROM employee`
  db.query(query,(err, res)=>{
  if(err)throw err;
   employees = res.map(res => `${res.first_name} ${res.last_name} ${res.id}`);
   db.query(`SELECT * FROM role`, (err, data)=> {
     if(err)throw err;
   var roles = data.map(data => `${data.title} ${data.id}`);
   
    inquirer.prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee's role would you like to update?",
        choices: employees,
      },
      {
        type:"list",
        name: "role",
        message: "Which role would you like to assign this employee?",
        choices: roles,
      },
    ]).then((res)=>{
      var newrole = parseInt(res.role.replace( /^\D+/g, ''));
      var employeeid = parseInt(res.employee.replace( /^\D+/g, ''));
      let query = `UPDATE employee SET role_id = ? WHERE id = ?`
      db.query(query,[ newrole, employeeid],(err, res)=>{
          if(err)throw err;
          initPrompt();
        });
  });});
 });
}

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  