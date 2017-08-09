const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const mongoClient = require('mongodb').MongoClient
const assert = require('assert');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const validator = require('express-validator');
const Routes = require('./routes/routes.js');
app.use(validator());
const nodemailer = require('nodemailer')
app.use(express.static('public'));


var url = 'mongodb://localhost/full_haddon_house'


function saveApplication(db, callback){
  let applicants = db.collection('applicants')
}

app.use(Routes)

app.listen(3000, function(){
  console.log('connected');
})
