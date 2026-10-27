const cds = require('@sap/cds');
const session = require('express-session');
const express = require('express');

cds.on('bootstrap', app => {

  // Session support
  app.use(session({
    secret: 'retcl-development-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax'
    }
  }));

  // Parse login form
  app.use(express.urlencoded({ extended: true }));

  // Login page
  app.get('/login', (req, res) => {
    if (req.session.user) {
      return res.redirect('/');
    }

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>RETCL Login</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f5f6f7;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .login-box {
            background: white;
            padding: 30px;
            width: 320px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          }

          h2 {
            text-align: center;
          }

          input {
            width: 100%;
            padding: 10px;
            margin: 8px 0 15px;
            box-sizing: border-box;
          }

          button {
            width: 100%;
            padding: 10px;
            background: #0070f2;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
        </style>
      </head>

      <body>
        <div class="login-box">
          <h2>RETCL Login</h2>

          <form method="POST" action="/login">

            <label>Username</label>
            <input name="username" required>

            <label>Password</label>
            <input name="password" type="password" required>

            <button type="submit">Login</button>

          </form>
        </div>
      </body>
      </html>
    `);
  });

  // Login processing
  app.post('/login', (req, res) => {

    const users =
      cds.env.requires.auth.users || {};

    const { username, password } = req.body || {};
    const configured = users[username];

    if (!configured || configured.password !== password) {
      return res.status(401).send(`
        <h2>Invalid username or password</h2>
        <a href="/login">Try again</a>
      `);
    }

    req.session.user = username;

    console.log(`[AUTH] ${username} logged in`);

    res.redirect('/');
  });

  // Logout
  app.get('/do/logout', (req, res) => {

    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/login');
    });

  });

});

module.exports = cds.server;
