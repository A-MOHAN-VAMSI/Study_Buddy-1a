const mysql = require('mysql2/promise');

const host = 'hayabusa.proxy.rlwy.net';
const port = 32446;
const user = 'root';
const password = 'CLBlWfjLexIiJJuZjwOyYPuIHzYaudaU'; // user password 1
const database = 'railway';

const run = async () => {
  try {
    console.log(`Connecting to ${host}:${port} with user=${user} password=${password}...`);
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
      connectTimeout: 5000
    });
    console.log('SUCCESS!');
    await connection.end();
  } catch (err) {
    console.error('FAILED:', err.message);
  }
};

run();
