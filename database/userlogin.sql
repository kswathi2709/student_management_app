create database userlogin;
use userlogin;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (id, username, password)VALUES (1, 'swathi', 'starswak7');

select * from users;
