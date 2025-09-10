import mysql from 'mysql2/promise';

// bikin koneksi database
export default async function connectDB() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',       // isi kalau ada password MySQL
    database: 'db_nextjs'
  });
  return connection;
}

