const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema= new Schema({
   studentName:{type:String,required:true},
   description:{type:String,required:true},
   duration:{type:Number,required:true},
   date:{
       type:Date,
    required:false}
},{
    timestamps:true
});

const activity = new mongoose.model('Activity',activitySchema);

module.exports = activity;