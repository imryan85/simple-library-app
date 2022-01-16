const express = require('express');
const router = express.Router();
const jsonParser = require("body-parser").json();

const { 
  queueEmail,
  sendEmail,
} = require('./controller');

router.use(jsonParser);

router.post('/queue', async (req, res) => {
  console.log(`[/email/queue] received: ${JSON.stringify(req.body)}`);

  const { to, subject, text, html } = req.body;
  try {
    const result = await queueEmail(to, subject, text, html);
    res.json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

router.post('/send', async (req, res) => {
  console.log(`[/email/send] received: ${JSON.stringify(req.body)}`);

  const { to, subject, text, html } = req.body;
  try {
    const result = await sendEmail(to, subject, text, html);
    res.json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

module.exports = router