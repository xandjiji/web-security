const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('---> http://localhost:3000/');
});

var callCount = 0;

const endpoint = async (req, res) => {
    callCount++;

    console.log(callCount);
    res.end();
}

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/endpoint', endpoint);
/* app.post('/endpoint', endpoint); */