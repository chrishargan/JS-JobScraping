const {GoogleSpreadsheet} = require('google-spreadsheet');

module.exports = class Sheet {
    constructor() {
        this.doc = new GoogleSpreadsheet('1qMMhtXCaOdm8rAw5GtX0SQKDbUyFT7V6_JmRWJphDAo');

    }

    async load() {
        await this.doc.useServiceAccountAuth(require('./credentials.json'));
        await this.doc.loadInfo();
    }

    async addRows(rows) {
        const sheet = this.doc.sheetsByIndex[0];
        await sheet.addRows(rows)
    }
};
