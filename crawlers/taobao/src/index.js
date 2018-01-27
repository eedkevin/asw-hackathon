const Crawler = require('crawler');
const fs = require('fs');

const parser = require('./parser');

const crawler = new Crawler({
  rateLimit: 2000,
  callback: function(err, res, done) {
    console.log(res.options.uri);
    if(err) {
      console.error(err);
    } else {
      parser.parse(res, (err, items) => {
        if(err) {
          return console.error(e);
        }
        console.log(items);
        result = result.concat(items);
      })
    }
    done();
  }
});

crawler.on('drain', () => {
  fs.writeFile("../result.json", JSON.stringify(result), function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
});

const q = "香港代购";
const pages = 10;
const baseUrl = `https://s.taobao.com/search?q=${q}&imgfile=&js=1&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20180127&ie=utf8&sort=renqi-desc&cps=yes&cat=1801&bcoffset=4&ntoffset=0&p4ppushleft=1%2C48&data-key=s&data-value=`;

let result = [];
Array.from(Array(pages).keys()).forEach(i => {
  let dataValue = i * 44;
  crawler.queue(baseUrl + dataValue);
});