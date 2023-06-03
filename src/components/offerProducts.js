import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Config from '../config';
import { Link } from 'react-router-dom';
import Loader from './commonComponents/loader';
import Offer from '../json/offer.json';

function ViewAllProducts() {
    const [offerProducts, setofferProducts] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        setisLoading(!isLoading)
        axios.get(`${Config.baseURL}/api/offer`)
            .then(response => { setofferProducts(response.data) }
            )
            .catch(error => {
                console.log(error)
            });
    }, [])
    return (
        <div className="pageBody">
            {
                !isLoading ? <Loader /> : null
            }
            <Typography style={{ padding: '20px 0px',borderBottom:'1px solid gainsboro',fontSize:'30px' }} variant="h5" align="center" component="h4">
                Deals of the Day
            </Typography>
            <Grid container>
                {Offer?.map((offer, i) => (
                    offer.products?.map((pro, i) => (
                        <Grid item md={3} xs={6} className="pad10 cursor viewCard"  align="center" key={i} >
                            <Link key={i} to={`/product/${pro._id}`}>
                                <img className=" pad20" src={pro.image} alt="" />
                                <label className="txt_overflow">{pro.description}</label>
                                <div className="recently_product_price">
                                    <div><FontAwesomeIcon icon={faRupeeSign} /></div>
                                    <h4 style={{ color: 'green' }} >{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(pro.selling_price)}</h4>
                                    <p className="discount_amt"> <FontAwesomeIcon icon={faRupeeSign} />{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(pro.mrp)}</p>
                                </div>{pro.discount_percentage === 0 ? null : <p className=""> {pro.discount_percentage} % off</p>}
                            </Link>
                        </Grid>
                    ))
                ))}
            </Grid>
        </div>
    );
}



export default ViewAllProducts
