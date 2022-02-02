const mongoose =require('mongoose');

const noteSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        
    },
    tag:{
        type:String,
        default:'General',
        
    },
    date:{
        type:Date,
        default:Date.now
    },

})

const note = mongoose.model('note', noteSchema);
module.exports=note;