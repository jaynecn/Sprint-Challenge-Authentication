const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// middleware & connecting
const Users = require('../auth/auth-model');
const secrets = require('../config/secrets');

// GET request - for testing connection
router.get('/', (req, res) => {
  res.status(200).json({ message: 'hello from the api'})
})

// POST requests

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  
  Users.add(user)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(error => {
      res.status(500).json({ message: 'error: ' + error.message});
    })
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token: token,
        });
      } else {
        res.status(400).json({ message: 'Invalid Credentials '});
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'error: ' + error.message });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: '8h'
  }
  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;
