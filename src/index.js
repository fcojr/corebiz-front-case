import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bootstrap-4-grid/scss/grid.scss'
import './index.scss'
import Home from './pages/Home/Home'
import Product from './pages/Product/Product'
import * as serviceWorker from './serviceWorker';
import numeral from 'numeral'
import 'numeral/locales/pt-br';

numeral.locale('pt-br')

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route path='/' exact={true} component={Home} />
      <Route path='/product/:id' component={Product} />
    </Switch>
</ BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
