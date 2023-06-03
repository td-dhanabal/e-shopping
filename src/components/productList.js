import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Config from '../config'
import Slider from '@material-ui/core/Slider';
import StarRateIcon from '@material-ui/icons/StarRate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign, faBars, faThLarge } from '@fortawesome/free-solid-svg-icons'
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import '../style.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import Loader from './commonComponents/loader';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import products from '../json/productList.json';
import SpecificationList from '../json/specification_list.json';
const useStyles = makeStyles({
    root: {
        width: 200,
    },
});

function valuetext(value) {
    return `${value}°C`;
};

function Category(props) {
    const [specificationData, setspecificationData] = useState([]);
    const [layout, setlayout] = useState(1);
    const [value, setValue] = useState([20, 37]);
    const [filtercategory, setfiltercategory] = useState([]);
    const [CategoryId, setcategoryId] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [Specification, setspecification] = useState([]);
    const classes = useStyles();
    const [filterdata, setfilterdata] = useState({
        category: props.match.params.id,
        specification: []
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleFilterChange = (e) => {
        console.log(e.target.value)
    };
    const checkdata = (sname, option, e) => {
        let data = { ...filterdata };
        let dta = filterdata.specification.findIndex(s => s.title == sname);
        if (dta >= 0) {
            if (e) {
                filterdata.specification[dta].value.push(option);
            }
            else {
                filterdata.specification[dta].value.splice(filterdata.specification[dta].value.indexOf(option), 1)
            }
        }
        else {
            let obj = {
                title: sname,
                value: [option]
            }
            filterdata.specification.push(obj);
        }
        // setfilterdata(filterdata)
        // setisLoading(isLoading == false);
        axios.post(`${Config.baseURL}/api/product`, filterdata)
            .then(res => {
                setfiltercategory(res.data);
                // setisLoading(isLoading == true);
            })
            .catch(error => {
                console.log(error)
            });
    }
    useEffect(() => {
        const category_id = props.match.params.id;
        setcategoryId(category_id);
        axios({
            method: 'GET',
            url: `${Config.baseURL}/api/specification-list/${category_id}`
        })
            .then(res => {
                setspecification(res.data);
                // setisLoading(isLoading == true);
            })
        axios.post(`${Config.baseURL}/api/product`)
            .then(res => {
                setfiltercategory(res.data);
            })
            .catch(error => {
                console.log(error)
            });

    }, [])
    return (
        <div >
            {
                isLoading ? <Loader /> : null
            }
            <Grid container >
                <div className="breadcumbs_head">
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                        <Link to="/" color="inherit" >
                            Home
                        </Link>
                        <Link to="" color="inherit" >
                            Categories
                        </Link>

                        <Typography color="textPrimary">Products List</Typography>
                    </Breadcrumbs>
                </div>
            </Grid>
            <div className="mar0-10">
                <Grid container spacing={1}>
                    <Grid item md={2} xs={12}>
                        <div className="contentBody pad10">
                            <Typography className="filterTitle" variant="h6" component="h6">
                                Filters
                            </Typography>
                            <hr />
                            {/* <label className="filterPriceLabel">Category</label>
                        <p className="category_label">Mobile</p> */}
                            {/* <p className="filterPriceLabel">PRICE</p>
                    <div className={classes.root}>
                        <Slider
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            getAriaValueText={valuetext}
                        />
                    </div>
                    <select
                        className="min_price_select"
                        onChange={handleFilterChange}>
                        <option>Min</option>
                        {
                            ProductDetails.map((filteramount, i) => {
                                return (
                                    <option key={i} value={filteramount.min_price}>{filteramount.min_price}</option>
                                )
                            })
                        }
                    </select>
                            &nbsp;&nbsp;&nbsp;&nbsp;to&nbsp;&nbsp;&nbsp;&nbsp;
                            <select className="min_price_select">
                        <option>Max</option>
                        {
                            ProductDetails.map((filteramount, i) => {
                                return (
                                    <option key={i}>{filteramount.max_price}</option>
                                )
                            })
                        }
                    </select> */}
                            <div className="filter">
                                <div className="tabs">
                                    {
                                        SpecificationList.map((spec, i) => (
                                            <div key={i}>
                                                <div>
                                                    <div className="tab">
                                                        <input defaultChecked type="checkbox" className="filter-radio" id={spec._id} />
                                                        <label className="tab-label head_label" style={{ textTransform: 'uppercase' }} htmlFor={spec._id}>{spec._id}</label>
                                                        <div className="tab-content">
                                                            {
                                                                spec.option.map((option, i) => (
                                                                    <div key={i}>
                                                                        <Checkbox
                                                                            id={option}
                                                                            onClick={(e) => checkdata(spec._id, option, e.target.checked)}
                                                                        />
                                                                        <label htmlFor={option}>
                                                                            {option}
                                                                        </label><br />
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={10} xs={12}>
                        <div className="contentBody" variant="outlined" >
                            <div className="bread-crumb">
                                <div className="grid_icon">
                                    < FontAwesomeIcon icon={faBars} className="listMenuIcon" onClick={() => setlayout(1)} />
                                    <FontAwesomeIcon icon={faThLarge} className="GridMenuIcon" onClick={() => setlayout(2)} />
                                </div>
                            </div>
                            {/******************************************* * LIST and DEFAULT VIEW ************************************/}
                            {layout === 1 ?
                                products.map((product, i) => (
                                    <Link to={`/product/${product._id}`} key={i} className="pro_card_view" >
                                        <div className='proCard_inner'>
                                            <Grid container>

                                                <Grid item md={4}>
                                                    <div className='product_image' >
                                                        {product.image ?
                                                            <img style={{width:'30%'}} src={product.image} alt="" />
                                                            :
                                                            <img src="https://www.brassworld.co.in/tradein/img/no_preview.jpg" alt="" />
                                                        }
                                                    </div>

                                                </Grid>
                                                <Grid item md={8}>
                                                    <div className='card_content '>
                                                        <Typography className="brand_name" >{product.description}</Typography>
                                                        <div className="rating_badge_body">
                                                            <Paper className="rating_badge" variant="outlined" >
                                                                <label style={{ margin: '0', fontSize: '13px' }}>4.4</label>
                                                                <StarRateIcon />
                                                            </Paper>
                                                            <Typography className="views">  40,618 Ratings & 2,957 Reviews</Typography>
                                                        </div>
                                                        <ul className="list_productFeatures">
                                                            <div className="list_product_price">
                                                                <div>
                                                                    <FontAwesomeIcon icon={faRupeeSign} />
                                                                </div>
                                                                <h2 >{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(product.selling_price)}</h2>
                                                                <p className="discount_amt"><FontAwesomeIcon icon={faRupeeSign} />{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(product.mrp)}</p>
                                                            </div>
                                                            <div className="list_star_icon">
                                                                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarHalfIcon />
                                                            </div>
                                                            {
                                                                product.key_points?.map((pro, index) => (
                                                                    <li key={index}>{pro}</li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </div>

                                                </Grid>

                                            </Grid>


                                        </div>
                                    </Link>
                                ))
                                //   {/******************************************* * GRID VIEW ************************************/}
                                :
                                <Grid container spacing={1}>
                                    {products.map((product, i) => (
                                        <Grid key={i} item md={3}>
                                            <div className='grid_view'>
                                                <Link to={`/product/${product._id}`}>
                                                    <div className="card_grid_img" >

                                                        {product.image ?
                                                            <img src={product.image} alt="" />
                                                            :
                                                            <img src="https://www.brassworld.co.in/tradein/img/no_preview.jpg" alt="" />
                                                        }

                                                        <div style={{ textAlign: 'center' }} className='card_content'>
                                                            <Typography style={{ fontSize: '18px' }} className="pad10" variant="h6" noWrap>{product.description} </Typography>
                                                        </div>
                                                        <div className="rating_badge_body justifycenter">
                                                            <Paper className="rating_badge" variant="outlined" >
                                                                <label style={{ margin: '0', fontSize: '13px' }}>4.4</label>
                                                                <StarRateIcon />
                                                            </Paper>
                                                            <Typography className="views">  2,957 Reviews</Typography>
                                                        </div>
                                                        <Typography className="rupee_icon" variant="h5" >  <FontAwesomeIcon icon={faRupeeSign} />{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(product.selling_price)} </Typography>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Grid>
                                    ))
                                    }

                                </Grid>


                            }
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
};

export default Category