const fs = require('fs');
async function main () {
    const response = await fetch("https://api.kanye.rest/", {
        "headers": {
            "accept": "application/json"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET"
    });

    const payload = await response.json();
    const quote = payload.quote;
    const pageTitle = 'Today\'s words of wisdom from Kanye West';

    const htmlFile = fs.readFileSync('./index.html').toString();
    const buildFile = htmlFile.replace('{QUOTE}', quote).replace('{TITLE}', pageTitle);

    if (!fs.existsSync('./dist')) {
        fs.mkdirSync('./dist');
    }

    fs.writeFileSync('./dist/index.html', buildFile);
}

main();