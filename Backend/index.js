const dotenv=require('dotenv')
const connectdb =require('./db/data.js')
const app=require('./app.js')
dotenv.config()

connectdb()
.then(()=>{
  app.listen(`${process.env.PORT}`,()=>{
    console.log(`server is running on port:${process.env.PORT}`)
  })
})
.catch((err)=>{
  console.log("connection failed",err)
});



