import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import Config from '../config';
import Loader from './commonComponents/loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
class searchResult extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchResult: [],
            isLoading: false
        }
    };

    componentDidMount() {
        const resultName = this.props.match.params.name;
        this.setState({ isLoading: !this.state.isLoading })
        axios.get(`${Config.baseURL}/api/product?search=${resultName}`)
            .then(res => {
                this.setState({
                    searchResult: res.data,
                })
                this.setState({ isLoading: !this.state.isLoading })
            })
            .catch(error => {
                console.log(error)
            });
    };
    render() {
        const { searchResult, isLoading } = this.state;
        return (

            <div className="pageBody" >
                <Typography style={{ padding: '20px 0px', borderBottom: '1px solid gainsboro', fontSize: '30px' }}
                    variant="h5"
                    align="center"
                    component="h4">
                    Deals of the Day </Typography>

                <Grid container >
                    {
                        isLoading ? < Loader /> : null
                    }
                    {searchResult?.map((data, i) => (
                            <Grid className="menuProduct"
                                align="center"
                                key={i}
                                item md={2} xs={6}> {
                                    data.image ?
                                        <Link to={`/product/${data._id}`} >
                                            <img className="wid100"
                                                src={`${Config.baseURL}/${data.image}`}
                                                alt="" />
                                            <label className="txt_overflow" > {data.description} </label>
                                            <div className="recently_product_price" >
                                                <div > < FontAwesomeIcon icon={faRupeeSign} /></div >
                                                <h4 style={{ color: 'green' }} > {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(data.selling_price)} </h4>
                                                <p className="discount_amt" > < FontAwesomeIcon icon={faRupeeSign}
                                                />{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(data.mrp)}</p >
                                            </div>{data.discount_percentage === 0 ? null : <p className=""> {data.discount_percentage} % off</p >
                                            } </Link> : <Link to={`/category/${data._id}`} >
                                            <img className="wid100"
                                                src="https://www.brassworld.co.in/tradein/img/no_preview.jpg"
                                                alt="" />
                                        </Link>
                                } </Grid>
                        ))
                    } </Grid> 
            </div >
        )
    }
};

export default searchResult