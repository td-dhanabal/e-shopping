import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import '../../style.css';
import Config from '../../config';
import ProductsSlide from '../../json/Product.json';
class proSlider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            transform: 0,
            add_transform: "translateX(0px)",
            Products: [],
            data: [],
            productWidth: '',
            proScrollWidth: ''
        }
    };
    componentDidMount() {
        var productsContainerwidth = document.querySelector('.productsImgContainer').offsetWidth;
        var productswidth = document.querySelector('.productsImg').offsetWidth;
        let scrollableWidth = productsContainerwidth - productswidth;
        this.setState({ proScrollWidth: scrollableWidth })
        var product = document.querySelector('.item').offsetWidth;
        this.setState({ productWidth: product });
    }
    nextSlide = (e) => {
        let val = this.state.transform - this.state.productWidth;
        if (this.state.proScrollWidth > val) {
            val = this.state.proScrollWidth
        }
        this.setState({
            add_transform: `translateX(${val}px)`, transform: val
        })
        console.log(val)
    }
    prevSlide = () => {
        let val = this.state.transform + this.state.productWidth;
        if (val > 0) {
            val = 0
        }
        this.setState({
            add_transform: `translateX(${val}px)`, transform: val
        })
    }
    render() {
        const { slideProducts } = this.props;
        return (
            <div>
                <div className="section">
                    <div className="section-content">
                        <div className="section-header">
                            <h4 className="section-title">
                                {slideProducts.offer_name}
                            </h4>
                            <Link to="/offer-products">View</Link>
                        </div>
                        <div className="productsImgContainer" >
                            {slideProducts.products.length < 5
                                ?
                                <div className="productsImg" style={{ transform: this.state.add_transform, transition: '.5s ease' }} >
                                    {
                                        slideProducts.products.map((product, i) => {
                                            return (
                                                <Link key={i} to={`product/${product._id}`} className="item" >
                                                    <img className="image" src={product.image} alt="" />
                                                    <label className="txt_overflow">{product.description}</label>
                                                    <div className="recently_product_price">
                                                        <div><FontAwesomeIcon icon={faRupeeSign} /></div>
                                                        <h4 style={{ color: 'green' }} >{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(product.selling_price)}</h4>
                                                        <p className="discount_amt"> <FontAwesomeIcon icon={faRupeeSign} />{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(product.mrp)}</p>
                                                    </div>{product.discount_percentage === 0 ? null : <p className=""> {product.discount_percentage} % off</p>}
                                                </Link>
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
                                    <div className="productsImg" style={{ transform: this.state.add_transform, transition: '.5s ease' }} >
                                        {
                                            slideProducts.products.map((product, i) => {
                                                return (
                                                    <Link key={i} to={`product/${product._id}`} className="item" >
                                                        <img className="image" src={product.image} alt="" />
                                                        <label className="txt_overflow">{product.description}</label>
                                                        <div className="recently_product_price">
                                                            <div><FontAwesomeIcon icon={faRupeeSign} /></div>
                                                            <h4 style={{ color: 'green' }} >{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(product.selling_price)}</h4>
                                                            <p className="discount_amt"> <FontAwesomeIcon icon={faRupeeSign} />{product.mrp}</p>
                                                        </div>{product.discount_percentage === 0 ? null : <p className=""> {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(product.discount_percentage)} % off</p>}
                                                    </Link>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>
                <div className="images" >
                    {
                        slideProducts.images.map((img, i) => (
                            <Link key={i} to="" className="image-item">
                                <img src={img} alt="" />
                            </Link>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default proSlider
