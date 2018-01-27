import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Grid from 'material-ui/Grid';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { createHashHistory } from 'history';
import configureStore from './store';
import ShoppingCart from './ShoppingCart';
import ProductList from './ProductList';
import Landing from './Landing';
import logo from './logo.svg';
import './App.css';

import cyan from 'material-ui/colors/cyan';
import red from 'material-ui/colors/red';
import lightBlue from 'material-ui/colors/lightBlue';

const muiTheme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: lightBlue,
    error: red,
  },
});

const hashHistory = createHashHistory();
const store = configureStore({}, hashHistory);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p> */}
          <Landing />
          <ProductList />
          <ShoppingCart />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
