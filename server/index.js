const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const sampleDataRouter = require('./services/sampleData/routes');
const userRouter = require('./services/user/routes');
const searchRouter = require('./services/search/routes');
const cartRouter = require('./services/cart/routes');

const PORT = process.env.PORT || 3001;

// Mongo DB
const mongoDB = 'mongodb+srv://admin:admin@simple-library-mongo.3t9tx.mongodb.net/libraryDB?retryWrites=true&w=majority';

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

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use('/sampleData', sampleDataRouter);
app.use('/user', userRouter);
app.use('/search', searchRouter);
app.use('/cart', cartRouter);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});