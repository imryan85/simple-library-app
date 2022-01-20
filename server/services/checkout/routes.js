const express = require('express');
const router = express.Router();
const jsonParser = require("body-parser").json();

const { 
  placeOrder,
  processOrder,
} = require('./controller');

router.use(jsonParser);

router.post('/queue', async (req, res) => {
  console.log(`[/checkout/queue] received: ${JSON.stringify(req.body)}`);

  const { userId } = req.body;
  try {
    const result = await placeOrder(userId);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

router.post('/process', async (req, res) => {
  console.log(`[/checkout/process] received: ${JSON.stringify(req.body)}`);

  const { checkoutId } = req.body;
  try {
    const result =  await processOrder(checkoutId);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router