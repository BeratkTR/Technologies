const express = require("express");
const router = express.Router();
const db = require("../db/index");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const {verifyToken} = require("../middlewares")

router.post("/signup", async(req,res) => {
   try{
     const {username, password} = req.body;
     const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
     
    if(!username || !password) return res.status.send({msg: "Kullanıcı adı ya da parola giriniz."});
    if(result.rowCount != 0) return res.status(409).json({msg: "Username already exists"}); 

    const hashedPassword = await bcrypt.hash(password,10);
    db.query("INSERT INTO users(username, password) VALUES ($1, $2)", [username, hashedPassword]);

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
        const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);

        if(result.rowCount == 0) return res.status(404).json({msg: "user does not exists."});

        const passwordMatch = await bcrypt.compare(password, result.rows[0].password);
        if(!passwordMatch) return res.status(401).json({msg: "Wrong password"});
        
        const token = jwt.sign({username: username, premium: result.rows[0].premium},  "secret",  {expiresIn: "1m"})
        res.status(200).json({token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg: "Internal server error."})
    }
} )



router.post("/upgrade-premium", verifyToken, async(req,res) => {
    try{
        const result = await db.query("UPDATE users SET premium = TRUE WHERE username = $1 RETURNING *", [req.username]);
        console.log(result.rows)

        const token = jwt.sign({username: req.username, premium: result.rows[0].premium}, "secret", {expiresIn: "1m"});

        res.json({token: token});
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})
router.post("/downgrade-premium", verifyToken, async(req,res) => {
    try{
        const result = await db.query("UPDATE users SET premium = FALSE WHERE username = $1 RETURNING *", [req.username]);

        const token = jwt.sign({username: req.username, premium: result.rows[0].premium}, "secret", {expiresIn: "1m"});

        res.json({token: token});
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

module.exports = router;