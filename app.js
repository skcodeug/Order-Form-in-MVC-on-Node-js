// REQUIRE
const express = require('express');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose'); 
const path = require('path');

// ROUTES
const orderRoutes = require('./routes/orderRoutes');

// APP INSTANCE ~ initialise the express app
const app = express();

// TEMPLATING ENGINE
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');

// MIDDLEWARE 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'));
app.use("/", orderRoutes);

var mongodb = 'mongodb://localhost:27017/restaurant';
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
   if (err) throw err;
   console.log('Successfully connected');
});

// ERROR HANDLER
app.get ('*', (req, res) => {
    res.send('error');
 });
 
// LISTENER
let port = 2500;
app.listen(port, ()=>{
    console.log('Listening on port ' + port);
    
});