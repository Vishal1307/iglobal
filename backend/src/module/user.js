const mongoose=require('mongoose');
const bcrypt = require('bcrypt')

const userSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    phone:{type:Number, required:true},
    city:{type:String, required:true},
    role:[{type:String,required:true}]


    
},{
    versionKey:false,
    timestamps:true
})
userSchema.pre("save",function(next){
    if(!this.isModified('password')) return next()
    this.password=bcrypt.hashSync(this.password,bcrypt.genSaltSync(8))
    return next()
})
userSchema.methods.checkPassword=function(password){
    
    return bcrypt.compareSync(password,this.password)
    
}
module.exports=mongoose.model('User', userSchema);