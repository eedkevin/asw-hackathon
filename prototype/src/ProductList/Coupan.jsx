import React from 'react';
import { compose, setDisplayName } from 'recompose';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Barcode from 'react-barcode';

const enhance = compose(
  setDisplayName('@components/Coupan'),
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
  open,
  onClose,
  id,
  name,
  image,
  classes,
  discount,
}) => (
  <Dialog open={open} onClose={onClose} fullScreen>
    <DialogContent>
      <div className={classes.content}>
        <div className={classes.imageContainer}>
          <img className={classes.image} src={image} alt="coupan" />
        </div>
        <div>
          <Typography className={classes.title} type="display1" color="primary" align="left">Coupan</Typography>
          <Typography className={classes.discount} type="display3" align="right">80% Off</Typography>
          <Barcode value={`Discount on ${name}`} height={20} width={1} fontSize={12} />
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export default enhance(CoupanComponent);
