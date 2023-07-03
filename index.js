const express = require("express");
const { connection } = require("./db.js");
const { UserRouter } = require("./Routes/users.Routes");
const { BlogRouter } = require("./Routes/blog.Routes.js");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use("/users", UserRouter)
app.use("/blogs", BlogRouter)
app.listen(process.env.PORT, async()=>{
    try{
        await connection
        console.log("Connection to the DB sucessful!")

    }catch(err){
        console.log({err:err.message})

    }
    console.log(`Connected to the Port ${process.env.PORT}`)
})