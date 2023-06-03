import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import '../style.css';
import { Link } from 'react-router-dom';
import LandingSlider from './commonComponents/landingSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Config from '../config';
import Loader from './commonComponents/loader';
import category  from '../json/Category.json';

class landing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            Products: [],
            ProductMenu: [],
            bannerImages: [],
            productOffer: [],
            menuName: [],
            bannerScrollWidth: '',
            bannerWidth: '',
            productWidth: '',
            proScrollWidth: '',
            sliderContainerwidth: ''
        }
    }

    componentDidMount() {
    //     var sliderContainerwidth = document.querySelector('.productsContainer').offsetWidth;
    //     this.setState({ sliderContainerwidth });
    //     this.setState({ isLoading: !this.state.isLoading })

    //     axios.get(`${Config.baseURL}/api/category`)
    //         .then(response => {
    //             this.setState({
    //                 menuName: response.data,
    //             })
    //             this.setState({ isLoading: !this.state.isLoading })
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         });
    //     axios.get(`${Config.baseURL}/master/banner`)
    //         .then(response => {
    //             this.setState({
    //                 bannerImages: response.data,
    //             })
    //             var productsContainerwidth = document.querySelector('.productsContainer').offsetWidth;
    //             var productswidth = document.querySelector('.products').offsetWidth;
    //             let scrollableWidth = productsContainerwidth - productswidth;
    //             this.setState({ bannerScrollWidth: scrollableWidth })
    //             var product = document.querySelector('.land_item').offsetWidth;
    //             this.setState({ bannerWidth: product });
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         });
    //     axios.get(`${Config.baseURL}/api/offer`)
    //         .then(response => {
    //             this.setState({
    //                 productOffer: response.data
    //             })
    //             var productsContainerwidth = document.querySelector('.productsImgContainer').offsetWidth;
    //             var productswidth = document.querySelector('.productsImg').offsetWidth;
    //             let scrollableWidth = productsContainerwidth - productswidth;
    //             this.setState({ proScrollWidth: scrollableWidth })
    //             var product = document.querySelector('.item').offsetWidth;
    //             this.setState({ productWidth: product });
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         });
    //         this.getAllCategory();
    // }
    // getAllCategory = () => {
    //     axios.get(`${Config.baseURL}/api/category`)
    //         .then(response => {
    //             this.setState({
    //                 menuName: response.data,
    //             })
               
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         });
    }
    render() {
        const { bannerImages, menuName, productOffer, bannerScrollWidth, bannerWidth, productWidth, proScrollWidth, sliderContainerwidth, isLoading } = this.state;
        return (
            <div className="mar0-10 pad10-0">
                <div >
                    {
                        isLoading ? <Loader /> : null
                    }
                    <Grid container spacing={1}>
                        <Grid item md={2} xs={12}>
                            <div className="categoryParentName" >
                                <p className="categoryTitle">TOP CATEGORIES</p>
                                <div>
                                    {category.map((filterMenu, i) => (
                                        filterMenu.hasChild ?
                                            <Link to={`category/${filterMenu._id}`} key={i} className="categoryMenu" >
                                                {filterMenu.image ? <img className="image" src={filterMenu.image} alt="" />
                                                    : <FontAwesomeIcon icon={faImage} />
                                                }
                                                <p >{filterMenu.category_name} </p>
                                            </Link>
                                            :
                                            <Link key={i} to={`/product-list/${filterMenu._id}`} className="categoryMenu">
                                                {filterMenu.image ? <img className="image" src={filterMenu.image} alt="" />
                                                    : <FontAwesomeIcon icon={faImage} />
                                                }
                                                <p >{filterMenu.category_name} </p>
                                            </Link>
                                    ))}
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={10} xs={12}>
                            <LandingSlider bannerImg={bannerImages} bannerScrollWidth={bannerScrollWidth} bannerImgWidth={bannerWidth} sliderContainerwidth={sliderContainerwidth}
                                productOffer={productOffer} proScrollWidth={proScrollWidth} productWidth={productWidth}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div >
        )
    }
}

export default landing