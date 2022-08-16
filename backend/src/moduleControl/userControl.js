const express=require('express');
const User=require("..//module/user")
const jwt=require("jsonwebtoken")
const privateKey="abcdefghijkl0"
require("dotenv").config()
const newToken=(user)=>{
    return jwt.sign({user:user},privateKey)

}

const register=async (req,res)=>{
    try{
        let user=await User.findOne({email:req.body.email}).lean().exec()
        if(user){
            return res.status(404).send({message:`${user.email} is already registered`})
        }
        user=await User.create(req.body)
        const token=newToken(user)
        return res.status(200).send({token,user})
    

    }
    catch(err){
        return res.status(500).send({message:err.message})

    }
}
const login=async (req,res)=>{
    try{
        let user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).send({message:"email not found"})
        }
        

        const match=user.checkPassword(req.body.password)
        console.log(match)
        
        if(!match){
            return res.status(404).send({message:"password incorrect"})
        }
        const token=newToken(user)
        return res.status(200).send({user,token})

    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
}
const userDetail=async (req, res) => {
    try{
        const user=await User.find().lean().exec()
        const totalUser=await User.countDocuments()
        return res.status(200).send({user,totalUser})

    }
    catch(err){
        return res.status(404).send({message: err.message});
    }
}
module.exports={register,login,userDetail}
