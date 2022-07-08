const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8080;
const MONGODB_URL =
  process.env.MONGODB_URL ||
  `mongodb+srv://admin:DCdiEunDSvIRqs8P@auburnsolarcluster.tnjyfig.mongodb.net/GeneratorRequests?retryWrites=true&w=majority`;
const cors = require('cors');

const app = express();

// const corsOptions = {
//   origin: "http://localhost:8080",
//   optionsSuccessStatus: 200,
// };
app.use(cors());

const authRoutes = require('./routes/auth');
const requestRoutes = require('./routes/request');
const scheduleRoutes = require('./routes/schedule');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (res, req, next) => {
  req.json({ test: 'test' });
});

app.use('/auth', authRoutes);
app.use('/request', requestRoutes);
app.use('/schedule', scheduleRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(MONGODB_URL)
  .then((result) => {
    //app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
