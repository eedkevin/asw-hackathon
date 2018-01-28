import React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Barcode from 'react-barcode';
import productList from '../ProductList/product_price';

const products = {};
productList.map(p => {
  products[p.FIELD1] = p;
});

const enhance = compose(
  setDisplayName('@components/Coupan'),
  connect(state => ({
    recommendedItems: state.products.rec,
  })),
  withStyles({
    content: {
      border: '1px solid grey',
      maxWidth: 550,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '@media only screen and (max-width: 480px)': {
        flexDirection: 'column',
      },
    },
    imageContainer: {
      padding: 8,
    },
    image: {
      width: 200,
      height: 200,
    },
    title: {
      '@media only screen and (max-width: 480px)': {
        marginLeft: 20,
      },
    },
    discount: {
      '@media only screen and (max-width: 480px)': {
        marginRight: 20,
      },
    },
  }),
);

const CoupanComponent = ({
  id,
  classes,
  recommendedItems,
}) => (
  <Dialog open fullScreen>
    <DialogContent>
      {recommendedItems.map(item => (
        <div key={item} className={classes.content}>
          <div className={classes.imageContainer}>
            <Typography className={classes.title} type="display1" color="primary" align="left">Coupon</Typography>
            {products[item].FIELD3}
          </div>
          <div style={{ flex: '1 1 auto' }} />
          <div style={{ paddingRight: 4 }}>
            <Typography className={classes.discount} type="display3" align="right">20% Off</Typography>
            <Barcode value={`Discount on ${products[item].FIELD3}`} height={20} width={1} fontSize={12} />
          </div>
        </div>
      ))}
    </DialogContent>
  </Dialog>
);

export default enhance(CoupanComponent);
