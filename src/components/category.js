import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import Config from '../config';
import Loader from './commonComponents/loader';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Category from '../json/Category.json';
class categoryProducts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menuNames: [],
            category_id: '',
            isLoading: false
        }
    };
    handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }
    componentDidMount() {
        console.log(this.props);
        const id = this.props.match.params.id;
        this.setState({ category_id: id });
        this.setState({ isLoading: !this.state.isLoading })
        axios.get(`${Config.baseURL}/api/category?parent=${id}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    menuNames: res.data,
                })
                this.setState({ isLoading: !this.state.isLoading })
            })
            .catch(error => {
                console.log(error)
            });
    };
    render() {
        const { menuNames, isLoading } = this.state;
        return (
            <div className="mar0-10">
                <Grid container>
                    <div className="breadcumbs_head">
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                        <Link to="/"color="inherit">
                            Home
                        </Link>
                       
                        <Typography color="textPrimary">Categories</Typography>
                    </Breadcrumbs>
                    </div>
                </Grid>
<div className="pageBody">
                <Grid container>

                    {/* {
                        isLoading ? <Loader /> : null
                    } */}
                    {
                        Category?.map((menu, i) => (
                            <Grid key={i} className="menuProduct" align="center" item md={2} xs={6}>
                                {menu.image ?
                                    <Link to={`/product-list/${menu._id}`}>
                                        <img className="wid100" src={menu.image} alt="" />
                                    </Link>
                                    :
                                    <Link to={`/category/${menu._id}`}>
                                        <img className="wid100" src="https://www.brassworld.co.in/tradein/img/no_preview.jpg" alt="" />
                                    </Link>
                                }
                                <p className="pad10">{menu.category_name} </p>
                            </Grid>
                        ))
                    }
                </Grid>
                </div>
            </div>
        )
    }
};

export default categoryProducts
