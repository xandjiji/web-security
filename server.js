const express = require('express');
const app = express();
const formidable = require('formidable');

const fs = require('fs').promises;
const { writeHTML } = require('./templateEngine');

const useTemplateEngine = true;


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
        
        const fileList = await fs.readdir('./public/uploads');
        const pureSvgs = await Promise.all(fileList.map(getPureContent));

        /* res.render('index.ejs', { foodSvgs: pureSvgs, foodNames: fileList }); */
        res.render('indexCorreto.ejs', { foodSvgs: pureSvgs, foodNames: fileList });
    } else {
        res.sendFile(`${__dirname}/index.html`);
    }
});

app.post('/addImage', async (req, res) => {

    const form = new formidable.IncomingForm();

    await form.parse(req, async (error, fields, files) => {

        const { path, name } = files.image;

        const oldPath = path;
        const newPath = `${__dirname}/public/uploads/${name}`;
        const rawData = await fs.readFile(oldPath);

        await fs.writeFile(newPath, rawData);
        await writeHTML();
    });

    res.redirect('/');
});

async function getPureContent(filename) {
    const pureContent = await fs.readFile(`./public/uploads/${filename}`, 'utf-8');

    return pureContent;
}

