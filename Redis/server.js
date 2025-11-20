const express = require("express")
const app = express();
const client = require("./config/redisClient.js");
const fs = require("fs")

function dbSorgusu(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id: 1, title: "Çok Satanlar Ürünü", price: 100 });
        }, 2000);
    });
};

async function getData(){
    const cacheKey = "urun:0";
    // Redis
    const cachedData = await client.get(cacheKey);
    const parsed = JSON.parse(cachedData);
    if(cachedData){
        return {
            from: "Cache", 
            parsed
        }
    }
    // DB
    const data = await dbSorgusu();
    await client.set(cacheKey, JSON.stringify(data), {EX: 60})
    return {
        from: "DB", 
        data
    }
}


app.get("/", async(req,res) => {
    const start = performance.now()
    const data = await getData();
    const end = performance.now()
    const total = end - start;

    res.json({data, "Süre": total});
})





app.listen(80, () => {
    console.log("App is running on port 80");
})