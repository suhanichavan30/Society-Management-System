const asyncHandler=require('../utils/asyncHandler.js')
const ApiError=require('../utils/ApiError.js')
const User=require('../models/userModel.js')
const ApiResponse=require('../utils/ApiResponse.js')
const jwt=require('jsonwebtoken')
const generateAccessAndRefreshTokens=async(userId)=>{
    try {
        const user=await User.findById(userId)
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()

        user.refreshToken=refreshToken
        user.save({ValidateBeforeSave:false})

        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,'erro in geneating token')
    }
}

const registerUser=asyncHandler(async(req,res)=>{

   const {username,email,password,phone,room,wing,flattype,floorno,roomfee,status}=req.body;
   if(
    [username,email,password].some((field)=>
        field?.trim()==="")
   ){
        throw new ApiError(400,"Al field are required")
   }

   const existeduser=await User.findOne({ email: req.body.email });

   if(existeduser){
    throw new ApiError(409,"User with email is already exist")
   }

   const user=await User.create({
    username,phone,room,wing,email,password,flattype,floorno,roomfee,status
   })

    const createduser=await User.findById(user._id).select(
        "-password -refreshToken"
    )      
    if(!createduser){
        throw new ApiError(500,"Somethin went wrong while registering user")
    }
    
    return res.status(201).json(
        new ApiResponse(200,createduser,"user registered succesfully")
    )
})


const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email){
        throw new ApiError(400,"email or passord is required")

    }

    const user=await User.findOne({
        email
    })
    if(!user){
        throw new ApiError(404,"User is not found")
    }
    const passvalid=await user.isPasswordCorrect(password)
    if(!passvalid){
        throw new ApiError(401,"password incorrect")
    }
    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id)
    
    const loggedInUser=await User.findById(user._id).select('-password -refreshToken')

    const options={
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie('refreshToken',refreshToken,options)
    .json(
        new ApiResponse(
            200,{
                user:loggedInUser,accessToken,refreshToken
            },
            "User logged in succesfully"
        )
    )
})

const allowner=asyncHandler(async(req,res)=>{
    try {
        const users = await User.find(); 
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})


const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id, // Correct usage of method
        {
            $set: {
                refreshToken: undefined,
            },
        },
        {
            new: true, // Ensure the updated document is returned
        }
    );
 
   const options={
    httpOnly:true,
    secure:true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie('refreshToken',options)
    .json(new ApiResponse(200,{},"User logged out"))
})



const refreshAccessToken=asyncHandler(async(req,res)=>{
    const incomingrefreshtoken=await req.cookies.refreshToken || req.body.refreshToken

    if(!incomingrefreshtoken){
        throw new ApiError(401,"unauthorized acces")
    }
    const decodedToken=jwt.verify(incomingrefreshtoken,process.env.REFRESH_TOKEN_SECRET)
    const user=await User.findById(decodedToken?._id)
    if(!user){
        throw new ApiError(401,"Invalid refresh token")
    }
    if(incomingrefreshtoken!=user?.refreshToken){
        throw new ApiError(401,"Refresh token is expired")
    }
    const options={
        httpOnly:true,
        secure:true
    }
    const {accessToken,newrefreshToken}=await generateAccessAndRefreshTokens(user._id)

    return res
    .status(200)
    .cookie('accessToken',accessToken,options)
    .cookie('refreshToken',newrefreshToken,options)
    .json(
        new ApiResponse(
            200,{
                accessToken,refreshToken:newrefreshToken
            },
            "Access token refreshed"
        )
    )
})  
module.exports={registerUser,loginUser,allowner,logoutUser,refreshAccessToken};