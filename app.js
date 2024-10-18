const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const indexRouter = require('./routes/index');
const MONGODB_URI = process.env.MONGODB_URI_PROD;

const mongoURI = MONGODB_URI;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', indexRouter);

mongoose.connect(mongoURI, {useNewUrlParser: true})
    .then(() => {
        console.log('mongoose connected')})
    .catch((err) => {
        console.log("DB connection fail", err);
});

app.listen(5050, () => {
    console.log('5050 server start..!');
});