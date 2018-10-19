require('dotenv').config({ path: 'variables.env' });

const bodyParser = require('body-parser');
const express = require('express');
const verifyWebhook = require('./verify-facebook');
const messageWebhook = require('./message-webhook');


const server = express();


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));


server.get('/', verifyWebhook);
server.post('/', messageWebhook);



server.listen((process.env.PORT || 5000), ()=>{
    console.log("Server is up and running!");
});