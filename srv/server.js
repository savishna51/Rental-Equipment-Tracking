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

  const sessionLogin = cds.env.requires?.auth?.kind === 'custom';

  const safeReturnTo = (value) => {
    const target = String(value || '');
    return target.startsWith('/') && !target.startsWith('//') && !target.startsWith('/login') ? target : '/';
  };

  const isPageRequest = (req) =>
    req.method === 'GET' && (req.path === '/' || req.path.endsWith('/') || req.path.endsWith('.html'));

  // Ask for username and password before any app page is opened
  if (sessionLogin) {
    app.use((req, res, next) => {
      if (req.session.user || !isPageRequest(req)) return next();
      res.redirect('/login?returnTo=' + encodeURIComponent(req.originalUrl));
    });
  }

  // Login page
  app.get('/login', (req, res) => {
    const returnTo = safeReturnTo(req.query.returnTo);
    if (req.session.user) {
      return res.redirect(returnTo);
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

            <input type="hidden" name="returnTo" value="${returnTo.replace(/"/g, '&quot;')}">

            <label>Username</label>
            <input name="username" autocomplete="username" autofocus required>

            <label>Password</label>
            <input name="password" type="password" autocomplete="current-password" required>

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
    const returnTo = safeReturnTo(req.body && req.body.returnTo);
    const configured = users[username];

    if (!configured || configured.password !== password) {
      return res.status(401).send(`
        <h2>Invalid username or password</h2>
        <a href="/login?returnTo=${encodeURIComponent(returnTo)}">Try again</a>
      `);
    }

    req.session.regenerate((err) => {
      if (err) return res.status(500).send('Login failed, please try again');
      req.session.user = username;
      console.log(`[AUTH] ${username} logged in`);
      res.redirect(returnTo);
    });
  });

  // Logout
  app.get('/do/logout', (req, res) => {
    const returnTo = safeReturnTo(req.query.returnTo);

    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/login?returnTo=' + encodeURIComponent(returnTo));
    });

  });

});

module.exports = cds.server;