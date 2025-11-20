const express = require("express");
const { verifyToken, checkPremium } = require("../middlewares");
const router = express.Router();
const db = require("../db");

router.get("/bist100", verifyToken, async(req,res) => {
        const result = await db.query("SELECT * FROM companies WHERE stock = 'Bist100'");
        res.json(result.rows);
})

router.get("/nasdaq", verifyToken, checkPremium, async(req,res) => {
    const result = await db.query("SELECT * FROM companies WHERE stock = 'Nasdaq'");
    res.json(result.rows);
})

module.exports = router;