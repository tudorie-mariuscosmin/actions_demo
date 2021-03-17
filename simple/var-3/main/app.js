const express = require('express');
const cors = require('cors');
const path = require('path');
const data = require('./data.json')

const app = express();
app.get('/data', (req, res) => {
    res.json(data)
})


app.use(cors());

app.use(express.static("public"))

module.exports = app;