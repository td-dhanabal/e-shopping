import React, { Component } from 'react';
import { Paper, Typography, Grid, Snackbar } from '@material-ui/core'
import StarRateIcon from '@material-ui/icons/StarRate';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../style.css';
import axios from 'axios';
import Config from '../config';
import Loader from './commonComponents/loader';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ProSlider from './commonComponents/proSlider';
import viewProducts from '../json/singleProduct.json';
class productView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            url: '',
            rating: '',
            ZoomImage: '',
            stock: 1,
            isLoading: false,
            Products: [],
            transform: 0,
            add_transform: "translateX(0px)",
            productWidth: '',
            scrollWidth: '',
            ProductImg: '',
            ProductId: '',
            snackbar: false,
            errorMsg: '',
            productOffer: []
        }
    };

    componentDidMount() {
        
        const url = this.props.match.url;
        const id = this.props.match.params.id;
        this.setState({ url: url, ProductId: id });
        this.setState({ isLoading: !this.state.isLoading })
        axios.get(`${Config.baseURL}/api/product/${id}`, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(response => {
                this.setState({
                    Products: response.data,
                    ProductImg: response.data.images[0]
                });
                var productsContainerwidth = document.querySelector('.single_productsContainer').offsetWidth;
                var productswidth = document.querySelector('.single_products').offsetWidth;
                let scrollableWidth = productsContainerwidth - productswidth;
                this.setState({ scrollWidth: scrollableWidth })
                var product = document.querySelector('.item').offsetWidth;
                this.setState({ productWidth: product });
                this.setState({ isLoading: !this.state.isLoading })
            })
            .catch(error => {
                console.log(error)
            });
        axios.get(`${Config.baseURL}/api/offer`)
            .then(response => {
                this.setState({
                    productOffer: response.data
                })
                var productsContainerwidth = document.querySelector('.productsImgContainer').offsetWidth;
                var productswidth = document.querySelector('.productsImg').offsetWidth;
                let scrollableWidth = productsContainerwidth - productswidth;
                this.setState({ proScrollWidth: scrollableWidth })
                var product = document.querySelector('.item').offsetWidth;
                this.setState({ productWidth: product });
            })
            .catch(error => {
                console.log(error)
            });
        // this.getAllCategory();

    };
    imageClick = (event) => {
        this.setState({
            ZoomImage: event.target.currentSrc
        })
    };

    addCart = () => {
        let data = {
            product_id: this.state.ProductId,
            quantity: 1
        };
        this.setState({ isLoading: !this.state.isLoading })
        axios.post(`${Config.baseURL}/api/cart`, data, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                this.setState({ errorMsg: res.data.message, isLoading: !this.state.isLoading, snackbar: !this.state.snackbar })
            })
            .catch(error => {
                console.log(error)
            });
    };
    nextSlide = (e) => {
        let val = this.state.transform - this.state.productWidth;
        if (this.state.scrollWidth > val) {
            val = this.state.scrollWidth
        }
        this.setState({
            add_transform: `translateX(${val}px)`, transform: val
        })
        console.log(val)
    };
    prevSlide = () => {
        let val = this.state.transform + this.state.productWidth;
        if (val > 0) {
            val = 0
        }
        this.setState({
            add_transform: `translateX(${val}px)`, transform: val
        })
    };
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ snackbar: !this.state.snackbar });
    };

    render() {
        const { errorMsg, ZoomImage, Products, ProductImg, isLoading, productOffer, proScrollWidth, productWidth } = this.state;
        return (
            <div>
                {/* {
                    isLoading ? <Loader /> : null
                } */}
                <Grid container>
                    {console.log("singleProduct",viewProducts)}
                    <div className="breadcumbs_head">
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Link to="/" color="inherit" >
                                Home
                        </Link>
                            <Link to="" color="inherit"  >
                                Categories
                        </Link>
                            <Link color="inherit" to="" >
                                Products List
                        </Link>
                            <Typography className="txtoverflow" color="textPrimary">{Products.description}</Typography>Products
                    </Breadcrumbs>
                    </div>
                </Grid>
                <Grid container className="bgwhite" style={{ padding: '20px' }} >
                    <Grid item md={5} xs={12} >
                            <div className="products_ZoomView" >
                                {
                                    ZoomImage ?
                                        <img src={ZoomImage} alt=""
                                        /> :
                                        <div className="item" align="center" >
                                            <img className="image" src="https://rukminim1.flixcart.com/image/416/416/kklhbbk0/mobile/h/i/q/m3-mzb087ain-poco-original-imafzxf8zqkcgwfv.jpeg?q=70"alt="" />
                                        </div>
                                }
                            </div>
                            <div>
                                <div className="section pad0-15">
                                    <div className="section-content">
                                        <div className="single_productsContainer" >
                                            {
                                                viewProducts.images?.length < 3 ?
                                                    <div className="single_products" style={{ transform: this.state.add_transform, transition: '.5s ease' }} >
                                                        {
                                                            viewProducts.images?.map((product, i) => {
                                                                return (
                                                                    <div key={i} to="" className="item" >
                                                                        <img onClick={this.imageClick} className="image" src={product} alt="" />
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    :
                                                    <div>
                                                        <div className="click_next" onClick={this.prevSlide}>
                                                            <FontAwesomeIcon icon={faChevronLeft} />
                                                        </div>
                                                        <div className="click_prev" onClick={this.nextSlide}>
                                                            <FontAwesomeIcon icon={faChevronRight} />
                                                        </div>
                                                        <div className="single_products" style={{ transform: this.state.add_transform, transition: '.5s ease' }} >
                                                            {
                                                                viewProducts.images?.map((product, i) => {
                                                                    return (
                                                                        <div key={i} to="" className="item" >
                                                                            <img onClick={this.imageClick} className="image" src={product} alt="" />
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button onClick={this.addCart} className="addCart_btn" style={{ width: '45%' }}><ShoppingCartIcon />ADD TO CART </button>
                                <Link to="/checkout"><button className="buynow_btn">BUY NOW </button></Link>
                            </div>
                    </Grid>

                    <Grid item md={7} xs={12} >
                        <div style={{ position: 'relative' }} >
                            <Typography className="pad10-0" style={{ fontSize: '20px' }} >{viewProducts.description}</Typography>
                            <div className="rating_badge_body">
                                <Paper className="rating_badge" variant="outlined" >
                                    <label style={{ margin: '0', fontSize: '13px' }}>4.4</label>
                                    <StarRateIcon />
                                </Paper>
                                <Typography className="views">  40,618 Ratings & 2,957 Reviews</Typography>
                            </div>
                            <div className="product_price">
                                <div>
                                    <FontAwesomeIcon icon={faRupeeSign} />
                                </div>
                                <h2 >{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(viewProducts.selling_price)}</h2>
                                <p className="discount_amt"> <FontAwesomeIcon className="mar0" icon={faRupeeSign} />{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(viewProducts.mrp)}</p>
                            </div>

                            <div className="star_icon">
                                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarHalfIcon />
                            </div>

                            <h6 className="padt15" >Highlights:</h6>
                            <ul className="productViewFeatures">
                                {
                                    viewProducts.key_points?.map((pro, index) => (
                                        <li key={index}>{pro}</li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className="spec_body" variant="outlined" >
                            <TableContainer component={Paper}>
                                <Table >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Specifications</TableCell>
                                            <TableCell align="left"></TableCell>
                                            <TableCell align="left"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {viewProducts.specification?.slice(0, 6).map((pro, i) => (
                                            <TableRow key={i}>
                                                <TableCell align="left">{pro.title}</TableCell>
                                                <TableCell align="left">{pro.value}</TableCell>
                                                <TableCell align="left">{pro.suffix}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
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
                </Grid>
                {/* {productOffer.map((offer, i) => (
                    <ProSlider key={i} slideProducts={offer} proScrollWidth={proScrollWidth} productWidth={productWidth} />
                ))} */}
            </div>
        )
    }
}

export default productView
