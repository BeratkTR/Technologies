const jwt = require("jsonwebtoken")
const db = require("../db")
const {supabase} = require("../db/supabase")

const verifyToken = (req,res,next) => {
    const token = req.header("Authorization");
    if(!token) return res.sendStatus(401);

    try{
        const decoded = jwt.verify(token, "secret");
        req.username = decoded.username;
        next();
    } 
    catch(err){
        console.log(err)
        res.status(401).json({error: "Invalid token."})
    }
}

const checkPremium = async(req,res,next) => {
    const result = await supabase.from("users").select().eq("username", req.username);
    if(result.data[0].premium) next();
    else res.status(403).json({error: "You are not premium user."})
}


module.exports = {verifyToken, checkPremium};