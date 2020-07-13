const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require("body-parser")
const app=express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.urlencoded({ extended: true }));

const port=process.env.PORT||8000;



app.use(express.json());//allows to parse json

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header( 'Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    next();
});
const uri=process.env.ATLAS_URI;
//console.log(uri+"\n"+typeof(uri));
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open',()=>
{
    console.log('connected to db')
});




const activityRouter = require('./routes/activity');
const studentRouter = require('./routes/student');


app.use('/activity',activityRouter);

app.use('/student',studentRouter);

app.listen(port,()=>{
console.log('listening to port');
});