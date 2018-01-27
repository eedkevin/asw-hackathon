const path = require('path');
const axios = require('axios');
const fs = require('fs-extra');
const moment = require('moment');
const xml2json = require('xml2json');

const outputPath = path.join(__dirname, 'raw_data');
fs.ensureDirSync(outputPath);

async function getWeathersData(geo, start, end) {
  const inputs = await parseDateToArrayInput(start, end);
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const response = await axios.request({
      url: 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx',
      method: 'get',
      params: {
        q: geo,
        key: '69ac781020244d2ea9b74151182701',
        date: input.start,
        enddate: input.end,
      },
    });
    const filename = `${geo.replace(/ /, '')}_${moment(input.start).format('YYYYMMDD')}-${moment(input.end).format('YYYYMMDD')}.json`;
    fs.writeFileSync(
      path.join(outputPath, filename),
      xml2json.toJson(response.data),
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
  await getWeathersData('Hong Kong', '2017-01-27', '2018-01-27');
})();