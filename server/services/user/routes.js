const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();
const jsonParser = require("body-parser").json();

const { 
  getUser,
  signInUser,
  signUpUser,
} = require('./controller');

router.use(jsonParser);

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await signInUser(email, password);
    res.json(token);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

router.post('/signup', async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const user = await signUpUser(fullname, email, password);
    res.json(user);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

router.get('/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const user = await getUser(email);
    res.status(!user ? 404 : 200).json(user);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

module.exports = router