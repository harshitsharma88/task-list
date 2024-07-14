const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    deadline:{
        type: String,
        required:true
    },
    status:{
        type:String,
        enum:['To Do','In Progress','Done'],
        default:'To Do'
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
})

module.exports= mongoose.model('tasks',taskSchema);

