const express = require('express');
const router = express.Router();
const jsonParser = require("body-parser").json();

const { 
  loadSampleData,
  clearSampleData,
} = require('./controller');

router.use(jsonParser);

router.post('/load', async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await loadSampleData();
    res.json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

router.delete('/clear', async (req, res) => {
  const { email, password } = req.body;
  try {
    const data =  await clearSampleData();
    res.json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

module.exports = router