import express from 'express';
import consign from "consign";

const PORT = 3000;
const app = express();

// app.get('/', (req, res) => res.json({status: "NTask API"}));
/**
app.get('/tasks', (req, res) => {
    res.json({
        tasks: [
            {title: "buy some shoe"},
            {title: 'fix notebook'}
        ]
    });
});
*/

consign()
    .include("libs/config.js")
    .then("db.js")
    .then("models")
    .then("libs/middlewares.js")
    .then("routes")
    .then("libs/boot.js")
    .into(app);