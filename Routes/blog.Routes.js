const express = require("express");
const { BlogModel } = require("../Models/blog.Models");
const { roleMiddleware } = require("../Middlewares/role.Middlewares");
const BlogRouter = express.Router()
BlogRouter.use(roleMiddleware)
BlogRouter.get("/", roleMiddleware("User","Moderator"),async(req,res)=>{
    try{
        let blogs = await BlogModel.find();
        res.json({blogs})

    }catch(err){
        console.log(err.message);
        res.status(400).json({ err: err.message });

    }

})

BlogRouter.post("/add",roleMiddleware("User","Moderator"), async(req,res)=>{
    const {name, post} = req.body;

    try{
        const blogs = new BlogModel({ name, post });
        await blogs.save();
        console.log(blogs);
        res.status(200).json({msg: `New blogs with the name-${user.name} has been saved!`});
        

    }catch(err){
        console.log(err.message);
        res.status(400).json({ err: err.message });
    }

})
BlogRouter.get("/update", async(req,res)=>{
    try{


    }catch(err){
        console.log(err.message);
        res.status(400).json({ err: err.message });

    }

})
BlogRouter.get("/delete", async(req,res)=>{
    try{

    }catch(err){
        console.log(err.message);
        res.status(400).json({ err: err.message });

    }

})
module.exports = {BlogRouter};