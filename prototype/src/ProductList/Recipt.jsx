import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { compose, setDisplayName } from 'recompose';
import { format } from 'currency-formatter';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import QRCode from 'qrcode-react';
import Typography from 'material-ui/Typography';

const enhance = compose(
  setDisplayName('@pages/ProductList'),
  connect(state => ({
    items: state.products.items,
    sum: state.products.sum,
  })),
  withStyles({
    dialog: {
      maxWidth: 400,
    },
    priceSum: {
      textAlign: 'right',
    },
  }),
);

const ProductItem = compose(
  setDisplayName('@components/ProductItem'),
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

const Recipt = ({ classes, items, sum, open, onClose }) => (
  <Dialog classes={{ paper: classes.dialog }} open={open} onClose={onClose}>
    <div style={{ padding: 16 }}>
      <Typography type="title" align="center">
        A.S Watsons Hackathon
      </Typography>
      <Typography type="subheading" align="center">
        Lucky12
      </Typography>
      <Typography type="subheading" align="center">
        XXXXX XXXXX XXXXX XXXXX
      </Typography>
      <Typography type="subheading" align="center">
        XXXXX XXXXX XXXXXX
      </Typography>
      <Typography type="subheading" align="center">
        XXXXX XXXXX
      </Typography>
      <Typography type="body1" align="center">
        TEL. NO: XXX-XXXX-XXXX FAX. NO: XXX-XXXX-XXXX
      </Typography>
    </div>
    <Divider />
    <ListItem>
      <ListItemText style={{ textAlign: 'left' }} primary="Date" />
      <ListItemText style={{ textAlign: 'right' }} primary={moment().format('YYYY-MM-DD')} />
    </ListItem>
    <ListItem>
      <ListItemText style={{ textAlign: 'left' }} primary="Machine ID" />
      <ListItemText style={{ textAlign: 'right' }} primary="Lucky12" />
    </ListItem>
    <Divider />
    <List>
      {Object.keys(items).map(key => items[key].count === 0 ? null : (
        <ProductItem key={items[key].id} product={items[key].name} quantity={items[key].count} price={items[key].price} />
      ))}
      <Divider />
      <ListItem>
        <ListItemText className={classes.priceSum} primary={format(sum, { code: 'HKD' })} />
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
                Expired Date: {moment().add(3, 'months').format('YYYY-MM-DD')}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </List>
  </Dialog>
);

export default enhance(Recipt);
