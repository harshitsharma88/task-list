const usercredentials=require('../model/usercredentials')
const expanse=require('../model/tasks')
const jwt =require('jsonwebtoken');

const path=require('path')
const bcrypt=require('bcrypt');

exports.home=(req,res,next)=>{
    res.sendFile(path.resolve('public','views','login.html'));
    
}

exports.signUp=async (req,res,next)=>{
    try{
        const hashed=await bcrypt.hash(req.body.password,10);
        await usercredentials.create({
            name:req.body.name,
            email:req.body.email,
            password:hashed
        })
        res.status(201).json('user created')

    }
    catch(err){
        console.log(err);
        res.status(500).json("Not Created")
    }

}

const generateToken=(id,name,premium)=>{
    return jwt.sign({id:id,name:name},process.env.SECRET_KEY);
}

exports.logIn=async function(req,res,next){

    try{
       const user= await usercredentials.findOne({email:req.body.email});
            if(user){
                bcrypt.compare(req.body.password,user.password,(err,result)=>{
                    if(err){
                        res.status(500).json('Something Wrong')
                    }
                    if(result){
                        
                    res.status(200).json({message:"Logged In",token:generateToken(user._id,user.name),name:user.name});
                    
                    }
                    else{
                        res.status(400).json("incorrect password")
                    }
                })               
                
            }
            else{
                res.status(404).json("User Not Found");
            }

        
    }
    catch(err){
        res.status(500).json("Something Went Wrong")
    }

}