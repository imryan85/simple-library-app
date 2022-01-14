const express = require('express');
const router = express.Router();
const jsonParser = require("body-parser").json();

const { 
  addToCart,
  removeFromCart,
} = require('./controller');

router.use(jsonParser);

router.post('/add', async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    const data = await addToCart(userId, bookId);
    res.json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

router.delete('/remove/:userId/:bookId', async (req, res) => {
  const { userId, bookId } = req.params;
  try {
    const data =  await removeFromCart(userId, bookId);
    res.json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

module.exports = router