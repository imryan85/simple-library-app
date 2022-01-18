const express = require("express");
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const sampleDataRouter = require('./services/sampleData/routes');
const userRouter = require('./services/user/routes');
const searchRouter = require('./services/search/routes');
const cartRouter = require('./services/cart/routes');
const checkoutRouter = require('./services/checkout/routes');
const emailRouter = require('./services/email/routes');
const categoryRouter = require('./services/category/routes');
const authorRouter = require('./services/author/routes');

require('dotenv').config()

const PORT = process.env.PORT || 3001;

// Mongo DB
const mongoDB = process.env.MONGO_DB_URI

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connnection successful!'))
  .catch(err => console.error(err));

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(cors());

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use('/sampleData', sampleDataRouter);
app.use('/user', userRouter);
app.use('/search', searchRouter);
app.use('/cart', cartRouter);
app.use('/checkout', checkoutRouter);
app.use('/email', emailRouter);
app.use('/category', categoryRouter);
app.use('/author', authorRouter);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});