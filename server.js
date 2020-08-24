const express = require('express');
const app = express();

const fs = require('fs').promises;
const { appendComment } = require('./crud');

const useTemplateEngine = false;


if(useTemplateEngine) {
    app.set('view engine', 'ejs');
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('---> http://localhost:3000/');
});

app.get('/', async (req, res) => {

    if(useTemplateEngine) {
        let data = await fs.readFile(`comments.json`, 'utf-8');
        data = JSON.parse(data);
        res.render('index.ejs', { comments: data });
    } else {
        res.sendFile(`${__dirname}/index.html`);
    }

});

app.post('/addComment', async (req, res) => {
    await appendComment(req.body);
    res.redirect('/');
});

