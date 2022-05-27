const mongoose = require('mongoose');
const validator = require('validator');

const patientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    age:{
        type:Number,
        default:18,
        validate(value){
            if(value<18){
                throw new Error("Age must be over 18");
            }
        }
    }
})

const Patient = mongoose.model("Patient",patientSchema);
module.exports=Patient;