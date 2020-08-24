const fs = require('fs').promises;

const writeHTML = async () => {
    const template = `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>XSS</title>
        
            <link rel="stylesheet" href="/style.css">
            <script defer src="/main.js"></script>
        </head>
        
        <body>
            <h1 class="tag">Comidas deliciosas</h1>

            <ul>
                ${await renderFood()}
            </ul>

            <form id="image-form" action="/addImage" method="POST" enctype="multipart/form-data">
                <input type="file" name="image">
                <button type="submit">Enviar</button>
            </form>
        </body>
        
        </html>    
    `

    await fs.writeFile('index.html', template);

    async function renderFood() {
        let template = '';
        try {
            /* reading data */
            const fileList = await fs.readdir('./public/uploads');
            const pureSvgs = await Promise.all(fileList.map(getPureContent));

            /* painting comments */
            pureSvgs.forEach(element => {
                template += foodTemplate(element);
            });

        } catch (error) {
            console.log(error);
        } finally {
            return template;
        }

        function foodTemplate(foodSvg) {
            return `
                <li>
                    ${foodSvg}
                </li>
            `
        }

        async function getPureContent(filename) {
            const pureContent = await fs.readFile(`./public/uploads/${filename}`, 'utf-8');

            return pureContent;
        }
    }
}

module.exports = { writeHTML }