const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const _ = require('lodash');
const fs = require('fs-extra');
const Crawler = require('crawler');
let productList = require('../src/ProductList/product_price.json');

async function getFirstGoogleImage(query) {
  let ls = [];
  const { data } = await axios.request({
    method: 'get',
    url: 'http://images.google.com/search?tbm=isch&q=' + query,
  });
  const $ = cheerio.load(data);
  const url = $($('img')[0]).attr('src');
  return url;
}

(async () => {
  productList = _.sampleSize(productList.filter(p => +p.FIELD8), 20);
  const productData = await Promise.all(productList.map(async p => Object.assign(p, {
    IMAGE: await getFirstGoogleImage(p.FIELD3),
  })));
  fs.writeFileSync(path.join(__dirname, '..', 'src/ProductList/products.json'), JSON.stringify(productData), 'utf-8');
})();
