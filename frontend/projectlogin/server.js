
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'userlogin'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.post('/users', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(sql, [username, password], (err, data) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.json('Error');
    }

    if (data.length > 0) {
      return res.json('Login Successfully');
    } else {
      return res.json('No record');
    }
  });
});

app.listen(8082, () => {
  console.log('Server listening on port 8082');
});