const express = require('express');
const config = require('config');
const mongo = require('./engine/DataBase/MongoDB.js');

var app = express();

app.use('/api/reg', require('./engine/Router/router.reg'));

function start() {

}

start();

app.listen(config.get("port"), () => console.log('Server started'));