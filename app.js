import express from "express";
import pg from "pg";
import dotenv from "dotenv";
const app = express();
const port = 3000;

const {Pool} = pg

dotenv.config();

app.use(express.json());
app.use(
    express.urlencoded({ 
        extended: true
    })
);

const pool = new Pool({
    user: String(process.env.USER),
    host: String(process.env.HOST),
    database: String(process.env.DATABASE),
    password: String(process.env.PASSWORD),
    port: Number(process.env.PORT),
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