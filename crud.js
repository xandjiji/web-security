const { writeHTML } = require('./templateEngine');

const fs = require('fs').promises;

const appendComment = async (body) => {
    try {
        /* reading data */
        let data = await fs.readFile(`comments.json`, 'utf-8');
        data = JSON.parse(data);

        /* appending data */
        data.push(body);

        /* writing data */
        data = JSON.stringify(data);
        await fs.writeFile('comments.json', data);

        await writeHTML();

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = { appendComment }