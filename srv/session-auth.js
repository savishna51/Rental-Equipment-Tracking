const cds = require('@sap/cds');

module.exports = function (options) {
  const users = options.users || {};

  return function sessionAuth(req, res, next) {

    if (!req.session) {
      return next(new Error('Session middleware is not configured'));
    }

    if (req.session.user) {
      const configured = users[req.session.user];

      if (configured) {
        const user = new cds.User({
          id: req.session.user,
          roles: configured.roles || []
        });

        req.user = user;
        cds.context.user = user;

        return next();
      }
    }

    if (req.path === '/login' && req.method === 'POST') {
      const { username, password } = req.body || {};
      const configured = users[username];

      if (configured && configured.password === password) {
        req.session.user = username;
        return res.redirect('/');
      }

      return res.status(401).send('Invalid username or password');
    }

    if (!req.session.user) {
      return res.status(401).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>RETCL Login</title>
        </head>
        <body>
          <h2>RETCL Login</h2>

          <form method="POST" action="/login">
            <label>Username</label>
            <input name="username" required>

            <br><br>

            <label>Password</label>
            <input name="password" type="password" required>

            <br><br>

            <button type="submit">Login</button>
          </form>
        </body>
        </html>
      `);
    }

    next();
  };
};
