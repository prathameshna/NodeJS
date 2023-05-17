const express = require('express');
const app = new express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello world!');
});
app.get('/about', (req, res) => {
    res.send('This is about page');
});

app.listen(port, () => {
    console.log(`express app listening at http://localhost:${port}`);
});