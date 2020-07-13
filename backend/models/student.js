const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    studentName:{
        type:String,
        required:true,
       
    }
},{
    timestamps:true
});

const student= mongoose.model('Student',studentSchema);
module.exports=student;