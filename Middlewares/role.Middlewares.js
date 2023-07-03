const jwt = require("jsonwebtoken");
const roleMiddleware = (requiredrole)=>{
    return (req,res)=>{
        try{
            let token = req.headers.authorization?.split(" ")[1];
            if(token){
                let decoded = jwt.verify(token, "masai")
                if(decoded){
                    if(requiredrole.includes(decoded.role)){
                        next()
                    }else{
                        res.json({msg: "not authorixed"})
                    }
                }else{
                    res.json({msg: "invalid token"})
                }
            }else{
                res.json({msg: "Please Login!!"})
            }
        }catch(err){
            console.log(err.message)
            res.json({err:err.message})
        }
    }
}
module.exports = {roleMiddleware}