const express = require('express');
const app = express();
const formidable = require('formidable');

const fs = require('fs').promises;
const { writeHTML } = require('./templateEngine');

const useTemplateEngine = false;


if (useTemplateEngine) {
    app.set('view engine', 'ejs');
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('---> http://localhost:3000/');
});

app.get('/', async (req, res) => {

    if (useTemplateEngine) {
        let data = await fs.readFile(`comments.json`, 'utf-8');
        data = JSON.parse(data);
        res.render('index.ejs', { comments: data });
    } else {
        res.sendFile(`${__dirname}/index.html`);
    }
});

app.post('/addImage', async (req, res) => {

    const form = new formidable.IncomingForm();

    await form.parse(req, async (error, fields, files) => {

        const { path, name } = files.image;

        const oldPath = path;
        const newPath = `${__dirname}/uploads/${name}`;
        const rawData = await fs.readFile(oldPath);

        await fs.writeFile(newPath, rawData);
        await writeHTML();
    });

    res.redirect('/');
});

