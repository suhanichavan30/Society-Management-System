const mongoose=require('mongoose')

const connectdb=async()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("Mongodb connected !! DB host:",connectionInstance.connection.host)
    }catch(error){
        console.log("Mongodb error:",error)
        process.exit(1)
    }
}

module.exports=connectdb;