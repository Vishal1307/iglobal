const express=require('express')
const app= express()
const {register,login,userDetail} =require("./moduleControl/userControl")
const product=require("./moduleControl/productControl")
app.use(express.json())
app.post("/register", register)
app.post("/login",login)
app.get("/userDetail", userDetail)
app.use("/product", product)




module.exports=app