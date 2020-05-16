const express = require('express');
const bodyParser= require('body-parser');


const app = express();
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});



app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())
const admin = require('./routes/admin')
const uploads = require('./routes/uploads')
const member = require('./routes/member')
app.use('/admin', admin)
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use('/uploads',uploads)
app.use('/member',member)

app.listen(8000);