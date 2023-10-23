const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const app = express();
var user;
var isLogin;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'admin',
  database: 'pu'
});

app.use(cookieParser());
app.use(session({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: true,
  cookie: {
    sameSite: 'none',
    secure: true,
  }
}));

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  })
);

// Route untuk verifikasi login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM user_tbl WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Kesalahan server');
    }

    if (results.length > 0) {
      req.session.loggedIn = true;
      req.session.username = results[0].username;
      user = username;
      isLogin = true;
      console.log('Sesi di-set:', req.session.username);
      res.status(200).json({ loggedIn: req.session.loggedIn, username: user });
    } else {
      res.status(401).send('Login gagal');
    }
  });
});

// Route untuk mengambil nama pengguna dari sesi (session)
app.get('/getUsername', (req, res) => {
  console.log('Masuk ke /getUsername');
  if (isLogin) {
    const username = user;
    console.log('Username:', username);
    res.json({ username });
  } else {
    res.status(401).send('Unauthorized');
    console.log('Sesi tidak ada atau tidak terotentikasi');
  }
});

app.listen(3001, () => {
  console.log('Server berjalan di port 3001');
});
