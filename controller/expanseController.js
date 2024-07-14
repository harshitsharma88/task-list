const path=require('path');
const Tasks=require('../model/tasks');
const User=require('../model/usercredentials');
const mongoose = require('mongoose');

exports.getHomePage=(req,res,next)=>{
    res.sendFile(path.resolve('public/views/task.html'))
}

exports.getTask=async (req,res,next)=>{
    const {user}=req;
    let{itemsperpage,currentpage}=req.params;
    
    try {

        itemsperpage= parseInt(itemsperpage);
        currentpage=parseInt(currentpage)

        let totalItems = await Tasks.countDocuments({userId:user._id});
        const totalpages= Math.ceil(totalItems/itemsperpage);

        const toSkip = itemsperpage*(currentpage-1);
        let response = await Tasks.find({userId:user._id}).skip(toSkip).limit(itemsperpage).sort('deadline');
        
        res.status(200).json({response,totalpages})
    } 
    catch (error) {
        res.status(500).json("Server Error")
    }
}

exports.addTask=async (req,res,next)=>{
    const {user} = req;
    
    try {
        console.log(req.body.deadline);

        const addtask= await Tasks.create({
            title:req.body.title,
            deadline:req.body.deadline,
            description:req.body.description,
            userId:user._id
        });

        res.status(201).json(addtask.dataValues);  
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json("Error Occurred")
        
    }
    
}

exports.deleteTask=async (req,res,next)=>{
    console.log("/////////////////////////////////////");
    console.log(req.body);
    const {user}=req;
    try{
        const deleteTask= await Tasks.findByIdAndDelete({_id:req.body._id});

        res.status(200).json("Deleted"); 

    }
    catch(err){
        console.log(err);
        res.status(500).json('Something Went Wrong');

    }
}

exports.updateTask=async (req,res,next)=>{
    try{
        await Tasks.updateOne({_id:req.body.id},{status:req.body.status});
        res.status(200).json("Deleted"); 

    }
    catch(err){
        console.log(err);
        res.status(500).json('Something Went Wrong');

    }
}



exports.deleteUser=async(req,res,next)=>{
    const {user}=req;
    try{
        const deleteUser= User.deleteOne({_id:user._id});
        const deleteRecords = Tasks.deleteMany({userId:user._id});

        await Promise.all([deleteRecords,deleteUser]);

        res.status(200).json("Deleted"); 

    }
    catch(error){
        console.log(error);
        res.status(500).json('Something Went Wrong');
    }
}
