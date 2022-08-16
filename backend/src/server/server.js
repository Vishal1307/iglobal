const app=require("..//index")
const connect=require("..//config/db")
const express = require("express")



app.listen(8000,async ()=>{
    await connect()
    console.log("port is listening on 8000")
})