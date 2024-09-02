import express from "express";
import cors from "cors";
import crypto from "crypto";

const PORT = 8080;
const app = express();
const database = { data: "Hello World" };

app.use(cors());
app.use(express.json());

// Routes

app.get("/", (req, res) => {
    res.json(database);
});

app.post("/", (req, res) => {
    // database.data = req.body.data;
    const { data } = req.body;
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    database.data = { value: data, hash };

    res.sendStatus(200);
});

// New route to verify data integrity
app.post("/verify", (req, res) => {
    const { data } = req.body;
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    if (hash == database.data.hash) {
        res.sendStatus(200);
    } else {
        res.status(400).send("Data has been tampered with");
    }
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
