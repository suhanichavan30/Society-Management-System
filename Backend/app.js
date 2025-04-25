const express = require('express')
const cors=require('cors')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cors({
    origin: "http://localhost:5173",  // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials:true
}));

// app.use(express.json({limit:'16kb'}))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieParser())

//routes import 

const userRouter=require('./routes/userroutes.js')
const guestRouter=require('./routes/guestroutes.js')
const noticeRouter=require('./routes/noticeroutes.js')
const complaintRouter=require('./routes/complaintoutes.js')
const paymentRouter=require('./routes/paymentroutes.js')
//routes declaration
app.use("/users",userRouter);
app.use("/api", guestRouter);
app.use("/api",noticeRouter);
app.use("/api",complaintRouter);
app.use("/api",paymentRouter);



module.exports=app;