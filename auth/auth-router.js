const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// middleware & connecting
const Users = require('../auth/auth-model');
const secrets = require('../config/secrets');
const authenticate = require('./authenticate-middleware');

// GET request - for testing connection
router.get('/', (req, res) => {
  res.status(200).json({ message: 'hello from the api'})
})

// POST requests

router.post('/register', (req, res) => {
  // implement registration
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
