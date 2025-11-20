const express = require("express");
const path = require("path");
const { workedMiddleware } = require("../middlewares");
const router = express.Router();
const db = require("../db");
const {supabase} = require("../db/supabase")

router.get("/", workedMiddleware, (req,res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
})
router.get("/hidden", workedMiddleware, (req,res) => {
    res.json({message: process.env.MESSAGE});
})
router.get("/db", async(req,res) => {
    const result = await db.query("SELECT * from users;");
    res.send(result.rows);
})
router.get("/sup", async(req,res) => {
    const result = await supabase.from("companies").select();  // {data, error}
    if(result.error){
        console.log(error);
        return res.json({msg: "sup error"})
    }

    res.json(result.data);
})



module.exports = router;