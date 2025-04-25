const mongoose=require('mongoose')

const complaintSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        owner:{
            type:String,
            
        }

    },{timestamps:true}

)

const Complaint=mongoose.model("Complaint",complaintSchema)
module.exports=Complaint;