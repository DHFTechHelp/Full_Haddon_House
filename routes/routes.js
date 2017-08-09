const express = require('express');
const router = express.Router();
var path = require('path');
const mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/full_haddon_house';
const nodemailer = require('nodemailer');
const config = require('../public/config.js');

let transporter = nodemailer.createTransport({
    host: config.Config.HOST_INFO,
    port: config.Config.PORT,
    secure: true,
    auth: {
        user: config.Config.USER,
        pass: config.Config.PASSWORD,
    }
});

router.get('/home', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../views/home.html'))
})

router.get('/contact', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../views/contact.html'))
})

router.post('/contact', function(req, res){
  let mailOptions = {
    from: req.body.reply_to,
    to: config.Config.USER,
    subject: req.body.subject + ' ' + req.body.reply_to,
    text: req.body.text
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      console.log(error);
      res.redirect('/contact');
    } else {
      console.log('Message %s sent: %s', info.messageId, info.response);
      res.redirect('/contact')
    }
  })
})

router.get('/application', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../views/application.html'))
})

router.post('/application', function(req, res){
  mongoClient.connect(url, function(err, db){
    let applicants = db.collection('applicants');
    applicants.insertOne(req.body).then(function(){
      console.log('worked');
      db.close();
      res.redirect('/home')
    }).catch(function(){
      console.log("Errors");
      res.redirect('/application')
    })
  })
})

module.exports = router;
