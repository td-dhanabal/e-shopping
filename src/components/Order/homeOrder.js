import React, { useEffect, useState } from 'react'
import { Typography, Snackbar, Grid, Paper } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Config from '../../config';
import Moment from 'moment';
import Loader from '../commonComponents/loader';
import OrderDate from '../../json/order.json'
function Order() {
    const [Orders, setOrders] = useState([]);
    const [errorMsg, seterrorMsg] = useState('');
    const [snackbar, setsnackbar] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    useEffect(() => {
        setisLoading(isLoading == true)
        axios.get(`${Config.baseURL}/api/order`, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                setOrders(res.data);
                setisLoading(isLoading == false)
            })
            .catch(error => {
                console.log(error)
            });
    }, [])
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setsnackbar(!snackbar);
    };
    return (
        <div className="inner-maxWidth-container">
            {/* {
                !isLoading ? <Loader /> : null
            } */}
            <Grid container>
                {console.log("OrderDate", OrderDate)}
                <Grid className="profile_addrress">
                    <div className="tabHeading">
                        <Typography variant="h5"> My Orders<span className="countSize"></span></Typography>
                    </div>
                    <div className="">
                        <div className='card_view' >
                            {OrderDate.map((orderPro, i) => (
                                <div key={i}>
                                    <Link key={i} to={`/orderAddress/${orderPro._id}`}>
                                        <div className="order_card" >
                                            <div>
                                                <p style={{ fontWeight: 'bold' }}>Order no&nbsp;:&nbsp;{orderPro.order_no} </p>
                                            </div>
                                            <div className="cart_content">
                                                <p > <span>Total price&nbsp;:&nbsp;</span><FontAwesomeIcon className="orderIcon" icon={faRupeeSign} />&nbsp;
                                               25000
                                                </p>
                                                <p> <span>Total Items&nbsp;:</span>&nbsp;
                                           2
                                                </p>
                                            </div>
                                            <div className="orderStatus">
                                                {
                                                    orderPro.cancel ?
                                                        <div>
                                                            <p className="cancelDate">Cancelled</p>
                                                            <p className="deliverStatus">Shipment is cancelled.</p>
                                                        </div>
                                                        :
                                                        <div>
                                                            <p className="deliverDate">Delivered on March 4th 2021 </p>
                                                            <p className="deliverStatus">Your item has been delivered</p>
                                                            <button className="rate-btn">   <Link to="/orderReview">Rate and Review Product</Link></button>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </Link>
                                    {/* {orderPro.products.map((order, i) => (
                                                <h6 style={{ fontSize: '17px' }} >Order no: {orderPro.order_no} </h6>
                                                <div className="order_product_price" style={{ justifyContent: 'unset' }}>
                                                    <div><FontAwesomeIcon icon={faRupeeSign} /></div>
                                                    <h4  >{order.selling_price}</h4>
                                                </div>
                                ))} */}

                                </div>
                            ))
                            }
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={snackbar}
                autoHideDuration={2000}
                onClose={handleClose}
                message={errorMsg}
            />
        </div>
    )
}

export default Order
