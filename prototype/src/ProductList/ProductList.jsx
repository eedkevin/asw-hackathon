import React from 'react';
import { compose } from 'recompose';
import { format } from 'currency-formatter';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Card, { CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui-icons/Add';
import Remove from 'material-ui-icons/Remove';

const enhance = compose(
  withStyles({
    priceSum: {
      textAlign: 'right',
    },
  }),
);

const ProductItem = compose(
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
      fontSize: '24px',
    },
  }),
)(({ classes, product, quantity, price }) => (
  <Card className={classes.root}>
    <CardMedia className={classes.media} image="https://material-ui-next.com/static/images/cards/contemplative-reptile.jpg" title="some image" />
    <CardContent>
      <Typography type="title" align="left" component="h2">
        Product Name
      </Typography>
    </CardContent>
    <CardActions>
      <div className={classes.flex} />
      <IconButton aria-label="minu">
        <Remove />
      </IconButton>
      <input className={classes.input} />
      <IconButton aria-label="plus">
        <Add />
      </IconButton>
    </CardActions>
  </Card>
));

const ProductList = ({ classes }) => (
  <div style={{ maxWidth: 1280, margin: 'auto' }}>
    <Grid container spacing={0}>
      <Grid xs={12} sm={6} md={4} lg={3}>
        <ProductItem product="Product1" quantity={10} price={100} />
      </Grid>
      <Grid xs={12} sm={6} md={4} lg={3}>
        <ProductItem product="Product1" quantity={10} price={100} />
      </Grid>
      <Grid xs={12} sm={6} md={4} lg={3}>
        <ProductItem product="Product1" quantity={10} price={100} />
      </Grid>
      <Grid xs={12} sm={6} md={4} lg={3}>
        <ProductItem product="Product1" quantity={10} price={100} />
      </Grid>
    </Grid>
  </div>
);

export default enhance(ProductList);
