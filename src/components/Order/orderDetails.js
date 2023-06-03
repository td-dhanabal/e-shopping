import React, { useEffect, useState } from 'react'
import { Snackbar, Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../commonComponents/loader';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import Moment from 'moment';
import axios from 'axios';
import Config from '../../config';
import { Link } from 'react-router-dom';
import AddrerssDetails from '../../json/orderDetails.json'

function OrderAddress(props) {
    const [Address, setaddress] = useState([]);
    const [errorMsg, seterrorMsg] = useState('');
    const [snackbar, setsnackbar] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    useEffect(() => {
        const orderId = (props.match.params.id);
        setisLoading(isLoading == true)
        axios.get(`${Config.baseURL}/api/order/${orderId}`, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                console.log(res.data)
                setaddress(res.data);
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
        <div>
            <div className="inner-maxWidth-container mar0-50 padt-10">
                {/* {
                    !isLoading ? <Loader /> : null
                } */}
                <Grid container spacing={1} >
                    {console.log("delivery_address", AddrerssDetails)}
                    <Grid item md={4} xs={12}>
                        <div className="card_container delivery_card pad20" >
                            <h5>Delivery Address:</h5>
                            <p style={{ fontWeight: '500', padding: '10px 0px ' }}>{AddrerssDetails.delivery_address?.name}</p>

                            <p>{AddrerssDetails.delivery_address?.area}.</p>
                            <p>{AddrerssDetails.delivery_address?.city}&nbsp;-&nbsp;{AddrerssDetails.delivery_address?.pincode},</p>
                            <p>{AddrerssDetails.delivery_address?.state.state_name}.</p>
                            <p>Phone number&nbsp;:&nbsp;{AddrerssDetails.delivery_address?.mobile_no}.</p>
                        </div>
                    </Grid>
                    <Grid item md={8} xs={12} >
                        <div className="card_container" >
                            {AddrerssDetails.products?.map((product, i) => (
                                <div key={i} className="cart_card" >
                                    <div className="cart_image">
                                        <img src={product.image} alt="" />
                                    </div>
                                    <div className="cart_content">
                                        <Link to={`/product/${Address._id}`}>
                                            <h5  >{product.description} </h5>
                                        </Link>
                                        <div className="recently_product_price" style={{ justifyContent: 'unset' }}>
                                            <div><FontAwesomeIcon icon={faRupeeSign} /></div>
                                            <h4 style={{ color: 'green' }} >{product.selling_price}</h4>
                                            &nbsp;&nbsp;<p className="discount_amt"> <FontAwesomeIcon icon={faRupeeSign} />{product.mrp}</p>
                                        </div>
                                        <p>{product.quantity}%</p>
                                        {/* <p>{product.quantity}&nbsp;* {product.selling_price}&nbsp;= <FontAwesomeIcon icon={faRupeeSign} />{product.total}</p> */}
                                    </div>
                                    <hr />
                                    <div className="orderStatus">
                                        {
                                            AddrerssDetails.cancel ?
                                                <div>
                                                    <p className="cancelDate">Cancelled</p>
                                                    <p className="deliverStatus">Shipment is cancelled.</p>
                                                </div>
                                                :
                                                <div>
                                                    <p className="deliverDate"> Delivered on March 4th 2021 </p>
                                                    <p className="deliverStatus">Your item has been delivered</p>
                                                    <button className="rate-btn">   <Link to="/orderReview">Rate and Review Product</Link></button>
                                                </div>
                                        }
                                    </div>
                                </div>
                            ))}


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
        </div>
    )
}

export default OrderAddress
