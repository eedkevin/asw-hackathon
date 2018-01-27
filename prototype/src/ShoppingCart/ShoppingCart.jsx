import React from 'react';
import { compose } from 'recompose';
import { format } from 'currency-formatter';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText } from 'material-ui/List';
import QRCode from 'qrcode-react';
import Typography from 'material-ui/Typography';

const enhance = compose(
  withStyles({
    priceSum: {
      textAlign: 'right',
    },
  }),
);

const ProductItem = compose(
  withStyles({
    product: {
      textAlign: 'left',
    },
    price: {
      textAlign: 'right',
    },
  }),
)(({ classes, product, quantity, price }) => (
  <ListItem>
    <ListItemText className={classes.product} primary={`${quantity} X ${product}`} />
    <ListItemText className={classes.price}  primary={format(price, { code: 'HKD' })} />
  </ListItem>
));

const ShoppingCart = ({ classes }) => (
  <Paper style={{ margin: 16, maxWidth: 400, minHeight: 600 }}>
    <div style={{ padding: 16 }}>
      <Typography type="title" align="center">
        A.S Watsons Hackathon
      </Typography>
      <Typography type="body1" align="center">
        TEL. NO: XXX-XXXX-XXXX FAX. NO: XXX-XXXX-XXXX
      </Typography>
    </div>
    <Divider />
    <ListItem>
      <ListItemText style={{ textAlign: 'left' }} primary="Date" />
      <ListItemText style={{ textAlign: 'right' }} primary="2018/01/27" />
    </ListItem>
    <ListItem>
      <ListItemText style={{ textAlign: 'left' }} primary="Server" />
      <ListItemText style={{ textAlign: 'right' }} primary="system" />
    </ListItem>
    <Divider />
    <List>
      <ProductItem product="Product1" quantity={10} price={100} />
      <ProductItem product="Product1" quantity={10} price={100}  />
      <ProductItem product="Product1" quantity={10} price={100}  />
      <ProductItem product="Product1" quantity={10} price={100}  />
      <Divider />
      <ListItem>
        <ListItemText className={classes.priceSum} primary={format(400, { code: 'HKD' })} />
      </ListItem>
      <div style={{ margin: 16 }}>
      <Typography type="body1" align="left" gutterBottom>
        Coupan: Special For You
      </Typography>
        <div style={{ display: 'flex' }}>
          <div style={{ position: 'relative' }}>
            <span style={{ float: 'left', marginRight: 16 }}>
              <QRCode />
            </span>
            <div style={{ height: 'calc(100% - 4px)', display: 'flex', flexDirection: 'column' }}>
              <Typography type="caption" align="justify" component="span" autoWrap>
                XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX 
                XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX 
                XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX 
              </Typography>
              <div style={{ flex: '1 1 auto' }} />
              <Divider />
              <Typography type="caption" align="left" component="span">
                Expired Date: 2018-03-30
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </List>
  </Paper>
);

export default enhance(ShoppingCart);
