module.exports=(permittedRoles)=>{
    return (req,res,next)=>{
        const user=req.user
        let isAllowed=false
        for(var i=0;i<user.role.length;i++){
            if(permittedRoles.includes(user.role[i])){
                isAllowed=true
                break
            }
        }
        if(isAllowed){
            

            next()
        }
        else{
            return res.status(403).send({message:"Permision denied"})
        }
    }
}
// module.exports=authorise