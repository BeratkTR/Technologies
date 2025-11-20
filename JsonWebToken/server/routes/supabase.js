const express = require("express");
const router = express.Router();
const db = require("../db/index");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const {verifyToken, checkPremium} = require("../middlewares/supamiddle")
const {supabase} = require("../db/supabase");

router.post("/signup", async(req,res) => {
   try{
     const {username, password} = req.body;
     const result = await supabase.from("users").select().eq("username", username);
     
    if(!username || !password) return res.status.send({msg: "Kullanıcı adı ya da parola giriniz."});
    if(result.data.length != 0) return res.status(409).json({msg: "Username already exists"}); 

    const hashedPassword = await bcrypt.hash(password,10);
    db.query("INSERT INTO users(username, password) VALUES ($1, $2)", [username, hashedPassword]);
    await supabase.from("users").insert({username, password:hashedPassword});

    res.json({msg: "Success."})
   }
    catch(err){
        console.log(err);
        res.status(500).json({msg: "Internal server error."})
    }
})

router.post("/login", async(req,res)=> {
    try{
        const {username, password} = req.body;
        const result = await supabase.from("users").select().eq("username", username);

        if(result.data.length == 0) return res.status(404).json({msg: "user does not exists."});

        const passwordMatch = await bcrypt.compare(password, result.data[0].password);
        if(!passwordMatch) return res.status(401).json({msg: "Wrong password"});
        
        const token = jwt.sign({username: username, premium: result.data[0].premium},  "secret",  {expiresIn: "1m"})
        res.status(200).json({token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg: "Internal server error."})
    }
} )

router.post("/upgrade-premium", verifyToken, async(req,res) => {
    try{
        const result = await supabase.from("users").update({premium: true}).eq("username", req.username).select();   

        const token = jwt.sign({username: req.username, premium: result.data[0].premium}, "secret", {expiresIn: "1m"});

        res.json({token: token});
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})
router.post("/downgrade-premium", verifyToken, async(req,res) => {
    try{
        const result = await supabase.from("users").update({premium: false}).eq("username", req.username).select();

        const token = jwt.sign({username: req.username, premium: result.data[0].premium}, "secret", {expiresIn: "1m"});

        res.json({token: token});
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

router.get("/bist100", verifyToken, async(req,res) => {
        const result = await supabase.from("companies").select().eq("stock", "Bist100");
        res.json(result.data);
})

router.get("/nasdaq", verifyToken, checkPremium, async(req,res) => {
    const result = await supabase.from("companies").select().eq("stock", "Nasdaq");
    res.json(result.data);
})


module.exports = router;