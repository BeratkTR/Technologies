const express = require("express");
const router = express.Router();

router.get("/", (req,res) => {
    
    console.log(req.session);
    console.log(req.sessionID);
    res.cookie("hello", "wrold", {maxAge: 60000})
    res.sendStatus(200);
});


module.exports = router;