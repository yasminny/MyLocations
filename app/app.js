import 'cssrecipes-defaults/lib/document-remove-margin-padding.css';
import 'cssrecipes-defaults/lib/box-sizing.css';
import 'cssrecipes-defaults/lib/hidden.css';
import 'normalize.css/normalize.css';
import 'font-awesome/css/font-awesome.css';
import './assets/styles/main.scss';
import React from 'react';
import { render } from 'react-dom';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store';
import {Provider} from 'react-redux';
// import Root from './components/root/root';
import Footer from './components/footer/footer';
import Categories from './components/categories/categories';
import Locations from './components/locations/locations';
// import LocationId from './components/location-id/location-id';

render(
  <Provider store={ store }>
  <BrowserRouter>
    <div className="first">
    <main>
    <Switch>
      {/*<Route exact path="/" component={ Root } />*/}
      <Route exact path="/" component={() => {
        return <Redirect to="/categories"/>
      }}/>
      <Route path="/categories" component={ Categories }/>
      <Route exact path="/locations" component={ () => {
        return <Redirect to="/locations/category/all"/>
      }}/>
      <Route path="/locations/category/:catId" component={ Locations }/>
      {/*<Route path="/locations/location/:locId" component={ LocationId }/>*/}
    </Switch>
    </main>
    <Footer {...this.props}/>
    </div>
  </BrowserRouter>
  </Provider>,
  document.querySelector('#app')
);

// Enables hot-reload without page refresh. Removed during `build`
// if (module.hot) {
//   module.hot.accept();
// }
