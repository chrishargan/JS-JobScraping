const Sheet = require('./sheet');
const fetch = require('node-fetch');

async function scrapePage(i) {
    const result = await fetch(`https://jobs.github.com/positions.json?page=${i}&search=code`);
    const json = await result.json();

    const rows = json.map(job => {
        return {
            type: job.type,
            link: job.url,
            date: job.created_at,
            company: job.company,
            homepage: job.company_url,
            location: job.location,
            title: job.title,
        }
    })
    return rows;
}

(async function () {

    let i = 1;
    let rows = [];
    while (true) {
        const newRows = await scrapePage(i);
        console.log('new row length', newRows.length)
        if (newRows.length === 0) break;
        rows = rows.concat(newRows);
        i++;
    }
    console.log('total rows length', rows.length);

    const sheet = new Sheet();
    await sheet.load();
    await sheet.addRows(rows)

})()
