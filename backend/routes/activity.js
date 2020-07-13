const router = require('express').Router();
const activity = require('../models/activity');
router.get('/',(req,res)=>{
    console.log('getting activities');
activity.find()
.then((acts)=>{
    console.log(acts);
    res.json(acts)})
.catch(err=>res.json(err));
});

router.post('/add',(req,res)=>{
    console.log(req.body);
    const studentName=req.body.studentName;
    const description=req.body.description;
    const duration = Number (req.body.duration);
    const date=Date(req.body.date);

   
  
    const newAct = new activity({
        studentName,
        description,
        duration,
        date
    });
    newAct.save()
    .then(()=>res.json('activity added'))
    .catch(err=>{
        console.log("error")
        res.json(err)});
});

router.get('/:id',(req,res)=>{
    console.log(req.params.id)
    activity.findById(req.params.id)
    .then((act)=>{
        console.log(act)
        res.json(act);
    })
    .catch((err)=>
    {
        res.json(err);
    });
});
router.delete('/:id',(req,res)=>
{
    activity.findByIdAndDelete(req.params.id)
    .then(()=>res.json('deleted activity'))
    .catch(()=>{
        res.json(err);
    });
});
router.post('/update/:id',(req,res)=>{
    activity.findById(req.params.id)
    .then(async (act)=>{
        act.studentName=req.body.studentName;
        act.description=req.body.description;
        act.duration=Number(req.body.duration);
        act.date=Date(req.body.date);
        return await act.save();
    })
    .then(()=>
    {
        console.log('update')
    })
    .catch((err)=>
    {
        console.log('error');
    })
});

module.exports= router;