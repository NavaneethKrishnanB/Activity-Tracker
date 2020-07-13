const router = require('express').Router();

let student = require('../models/student');


router.get('/',(req,res)=>{
console.log('getting');
student.find()
.then((stud)=>{
    console.log(stud);
    res.send(stud);
})
.catch((err)=>{
    res.status(400).json('error'+err);
})

});

router.use('/add',(req,res)=>{
    
    console.log('hello');
    console.log(req.body)
    let studentName=req.body.studentName;
    const newStudent = new student({studentName:studentName});
    console.log(studentName);
    newStudent.save()
    .then(()=>{
        console.log('user added');
        res.json('user added')})
    .catch(err=>{
        console.log("errpr");
        res.status(400).json('error'+err)});

})

module.exports = router;