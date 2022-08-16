const { Router } = require('express');
const express=require('express');
const router=express.Router();
const Product=require("..//module/product")
const authnaction=require("..//middleware/authonicate")
const authorise=require("..//middleware/authorise")
// console.log(authorise)

router.post("",authnaction,authorise(["admin"]),async (req,res)=>{
    try{
        const product=await Product.create(req.body)
        return res.status(200).send(product)

    }
    catch(err){
        return res.status(404).send({message: err.message});
    }
})
router.get("",async (req,res)=>{
    try{
        const product=await Product.find().lean().exec()
        const totalProduct=await Product.countDocuments()
        return res.status(200).send({product,totalProduct})

    }
    catch(err){
        return res.status(404).send({message: err.message});


    }

})
router.get("/:id",async (req,res)=>{
    try{
        const product=await Product.findById(req.params.id).lean().exec()
        return res.status(200).send(product)

    }
    catch(err){
        return res.status(404).send({message: err.message});


    }

})
router.patch("/:id",async (req,res)=>{
    try{
        const product=await Product.findByIdAndUpdate(req.params.id,req.body).lean().exec()
        return res.status(200).send(product)


    }
    catch(err){
        return res.status(404).send({message: err.message});


    }
})
router.delete("/:id",async (req,res)=>{
    try{
        const product=await Product.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).send(product)


    }
    catch(err){
        return res.status(404).send({message: err.message});


    }
})

module.exports = router

