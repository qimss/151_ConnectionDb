import express from "express";
import pg from "pg";

const app = express();
const port = 3000;

const {Pool} = new pg

app.use(express.json());
app.use(
    express.urlencoded({ 
        extended: true
    })
);

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

app.get("/", (req, res) => {
    console.log("TEST DATA:");
    pool.query("SELECT * FROM biodata")
    .then(testData => {
        console.log(testData);
        res.send(testData.rows);
    })
    .catch(err => {
        console.error(err);
        res.status(500).send("Internal Server Error");
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});