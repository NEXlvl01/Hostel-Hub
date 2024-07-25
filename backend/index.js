const express = require('express');
require('dotenv').config();
const dbConnect = require('./dbConnection');

const app = express();
const port = process.env.PORT;
dbConnect();

app.use(express.urlencoded({extended : false}));

app.listen(port,() => {
    console.log(`Server Started At ${port}`);
})
