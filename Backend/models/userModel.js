const mongoose=require('mongoose')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema= new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true,
            min:[10,"Mobile no should be 10 digit"]
        },
        room:{
            type:Number,
            required:true
        },
        roomfee: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            default: "unpaid"
        },
        wing: {
            type: String,
            required: true,
            trim: true,
        },
        email:{
            type:String,
            require:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
        flattype:{
            type:String,
            required:true,
        },
        floorno:{
            type:String,
            required:true,
        },
        refreshToken:{
            type:String
        },


    },{timestamps:true}
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
    jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username    
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User=mongoose.model("User",userSchema)
module.exports=User;