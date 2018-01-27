
function parse(res, callback) {
  const $ = res.$;
  let itemTitles = [];

  let scripts = $('script');
  let html = scripts['7'].children['0'].data;
  let gPageConfigStr = /g_page_config =(.*);/.exec(html)[1];
  let gPageConfig = JSON.parse(gPageConfigStr);

  let items = gPageConfig.mods.itemlist.data.auctions;

  for(let i=0; i<items.length; i++) {
    itemTitles.push(items[i].raw_title);
  }
  return callback(null, itemTitles);
}

const parser = {
  parse,
};

module.exports = parser;