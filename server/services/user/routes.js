const express = require('express');
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
    if (err.message == 'Cannot find username and password') {
      res.status(404).json({
        message: err.message
      });
    } else {
      res.status(400).json({
        message: err.message
      });
    }
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

router.get('/:token', async (req, res) => {
  const { token } = req.params;
  try {
    const user = await getUser(token);
    res.status(!user ? 404 : 200).json(user);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

module.exports = router