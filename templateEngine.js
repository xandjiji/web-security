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
            <h1 class="tag">Seção de comentários</h1>

            <ul>
                ${await renderComments()}
            </ul>

            <form id="comment-form" action="/addComment" method="POST">
                <input type="text" placeholder="name" name="author" required>
                <textarea type="text" placeholder="comment" name="comment" required></textarea>
                <button type="submit">Enviar</button>
            </form>
        </body>
        
        </html>    
    `

    await fs.writeFile('index.html', template);

    async function renderComments() {
        let template = '';
        try {
            /* reading data */
            let data = await fs.readFile(`comments.json`, 'utf-8');
            data = JSON.parse(data);

            /* painting comments */
            data.forEach(element => {
                template += commentTemplate(element);
            });
            
        } catch (error) {
            console.log(error);
        } finally {
            return template;
        }

        function commentTemplate(commentItem) {
            const { author, comment } = commentItem;

            return `
                <li>
                    <h3 class="string">${author}</h3>
                    <p>${comment}</p>
                </li>
            `
        }
    }
}

module.exports = { writeHTML }