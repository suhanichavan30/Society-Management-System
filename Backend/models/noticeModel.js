const mongoose=require('mongoose');

const noticeSchema=new mongoose.Schema(
    {title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    venue:{
        type:String,
    }
},{timestamps:true}
)

const Notice=mongoose.model('Notice',noticeSchema);
module.exports=Notice;
