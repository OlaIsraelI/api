const express = require('express');
const userRouter = require('./routes/userRoutes');
const app = express();


//global middleware configuration for json data
app.use(express.json());

//global middleware for app configuration
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.json({message: "Server is Live"});
});

module.exports = app;