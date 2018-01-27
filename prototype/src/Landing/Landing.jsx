import React from 'react';
import { compose, setDisplayName } from 'recompose';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';
import Heart from 'material-ui-icons/Favorite';
import Button from 'material-ui/Button';

import bannerJPG from './images/banner.jpg';
import cardPNG from './images/memberCard.png';

const enhance = compose(
  setDisplayName('@pages/Landing'),
  withStyles(theme => ({
    root: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
      backgroundColor: '#ddd',
      overflow: 'hidden',
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.2,
      filter: 'blur(5px)',
      backgroundImage: `url("${bannerJPG}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    memberCard: {
      transform: 'rotate(10deg)',
      '@media only screen and (max-width: 480px)': {
        transform: 'translateX(100px) rotate(10deg)'
      },
    },
    inputArea: {
      width: 320,
      justifyContent: 'center',
      alignItems: 'center',
      background: '#00a99d',
      borderRadius: 5,
      boxShadow: '0 0 2px #fff',
      padding: 8,
      display: 'flex',
      position: 'absolute',
      top: 'calc(50% - 30px)',
      left: 'calc(50% - 160px)',
      '@media only screen and (max-width: 480px)': {
        maxWidth: 280,
        left: 'calc(50% - 148px)',
      },
    },
    input: {
      background: theme.palette.common.white,
      fontSize: 20,
      maxWidth: 200,
      borderRadius: 5,
      '@media only screen and (max-width: 480px)': {
        maxWidth: 150,
      },
    },
    flex: {
      flex: '1 1 auto',
    },
    heart: {
      color: '#00a99d',
    },
    demoButton: {
      position: 'absolute',
      bottom: 'calc(50% - 80px)',
      right: 0,
      color: '#fff',
      fontWeight: 800,
      background: '#00a99d',
    },
    cardArea: {
      position: 'relative',
      overflow: 'hidden',
    },
  })),
);

const LandingComponent = ({
  classes,
}) => (
  <div className={classes.root}>
    <div className={classes.background} />
    <div className={classes.cardArea} >
      <img className={classes.memberCard} src={cardPNG} />
    </div>
    <div className={classes.inputArea}>
      <Typography type="title" color="inherit">
        Member ID
      </Typography>
      <div className={classes.flex} />
      <Input disableUnderline className={classes.input} inputProps={{ style: { textAlign: 'right' } }} />
      <Button className={classes.demoButton} raised color="primary">
        Demo
      </Button>
    </div>
    <Typography type="body2">
      <span style={{ color: '#00a99d', fontWeight: 800 }}>Lucky12 @ A.S. WATSON HACKATHON</span>
    </Typography>
  </div>
);

export default enhance(LandingComponent);
