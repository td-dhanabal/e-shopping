import React, { Component } from 'react'
import { Typography, Snackbar, Grid } from '@material-ui/core';
import axios from 'axios';
import Config from '../config';
import AddIcon from '@material-ui/icons/Add';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import RemoveIcon from '@material-ui/icons/Remove';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from './commonComponents/loader';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import Cart  from '../json/cart.json';

class cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            count: 1,
            cartList: [],
            isLoading: true,
            errorMsg: '',
            cartUpdateList: [],
            snackbar: false
        }
    };
    componentDidMount() {
        this.setState({ isLoading: !this.state.isLoading })
        axios.get(`${Config.baseURL}/api/cart`, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                this.setState({
                    cartList: res.data,
                })
                this.setState({ isLoading: !this.state.isLoading })
            })
            .catch(error => {
                console.log(error)
            });
        this.getAllCart();

    };
    getAllCart = () => {
        axios.get(`${Config.baseURL}/api/cart`, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                this.setState({
                    cartList: res.data,
                })
            })
    };
    add_quantity(i) {
        let items = [...this.state.cartList];
        let item = { ...items[i] };
        item.quantity = item.quantity + 1;
        items[i] = item;
        this.setState({ cartList: items });

        let quantity = {
            quantity: item.quantity
        };

        axios.put(`${Config.baseURL}/api/cart/${item._id}`, quantity, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                this.setState({ errorMsg: res.data.message, snackbar: !this.state.snackbar })
            })
            .catch(error => {
                console.log(error)
            });
    };
    decrement_quantity = (i) => {
        let lessProducts = [...this.state.cartList];
        let lessProduct = { ...lessProducts[i] };
        if (lessProduct.quantity > 1) {
            lessProduct.quantity = lessProduct.quantity - 1;
            lessProducts[i] = lessProduct;
            this.setState({ cartList: lessProducts });
        };
        let quantity = {
            quantity: lessProduct.quantity
        };
        axios.put(`${Config.baseURL}/api/cart/${lessProduct._id}`, quantity, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                this.setState({ errorMsg: res.data.message, snackbar: !this.state.snackbar })
            })
            .catch(error => {
                console.log(error)
            });
    };

    removeCart = (_id) => {
        this.setState({ isLoading: !this.state.isLoading })
        axios.delete(`${Config.baseURL}/api/cart/${_id}`, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                this.setState({ errorMsg: res.data.message, isLoading: !this.state.isLoading, snackbar: !this.state.snackbar })
                this.getAllCart();
            })
            .catch(error => {
                console.log(error)
            });
    };
    placeOrder = () => {
        axios.post(`${Config.baseURL}/api/order`, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                console.log(res.data)
            })
        this.props.history.push('/checkout')
    };
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ snackbar: !this.state.snackbar });
    };
    AddhandleChange = i => e => {
        let manualAdd = [...this.state.cartList];
        let item = { ...manualAdd[i] };

        item.quantity = e.target.value;
        manualAdd[i] = item;
        this.setState({ cartList: manualAdd });
        let quantity = {
            quantity: item.quantity
        };

        axios.put(`${Config.baseURL}/api/cart/${item._id}`, quantity, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {

            })
            .catch(error => {
                console.log(error)
            });
    };

    render() {
        const { cartList, isLoading, errorMsg } = this.state;
        return (
            <div className="mar0-50">
                {
                    isLoading ? <Loader /> : null
                }
                <div className="inner-maxWidth-container padt-10">
                    <Grid container spacing={1}>
                        <Grid item md={8} xs={12}>
                            <div className="card_container " >
                                <div className="subHeading">
                                    <Typography variant="h5"> Shopping Cart<span className="countSize">&nbsp;&nbsp;{Cart.length}&nbsp;items</span></Typography>
                                </div>
                                {Cart.length ?
                                    Cart.map((cart, i) => (
                                        <div key={i}>
                                            <div className="cart_card" >
                                                <div className="cart_image">
                                                    <img src={cart.image} alt="" />
                                                </div>
                                                <div className="cart_content">
                                                    <Link to={`/product/${cart._id}`}>
                                                        <h6 style={{ fontSize: '17px' }} >{cart.description} </h6>
                                                    </Link>
                                                    <div className="recently_product_price" style={{ justifyContent: 'unset' }}>
                                                        <div><FontAwesomeIcon icon={faRupeeSign} /></div>
                                                        <h4 style={{ color: 'green' }} >{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(cart.selling_price)}</h4>
                                                        <p className="discount_amt"> <FontAwesomeIcon icon={faRupeeSign} />{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(cart.mrp)}</p>
                                                    </div>
                                                </div>
                                                <div className="proQuantity">
                                                    <div className="add_remove"
                                                        onClick={() => this.decrement_quantity(i)}>
                                                        <RemoveIcon />
                                                    </div>
                                                    <div className="countValue">
                                                        <input type="number"
                                                            value={cart.quantity}
                                                            onChange={this.AddhandleChange(i)}
                                                        />
                                                    </div>
                                                    <div className="add_remove"
                                                        onClick={() => this.add_quantity(i)}>
                                                        <AddIcon />
                                                    </div>
                                                </div>
                                                <div className="total_amt">
                                                    <p className="amt_value" > <FontAwesomeIcon icon={faRupeeSign} /> {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(cart.quantity * cart.selling_price)} </p>
                                                </div>
                                                <hr />
                                            </div>
                                            <div className="saveLater">
                                                <div className="saveRemove">
                                                    <p>Save for later</p>
                                                </div>
                                                <div className="saveRemove">
                                                    <p onClick={() => this.removeCart(cart._id)}>Remove </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <div>
                                        <Typography className="pad20" variant="h5" align="center"> Your Cart was Empty !!!</Typography>
                                    </div>
                                }
                                {Cart.length ?
                                    <div className="placeOrder_btn">
                                        <button onClick={this.placeOrder}>PLACE ORDER</button>
                                    </div> : null
                                }
                            </div>

                        </Grid>
                        <Grid item md={4} xs={12}>
                            <div className="card_container " >
                                <div className="subHeading">
                                    <Typography variant="h6"> PRICE DETAILS</Typography>
                                </div>
                                <div className="pad20 " style={{ borderBottom: '1px solid gainsboro' }}>
                                    <div>
                                        <div className="priceTotal">
                                            <p>No of items   </p>
                                            <p>{Cart.length}&nbsp;items</p>
                                        </div>
                                        <div className="priceTotal">
                                            <p>Price   </p>
                                            <p><FontAwesomeIcon icon={faRupeeSign} />&nbsp;
                                                {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
                                                Cart.reduce((price, cart) => (
                                                    (price += cart.quantity * cart.mrp)
                                                ), 0)
                                            )}
                                            </p>
                                        </div>
                                        <div className="priceTotal ">
                                            <p>Your savings</p>
                                            <p style={{ color: 'green' }}>-&nbsp;&nbsp;<FontAwesomeIcon icon={faRupeeSign} />&nbsp;
                                                {
                                                    new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
                                                        Cart.reduce((discount, cart, dis) => (
                                                            dis = cart.mrp - cart.selling_price,
                                                            discount += cart.quantity * dis
                                                        ), 0)
                                                    )
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="priceTotal pad10-15">
                                    <p style={{ fontWeight: 'bold' }}>Total Amount</p>
                                    <p style={{ fontWeight: 'bold' }} ><FontAwesomeIcon icon={faRupeeSign} />&nbsp;
                                                {
                                            new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
                                                Cart.reduce((mrp, cart, discount, dis, total) => (
                                                    mrp += cart.quantity * cart.mrp,
                                                    dis = cart.mrp - cart.selling_price,
                                                    discount = cart.quantity * dis,
                                                    total = mrp - discount
                                                ), 0)
                                            )
                                        }
                                    </p>
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        open={this.state.snackbar}
                        autoHideDuration={2000}
                        onClose={this.handleClose}
                        message={errorMsg}
                    />
                </div>
            </div>

        )
    }
}

export default cart