const Bluebird = require('bluebird');
const path = require('path');
const json2csv = require('json-2-csv');
const fs = require('fs-extra');
const replaceExt = require('replace-ext');

const outputPath = path.join(__dirname, 'data');
const json2csvAsync = Bluebird.promisify(json2csv.json2csv).bind(json2csv);

async function transformWeatherData() {
}

(async () => {
  transformWeatherData();
})();
