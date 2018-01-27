const Bluebird = require('bluebird');
const path = require('path');
const json2csv = require('json-2-csv');
const fs = require('fs-extra');
const replaceExt = require('replace-ext');

const outputPath = path.join(__dirname, 'data');
const json2csvAsync = Bluebird.promisify(json2csv.json2csv).bind(json2csv);

async function transformGoogleTrendsData() {
  const inputDir = path.join(__dirname, 'raw_data/google-trends');
  const files = fs.readdirSync(inputDir);
  await Promise.all(files.map(async (file) => {
    const filename = path.join(inputDir, file);
    const data = JSON.parse(fs.readFileSync(filename, 'utf-8'));
    const timelineData = data.default.timelineData;
    const csvData = await json2csvAsync(timelineData);
    fs.ensureDirSync(outputPath);
    fs.writeFileSync(path.join(outputPath, replaceExt(file, '.csv')), csvData, 'utf-8');
  }));
}

(async () => {
  transformGoogleTrendsData();
})();
