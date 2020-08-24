const express = require('express');
const app = express();

const { appendComment } = require('./crud');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('---> http://localhost:3000/');
});

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.post('/addComment', async (req, res) => {
    await appendComment(req.body);
    res.redirect('/');
});

