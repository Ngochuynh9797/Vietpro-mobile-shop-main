import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import store from './redux-setup/store';
import { Provider } from 'react-redux';

import Header from './shared/components/Layout/Header';
import Menu from './shared/components/Layout/Menu';
import Slider from './shared/components/Layout/Slider';
import Sidebar from './shared/components/Layout/Sidebar';
import Footer from './shared/components/Layout/Footer';

import Home from './pages/Home/Home';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';
import Search from './pages/Search/Search';
import Success from './pages/Success/Success';
import Category from './pages/Category/Category';
import NotFound from './pages/NotFound/NotFound';





function App() {

 
  return (
    <Provider store={store}>

    
    <BrowserRouter>
     
        {/*	Header	*/}

        <Header />
        {/*	End Header	*/}
        {/*	Body	*/}

        <div id="body">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <Menu />
              </div>
            </div>
            <div class="row">
              <div id="main" class="col-lg-8 col-md-12 col-sm-12">
                {/*	Slider	*/}

                <Slider />
                {/*	End Slider	*/}
                {/*	Feature Product	*/}

                <Switch>
                  <Route path="/categories/:id" component={Category}></Route>
                  <Route path="/product-details/:id" component={ProductDetails}></Route>
                  <Route path="/cart" component={Cart}></Route>
                  <Route path="/search" component={Search}></Route>
                  <Route path="/success" component={Success}></Route>
                  <Route exact path="/" component={Home}></Route>
                  <Route component={NotFound}></Route>

                </Switch>

                {/*	End Latest Product	*/}


              </div>

              <Sidebar />
            </div>
          </div>
        </div>
        {/*	End Body	*/}


        <Footer />
        {/*	End Footer	*/}
      
    </BrowserRouter>
    </Provider>
  );
}

export default App;
