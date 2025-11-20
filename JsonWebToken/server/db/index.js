const {Pool} = require("pg");


const pool = new Pool({
    user: "postgres",
    password: "Berat437..",
    host: "localhost",
    port: 5432,
    database: "users",
});

const query = (text, params) => {
    return pool.query(text, params);
}

module.exports = {query};