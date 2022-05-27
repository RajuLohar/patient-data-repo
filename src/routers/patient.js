const express = require('express');
const Patient = require('../models/patient');
const router = new express.Router();

//create patient
router.post('/patient',async (req,res)=>{
    const patient = new Patient(req.body);

    // res.status(200).send({success:"done"});
    try{
        await patient.save();
        res.status(201).send(patient);
    }catch(e){
        res.status(500).send({status:"Error",message:e.message});
    }
});

//add patient
router.get('/getPatient',async (req,res)=>{
    try{
        const patient= await Patient.find();
        res.status(200).send(patient);
    }catch(e){
        res.status(500).send({status:"Error",message:e.message});
    }
});

router.patch('/updatePatient/:id',async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email" , "age"];
    const isValidOperation = updates.every((update) =>allowedUpdates.includes(update));
  
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }
  
    try{
        const patient = await Patient.findByIdAndUpdate(
            {_id:req.params.id},
            req.body,
            {new:true,runValidators:true});
        if(!patient) res.send(404).send();

        res.status(200).send(patient);
    }catch(e){
        res.status(500).send({status:"Error",message:e.message});
    }
})


//delete patient
router.delete('/deletePatient/:id',async(req,res)=>{
    try{
        // console.log(req.params);
        const patient = await Patient.findOneAndDelete({_id:req.params.id},{useFindAndModify:true});
        if(!patient)
            return res.status(404).send(e);

        res.status(200).send(patient);
    }catch(e){
        res.status(500).send(e);
    }
})


module.exports = router;

