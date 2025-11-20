const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
require("dotenv").config()

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60
    }
}))

// Routes
app.use("/", require("./routes/index.js"));
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/companies", require("./routes/companies.js"));
app.use("/api/sessions", require("./routes/session.js"));
app.use("/api/supabase", require("./routes/supabase.js"));


app.listen(3000, "0.0.0.0", () => {
    console.log("Server is running on port 3000.");
})