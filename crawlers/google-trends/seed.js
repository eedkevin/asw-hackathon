const path = require('path');
const axios = require('axios');
const fs = require('fs-extra');
const moment = require('moment');
const googleTrends = require('google-trends-api');
const xml2json = require('xml2json');
const json2csv = require('json-2-csv');

const outputPath = path.join(__dirname, 'raw_data');
fs.ensureDirSync(outputPath);

async function getGoogleTrendsData(keyword, geo, start, end) {
  const inputs = await parseDateToArrayInput(start, end);
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const trendsData = await googleTrends.interestOverTime({
      keyword,
      startTime: moment(input.start).toDate(),
      endTime: moment(input.end).toDate(),
      geo,
    });
    const filename = `${geo.replace(/ /, '')}_${keyword.replace(/ /, '')}_${moment(input.start).format('YYYYMMDD')}-${moment(input.end).format('YYYYMMDD')}.json`;
    fs.writeFileSync(
      path.join(outputPath, filename),
      trendsData,
      'utf-8'
    );
  }
}

async function parseDateToArrayInput(start, end) {
  const output = [];

  const startDate = moment(start, 'YYYY-MM-DD').toDate();
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const startDay = startDate.getDate();

  const endDate = moment(end, 'YYYY-MM-DD').toDate();
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();
  const endDay = endDate.getDate();

  for (let i = startYear; i <= endYear; i++) {
    const from = (i === startYear) ? startMonth : 0;
    const to = (i === endYear) ? endMonth : 11;
    for(let j = from; j <= to; j++) {
      const startdate = (i === startYear && j === startMonth) ?
        moment(`${i}-${j+1}-${startDay}`, 'YYYY-MM-DD') :
        moment(`${i}-${j+1}-01`, 'YYYY-MM-DD').startOf('month');
      const enddate = (i === endYear && j === endMonth) ?
        moment(`${i}-${j+1}-${endDay}`, 'YYYY-MM-DD') :
        moment(`${i}-${j+1}-01`, 'YYYY-MM-DD').endOf('month');
      
      output.push({ start: startdate, end: enddate });
    }
  }

  return output;
}

(async () => {
  await getGoogleTrendsData('skin care', 'HK', '2017-12-27', '2018-01-27');
})();