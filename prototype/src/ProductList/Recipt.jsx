import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
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
  withRouter,
  connect(state => ({
    items: state.products.items,
    sum: state.products.sum,
  })),
  withStyles({
    dialog: {
      maxWidth: 300,
    },
    priceSum: {
      textAlign: 'right',
      padding: 0,
    },
  }),
);

const ProductItem = compose(
  setDisplayName('@components/ProductItem'),
  withStyles({
    product: {
      textAlign: 'left',
      padding: 0,
    },
    price: {
      textAlign: 'right',
      padding: 0,
    },
    padding0: {
      padding: 0,
    },
    flex: {
      flex: '1 1 auto',
    },
  }),
)(({ classes, product, quantity, price }) => (
  <Typography type="body1">
    <ListItem dense>
      <ListItemText disableTypography className={classes.product} primary={`${quantity} X ${product}`} />
      <div className={classes.flex} />
      <ListItemText disableTypography className={classes.price}  primary={format(price, { code: 'HKD' })} />
    </ListItem>
  </Typography>
));

const Recipt = ({ classes, history, items, sum, open, onClose }) => (
  <Dialog classes={{ paper: classes.dialog }} open={open} onClose={onClose}>
    <div style={{ padding: 16 }}>
      <Typography type="subheading" align="center">
        A.S Watsons Hackathon
      </Typography>
      <Typography type="body1" align="center">
        Lucky12
      </Typography>
      <Typography type="body1" align="center">
        XXXXX XXXXX XXXXX XXXXX
      </Typography>
      <Typography type="body1" align="center">
        XXXXX XXXXX XXXXXX
      </Typography>
      <Typography type="body1" align="center">
        XXXXX XXXXX
      </Typography>
      <Typography type="caption" align="center">
        TEL. NO: XXX-XXXX-XXXX
      </Typography>
      <Typography type="caption" align="center">
        FAX. NO: XXX-XXXX-XXXX
      </Typography>
    </div>
    <Divider />
    <ListItem dense>
      <ListItemText style={{ textAlign: 'left', padding: 0 }} primary="Date" />
      <ListItemText style={{ textAlign: 'right', padding: 0 }} primary={moment().format('YYYY-MM-DD')} />
    </ListItem>
    <ListItem dense>
      <ListItemText style={{ textAlign: 'left', padding: 0 }} primary="Machine ID" />
      <ListItemText style={{ textAlign: 'right', padding: 0 }} primary="Lucky12" />
    </ListItem>
    <Divider />
    <List>
      {Object.keys(items).map(key => items[key].count === 0 ? null : (
        <ProductItem key={key} product={items[key].name} quantity={items[key].count} price={items[key].price} />
      ))}
      <Divider />
      <ListItem dense>
        <ListItemText className={classes.priceSum} primary={format(sum, { code: 'HKD' })} />
      </ListItem>
      <div style={{ margin: 16 }}>
      <Typography type="body1" align="left" gutterBottom>
        Coupon: Special For You
      </Typography>
        <div style={{ display: 'flex' }}>
          <div style={{ position: 'relative' }}>
            <span onClick={() => history.push('coupon')} style={{ float: 'left', marginRight: 16 }}>
              <QRCode />
            </span>
            <div style={{ height: 'calc(100% - 4px)', display: 'flex', flexDirection: 'column' }}>
              <Typography type="caption" align="justify" component="span">
                XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX 
                XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX 
                XXX XXX XXX XXX XXX XXX XXX XXX
              </Typography>
              <div style={{ flex: '1 1 auto' }} />
              <Divider />
              <Typography type="caption" align="left" component="span">
                Exp. Date: {moment().add(3, 'months').format('YYYY-MM-DD')}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </List>
  </Dialog>
);

export default enhance(Recipt);
