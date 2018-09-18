const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path=require('path');
// const bcrypt=require('bcrypt');

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.static(path.join(__dirname, 'client/build')));
mongoose.Promise=Promise

////////this is for mLab ... create your own account and provide username and password
var dbUrl = 'mongodb://customer:sample123@ds259802.mlab.com:59802/customers';
//////////////////////////////////////////////////////
Address = require('./models/Address');



///to use mongodb on local system ... uncomment the below lines.
// mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });
// var db = mongoose.connection;


mongoose.connect(dbUrl,{ useNewUrlParser: true },(err) => {
    console.log('mongodb connection', err)
})
app.get('/', (req, res) => {
    res.send('Hello ');
});
app.get('/api/contact', function (req, res) {
    Address.getDetails(function (err, address) {

        if (err) {
            throw err;
        }
        app.set('json spaces', 2);
        res.json(address);
    });
});

app.post('/api/contact', function (req, res) {
    var address = req.body;
    Address.addDetails(address, function (err, address) {
        if (err) {
            throw err;
        }
        app.set('json spaces', 2);
        res.json(address);
    });
});

app.delete('/api/contact/:_id', function (req, res) {
    var id = req.params._id;
    Address.deleteCustomer(id, function (err, address) {
        if (err) {
            throw err;
        }
        app.set('json spaces', 2);
        res.json(address);
    });
});

app.put('/api/contact/:_id', function (req, res) {
    var _id = req.params._id;
    var address = req.body;
    Address.updateDetails(_id, address, {}, function (err, address) {
        if (err) {
            throw err;
        }
        app.set('json spaces', 2);
        res.json(address);
    });
});
app.listen(process.env.PORT || 3003);
console.log("Running");