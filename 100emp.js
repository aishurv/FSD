const mysql = require('mysql2');
const { faker } = require('@faker-js/faker');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Learn@123',
  database: 'employees_db'
});

connection.query(`
  CREATE DATABASE IF NOT EXISTS employees_db;
  USE employees_db;
  CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    job_title VARCHAR(255),
    hire_date DATE
  );
`, (err) => {
  if (err) throw err;

  const employees = [];
  for (let i = 0; i < 100; i++) {
    employees.push([
      faker.person.fullName(),
      faker.internet.email(),
      faker.person.jobTitle(),
      faker.date.past()
    ]);
  }

  connection.query(
    'INSERT INTO employees (name, email, job_title, hire_date) VALUES ?',
    [employees],
    (err, results) => {
      if (err) throw err;
      console.log('Inserted 100 employees');
      connection.query('SELECT * FROM employees', (err, rows) => {
        if (err) throw err;
        console.table(rows);
        connection.end();
      });
    }
  );
});