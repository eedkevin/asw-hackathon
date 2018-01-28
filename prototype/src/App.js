import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { createHashHistory } from 'history';
import configureStore from './store';
import ProductList from './ProductList';
import Landing from './Landing';
import Coupan from './Coupan';

import Reboot from 'material-ui/Reboot';
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
          <Reboot />
          <ConnectedRouter history={hashHistory}>
            <main>
              <Route exact path="/" component={Landing} />
              <Route exact path="/products" component={ProductList} />
              <Route exact path="/coupan" component={Coupan} />
            </main>
          </ConnectedRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
