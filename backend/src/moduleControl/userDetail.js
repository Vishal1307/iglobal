const express = require('express');
const router=express.Router();
const User=require("..//module/user")

router("",async (req,res)=>{
    try{
        const user=await User.find().lean().exec()
        const totalUser=await User.countDocuments()
        return res.status(200).send({user,totalUser})

    }
    catch(err){
        return res.status(404).send({message: err.message});
    }
})

module.exports = router