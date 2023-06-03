import React, { useEffect, useState } from 'react';
import { AppBar, Button, TextField, Toolbar, MenuItem, TextareaAutosize, Dialog, DialogContent, Snackbar, Grid } from '@material-ui/core';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import LandingPage from './components/landing';
import ProductsList from './components/productList';
import productView from './components/productView';
import OfferProducts from './components/offerProducts';
import Category from './components/category';
import Cart from './components/cart';
import CheckOut from './components/checkout';
import './style.css';
import './globalVariables';
import axios from 'axios';
import Config from './config'
import SearchResult from './components/searchResult';
import Profile from './components/profile/profile';
import Order from './components/Order/homeOrder';
import OrderAddress from './components/Order/orderDetails';
import OrderReview from './components/Order/orderReview';
import Header from './components/commonComponents/header'
import ManageAddress from './components/profile/manageAddress';

function App(props) {
  const [Loginopen, setLoginOpen] = useState(false);
  const [Registeropen, setRegisteropen] = useState(false);
  const [snackbar, setsnackbar] = useState(false);
  const [IsLogin, setIsLogin] = useState(false);
  const [IsRegister, setIsRegister] = useState(false);
  const [errorMsg, seterrorMsg] = useState('');
  const [failerror, setfailerror] = useState('');
  const [loginfailerror, setloginfailerror] = useState('');
  const [state, setstate] = useState({ state_name: '' });
  const [RegisterData, setRegisterData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    address: '',
    pincode: '',
    state: ''
  });
  const [LoginData, setLoginData] = useState({
    user_name: '',
    password: '',
  });
  useEffect((props) => {
    axios.get(`${Config.baseURL}/api/state`
    )
      .then(res => {
        setstate(res.data);
      })
      .catch(error => {
        console.log(error)
      })

    localStorage.getItem('key') ?
      setIsLogin(!IsLogin) :
      setIsLogin(IsLogin)
  }, []);


  const rooturl = "/shopping";
  return (
    <div>
      <Router basename={global.rooturl}>
        <Header />
        <div style={{position:'relative',top:'65px'}}>
        <div className="maxWidth-container" >
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/category/:id" component={Category} />
            <Route path="/product-list/:id" component={ProductsList} />
            <Route path="/product/:id" component={productView} />
            <Route path="/offer-products" component={OfferProducts} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={CheckOut} />
            <Route path="/searchResult/:name" component={SearchResult} />
            <Route path="/profile" component={Profile} />
            <Route path="/order" component={Order} />
            <Route path="/orderAddress/:id" component={OrderAddress} />
            <Route path="/orderReview" component={OrderReview} />
            <Route path="/manage-address" component={ManageAddress} />
          </Switch>
         

        </div>
        <Grid container className="footer">
            <Grid item md={2}>
              <h3>About Us</h3>
              <ul>
                <li>shopping</li>
                <li>The Management</li>
                <li>Our Growth</li>
              </ul>
            </Grid>
            <Grid item md={2}>
              <h3>Get In Touch</h3>
              <ul>
                <li>Contact Us</li>
                <li>Enquiry now</li>
                <li>Complaints</li>
              </ul>
            </Grid>
            <Grid item md={2}>
              <h3>Get In Touch</h3>
              <ul>
                <li>Policy</li>
                <li>Return</li>
                <li>Term of use</li>
                <li>Site map</li>
              </ul>
            </Grid>
            <Grid item md={2}>
              <h3>Social</h3>
              <ul>
                <li>Facebook</li>
                <li>Youtube</li>
              </ul>
            </Grid>
            <Grid item md={2}>
              <h3>Contact Us</h3>
              <ul>
                <li>#No: 1435 - 1438, bangalore,</li>
                <li>bangalore,</li>
                <li>bangalore,</li>
                <li>India - 641 030.</li>
                <li> dhanabal@gmail.in</li>
                <li> +91422-43434344</li>
              </ul>
            </Grid>
            <Grid item md={2}>
              <h2>Happy Shopping</h2>
              {/* <img src="https://propluslogics.com/wp-content/themes/propluslogics/images/logo.png" alt="" /> */}
            </Grid>
          </Grid>
          <Grid container className="copywrite">
            <p>2021 shopping Logics</p>
          </Grid>
        </div>
      </Router>
      {/************** LOGIN POPUP START *****************/}

    </div >
  );

}

export default App;
