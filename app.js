const express = require("express");
const app = express();

app.use((req, rest, next) => {
    rest.status(200).json({
        message: "It works!"
    });
});

module.exports = app;