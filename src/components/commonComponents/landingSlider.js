import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import Config from '../../config'
import '../../style.css';
import ProSlider from '../commonComponents/proSlider';
import { Grid } from '@material-ui/core';
import BannerImages from '../../json/banner.json';
import Offer from '../../json/offer.json';
class LandingSlider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            transform: 0,
            add_transform: "translateX(0px)",
            Products: [],
            bannerScrollWidth: '',
            bannerWidth: '',
        }
    };

    componentDidMount() {
        var productsContainerwidth = document.querySelector('.productsContainer').offsetWidth;
        var productswidth = document.querySelector('.products').offsetWidth;
        let scrollableWidth = productsContainerwidth - productswidth;
        this.setState({ bannerScrollWidth: scrollableWidth })
        var product = document.querySelector('.land_item').offsetWidth;
        this.setState({ bannerWidth: product });
    }

    slideNextSlide = (e) => {
        let val = this.state.transform - this.state.bannerWidth;
        if (this.state.bannerScrollWidth > val) {
            val = this.state.bannerScrollWidth
        }
        this.setState({
            add_transform: `translateX(${val}px)`, transform: val
        })
    };
    slidePrevSlide = () => {
        let val = this.state.transform + this.state.bannerWidth;
        if (val > 0) {
            val = 0
        }
        this.setState({
            add_transform: `translateX(${val}px)`, transform: val
        })
    }

    render() {
        const { bannerImg, productOffer, proScrollWidth, productWidth } = this.props;
        return (
            <div className="">
                <div className="landing_section">
                    <div className="section-content" style={{ boxShadow: 'none' }}>
                        <div className="productsContainer">
                            <div className="click_next" onClick={this.slidePrevSlide}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </div>
                            <div className="click_prev" onClick={this.slideNextSlide}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                            <div className="products" id="products" style={{ transform: this.state.add_transform, transition: '.5s ease' }} >
                                {
                                    BannerImages.map((bImage, i) => {
                                        return (
                                            <Link key={i} to="" className="land_item" >
                                                <img style={{ height: '100%' }} className="image" src={bImage.image} alt="" />
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {Offer.map((offer, i) => (
                    <ProSlider key={i} proScrollWidth={proScrollWidth} productWidth={productWidth} slideProducts={offer} />
                ))}
            </div>
        )
    }
}

export default LandingSlider