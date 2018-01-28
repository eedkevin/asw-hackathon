var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var axios = require('axios');
var app = express();

app.use(bodyParser());

app.post('/recommend-items', async function (req, res, next) {
  try {
    const { memberId, items = [] } = req.body;
    console.log(req.body);
    const response = await axios.request({
      method: 'post',
      url: 'https://asiasoutheast.services.azureml.net/workspaces/bd9ab81f41ff4248ab95c6a76d8f84b0/services/0697a29d91b04e5fb40bf3d7e1b2451b/execute?api-version=2.0&details=true',
      headers: {
        authorization: 'Bearer b+MgasIA0I0lXPvzHKovJzdCfvrhPDsHYBm/vEM6Avq17r6Rs26CPq7QBN3bkwIfYUqXCTZ896YBwB6Flu8iZQ==',
      },
      data: {
        Inputs: {
          input1: {
            "ColumnNames": [
              "MEMBER_ID",
              "PRODUCT_ID",
              "ITEM_QUANTITY"
            ],
            "Values": items.map(item => ([
              memberId,
              item.id.toString(),
              item.quantity.toString(),
            ])),
          }
        },
        "GlobalParameters": {}
      }
    });
    const [member, ...data] = response.data.Results.output1.value.Values[0];
    res.json(data);
  } catch (err) {
    next(err);
  }
});

app.use('/', express.static(path.join(__dirname, '../build')));

app.listen(4080, function(err) {
  if(!err) console.log('Server Started on port 4080!');
});