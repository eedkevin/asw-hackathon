import React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName, withState, withHandlers, pure } from 'recompose';
import { format } from 'currency-formatter';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card, { CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ShoppingCart from 'material-ui-icons/ShoppingCart';
import Add from 'material-ui-icons/Add';
import Remove from 'material-ui-icons/Remove';
import Button from 'material-ui/Button';
import CountUp from 'react-countup';
import faker from 'faker';
import uuid from 'uuid';
import {
  addProductInCart,
  removeProductInCart,
  updateProductInCart,
} from './actions';

import Recipt from './Recipt';

faker.locale = 'en';

const productItems = new Array(20).fill(null).map(() => ({
  id: uuid.v4(),
  name: faker.commerce.productName(),
  price: faker.finance.amount(50, 2000, 1),
  image: 'http://www.avenuek.com.my/file/2016/06/ws-logo1.jpg',
}));

const ProductItem = compose(
  setDisplayName('@components/ProductItem'),
  pure,
  withStyles({
    root: {
      margin: 8,
    },
    media: {
      height: 200,
    },
    flex: {
      flex: '1 1 auto',
    },
    input: {
      width: 50,
      textAlign: 'right',
      lineHeight: '24px',
      fontSize: '20px',
    },
    priceArea: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
)(({ classes, id, name, image, quantity, price, onAdd, onRemove, onUpdate }) => (
  <Card className={classes.root}>
    <CardMedia className={classes.media} image={image} title={name} />
    <CardContent className={classes.priceArea}>
      <Typography type="body1" align="left" noWrap color={quantity > 0 ? 'primary' : undefined}>
        {name}
      </Typography>
      <div className={classes.flex} />
      <Typography type="body2" align="right" color={quantity > 0 ? 'primary' : undefined}>
        {format(price, { code: 'HKD' })}
      </Typography>
    </CardContent>
    <CardActions>
      <IconButton disabled>
        <ShoppingCart color={quantity > 0 ? 'primary' : undefined} />
      </IconButton>
      <div className={classes.flex} />
      <IconButton onClick={onRemove} aria-label="minu">
        <Remove />
      </IconButton>
      <input type="number" onChange={onUpdate} value={quantity} className={classes.input} />
      <IconButton onClick={onAdd} aria-label="plus">
        <Add />
      </IconButton>
    </CardActions>
  </Card>
));

const enhance = compose(
  setDisplayName('@pages/ProductList'),
  pure,
  connect(state => ({
    memberID: state.landing.memberID,
    items: state.products.items,
    sum: state.products.sum,
    prevSum: state.products.prevSum,
  }), dispatch => ({
    addItem: (id, price, name) => dispatch(addProductInCart(id, +price, name)),
    removeItem: (id, price, name) => dispatch(removeProductInCart(id, +price, name)),
    updateItem: (id, price, name, quantity) => dispatch(updateProductInCart(id, +price, name, +quantity)),
  })),
  withState('reciptOpen', 'setReciptOpen', false),
  withHandlers({
    onAdd: props => (id, price, name) => event => props.addItem(id, +price, name), 
    onRemove: props => (id, price, name) => event => props.removeItem(id, +price, name),
    onUpdate: props => (id, price, name) => event => props.updateItem(id, +price, name, +event.currentTarget.value),
  }),
  withStyles(theme => ({
    root: {
      margin: 'auto',
      maxWidth: 1280,
      paddingTop: 16,
      paddingBottom: 80,
    },
    greeting: {
      '@media only screen and (max-width: 480px)': {
        fontSize: 16,
      },
    },
    priceSum: {
      textAlign: 'right',
    },
    shoppingBtn: {
      right: 10,
      bottom: 10,
      position: 'fixed',
      color: theme.palette.common.white,
      borderRadius: '30%',
    },
  })),
);

const ProductList = ({ classes, memberID, items, onAdd, onRemove, onUpdate, prevSum, sum, reciptOpen, setReciptOpen }) => (
  <div className={classes.root}>
    <Typography className={classes.greeting} type="display2" color="primary" align="center" gutterBottom>Let's buy something{memberID ? `, ${memberID} ` : ''}!</Typography>
    <Grid container spacing={0}>
      {
        productItems.map(pi => (
          <Grid key={pi.id} xs={12} sm={6} md={4} lg={3} item>
            <ProductItem onAdd={onAdd(pi.id, pi.price, pi.name)} onRemove={onRemove(pi.id, pi.price, pi.name)} onUpdate={onUpdate(pi.id, pi.price, pi.name)}
              name={pi.name} image={pi.image} quantity={items[pi.id] ? items[pi.id].count : 0} price={+pi.price} />
          </Grid>
        ))
      }
    </Grid>
    <Button disabled={sum === 0} onClick={() => setReciptOpen(true)} raised aria-label="shopping" className={classes.shoppingBtn} color="primary">
      <ShoppingCart color="inherit" />
      <Typography type="title" color="inherit">  
        <CountUp
          start={prevSum}
          end={sum}
          duration={1}
          useEasing={true}
          useGrouping={true}
          separator=","
          decimals={2}
          decimal="."
          prefix="HKD $"
        />
      </Typography>
    </Button>
    <Recipt open={reciptOpen} onClose={() => setReciptOpen(false)} />
  </div>
);

export default enhance(ProductList);
