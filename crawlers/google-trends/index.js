const axios = require('axios');
const googleTrends = require('google-trends-api');

(async () => {
  const { default: trendsData } = await googleTrends.interestOverTime({
    keyword: 'skin care',
    startTime: new Date('2018-01-01'),
    endTime: new Date('2018-01-28'),
    geo: 'HK',
  }).then(JSON.parse);
  if (trendsData.timelineData == null) {
    throw new Error('unable to find timeline data');
  }
  const output = trendsData.timelineData.map(data => ({
    time: +data.time,
    value: data.value && data.value[0],
  }));
  console.log(output);
})();

(async () => {
  const response = await axios.request({
    url: 'https://api.data.gov.hk/v1/historical-archieve/list-files',
    method: 'get',
    params: {
      start: '20180101',
      end: '20180128',
      category: 'climate-and-weather',
      provider: 'hk-hko',
    },
  });
  console.log(response.data);
})();