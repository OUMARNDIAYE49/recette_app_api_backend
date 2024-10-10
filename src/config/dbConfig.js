import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // mot de passe
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 100,
  connectTimeout: 100000,
 
});

connPool
  .getConnection()
  .then(() => {
    console.log('CONNECTED');
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

export default connPool;
