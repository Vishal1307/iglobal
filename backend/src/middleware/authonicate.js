const jwt=require("jsonwebtoken")
const { resolve } = require("path")
const privateKey="abcdefghijkl0"

const verfiyaToken=(token)=>{
    return new Promise ((resolve,reject)=>{
        jwt.verify(token,privateKey,(err,decoded)=>{
            if(err) return reject(err)
            resolve(decoded)


        })
    })
}
module.exports =async (req,res,next)=>{
    if(!req?.headers?.authorization) return res.status(400).send({message:"please provide a valid authorization token"})
    const bearerToken=req.headers.authorization
    if(!bearerToken.startsWith("Bearer")) return res.status(400).send({mesage:"please provide seriously"})
    const token=bearerToken.split(" ")[1]
    let user;
    try{
        user=await verfiyaToken(token)
    }
    catch(err){
        return res.status(401).send({mesage:"the token is not valid"})
    }
    // console.log("1",user)
    // console.log("2",user.user)
   
    req.user=user.user
   
    next()




    
    
}