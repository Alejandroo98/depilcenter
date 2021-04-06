const express = require('express');
const app = express();
const path = require('path');
app.set('views', path.resolve(__dirname, '../public/views'));


app.get("/conocenos" , ( req , res ) => {
    res.render("conocenos")
})


module.exports = app;