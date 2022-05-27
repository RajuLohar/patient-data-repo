const mongoose=require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/patient-info';

mongoose.connect(mongoURI,{
}).catch((error)=>{
     console.log("error",error.message);
})