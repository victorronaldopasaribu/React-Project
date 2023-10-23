const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ganti dengan username MySQL Anda
  password: 'password', // Ganti dengan password MySQL Anda
  database: 'nama_database' // Ganti dengan nama database Anda
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi ke database gagal: ' + err.stack);
    return;
  }
  console.log('Terhubung ke database MySQL dengan ID ' + db.threadId);
});