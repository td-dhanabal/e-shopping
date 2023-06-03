import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { Grid, Button, TextField, TextareaAutosize, MenuItem, Snackbar } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import Config from '../config'
import Loader from './commonComponents/loader';
import RemoveIcon from '@material-ui/icons/Remove';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeliveryAddress from '../json/userAddress.json';
import Cart from '../json/cart.json'
import UserState from '../json/state.json'
const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

function Checkout() {
    const [expanded, setExpanded] = useState('panel1');
    const [address, setaddress] = useState([]);
    const [EditAddress, setEditAddress] = useState([]);
    const [state, setstate] = useState([]);
    const [stateId, setstateId] = useState('');
    const [OwnerName, setOwnerName] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const [isEdit, setisEdit] = useState(true);
    const [OrderCartList, setOrderCartList] = useState([]);
    const [errorMsg, seterrorMsg] = useState('');
    const [snackbar, setsnackbar] = useState(false);
    const [changeAddress, setChangeAddress] = useState('');
    const [IsNewAddrress, setIsNewAddrress] = useState(false)

    const addressChange = (event) => {
        setChangeAddress(event.target.value);
        
    };
    const [Datas, setDatas] = useState({
        name: '',
        mobile_no: 0,
        pincode: 0,
        state: '',
        city: '',
        address: ''
    });
    useEffect(() => {
        
            axios.get(`https://192.168.1.45:4000/orders`)
              .then(res => {
                console.log(res);
              })
              .catch(error => {
                console.log(error)
              });
        setisLoading(isLoading === true)
        axios.get(`${Config.baseURL}/api/user-address`, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                setOwnerName(res.data[0].name);
                setChangeAddress(res.data[0]._id);
                setaddress(res.data);
                setisLoading(isLoading === false)
            })
            .catch(error => {
                console.log(error)
            });
        axios.get(`${Config.baseURL}/api/state`
        )
            .then(res => {
                setstateId(res.data[0]._id);
                setstate(res.data);
            })
            .catch(error => {
                console.log(error)
            });
        axios.get(`${Config.baseURL}/api/cart`, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                setOrderCartList(res.data);
            })
            .catch(error => {
                console.log(error)
            });
        getAllCart();
    }, [])

    const getAllCart = () => {
        axios.get(`${Config.baseURL}/api/cart`, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                setOrderCartList(res.data)
            })
    };

    const tabChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const changeHandler = e => {
        setDatas({ ...Datas, [e.target.name]: e.target.value });
    };
    const changeStateHandler = e => {
        let datas = { ...Datas }
        datas.state = e.target.value;
        setDatas({ ...Datas, ...datas })
    };
    const EditAddrress = (_id, addresses) => {
        setisEdit(!isEdit);
        setEditAddress(addresses);
        setDatas(addresses);
    };
    const EditAddressHandler = e => {
        setDatas({ ...Datas, [e.target.name]: e.target.value });
    }
    const EditStateAddressHandler = e => {
        let datas = { ...Datas }
        datas.state = e.target.value;
        setDatas({ ...Datas, ...datas })
    };
    const cancelEdit = () => {
        setisEdit(!isEdit);
    };
    const updateAddressSubmit = (e) => {
        e.preventDefault();
        axios.put(`${Config.baseURL}/api/user-address/${EditAddress._id}`, Datas, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                seterrorMsg(res.data.message);
                setsnackbar(!snackbar);
                setisEdit(!isEdit);
            })
            .catch(error => {
                console.log(error)
            });
    };
    const addAddressSubmit = (e) => {
        e.preventDefault();
        axios.post(`${Config.baseURL}/api/user-address`, Datas, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                seterrorMsg(res.data.message);
                setsnackbar(!snackbar);
            })
            .catch(error => {
                console.log(error)
            });
    };

    const add_quantity = (i) => {
        let items = [...OrderCartList];
        let item = { ...items[i] };
        item.quantity = item.quantity + 1;
        items[i] = item;
        setOrderCartList(items);

        let quantity = {
            quantity: item.quantity
        };

        axios.put(`${Config.baseURL}/api/cart/${item._id}`, quantity, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                seterrorMsg(res.data.message);
                setsnackbar(!snackbar);
            })
            .catch(error => {
                console.log(error)
            });
    };
    const decrement_quantity = (i) => {
        let lessProducts = [...OrderCartList];
        let lessProduct = { ...lessProducts[i] };
        if (lessProduct.quantity > 1) {
            lessProduct.quantity = lessProduct.quantity - 1;
            lessProducts[i] = lessProduct;
            setOrderCartList(lessProducts);
        };
        let quantity = {
            quantity: lessProduct.quantity
        };

        axios.put(`${Config.baseURL}/api/cart/${lessProduct._id}`, quantity, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                seterrorMsg(res.data.message);
                setsnackbar(!snackbar);
            })
            .catch(error => {
                console.log(error)
            });
    };

    const removeCart = (_id) => {
        axios.delete(`${Config.baseURL}/api/cart/${_id}`, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                seterrorMsg(res.data.message);
                setsnackbar(!snackbar);
                getAllCart();
            })
            .catch(error => {
                console.log(error)
            });
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setsnackbar(!snackbar);
    };
    const AddhandleChange = i => e => {
        let manualAdd = [...OrderCartList];
        let item = { ...manualAdd[i] };

        item.quantity = e.target.value;
        manualAdd[i] = item;
        setOrderCartList(manualAdd);
        let quantity = {
            quantity: item.quantity
        };

        axios.put(`${Config.baseURL}/api/cart/${item._id}`, quantity, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
            })
            .catch(error => {
                console.log(error)
            });
    };
    const AddNewAddress = () => {
        setIsNewAddrress(!IsNewAddrress)
    };
    const ChangeNewAddrress = (e) => {
        if (e.target.checked) {
            setIsNewAddrress(!IsNewAddrress)
        }
    };
const cancelAddAddress=()=>{
    setIsNewAddrress(!IsNewAddrress);
    axios.get(`${Config.baseURL}/api/user-address`, {
        headers: {
            user: localStorage.getItem('key')
        }
    })
        .then(res => {
            setChangeAddress(res.data[0]._id);
            setaddress(res.data);
        })
        .catch(error => {
            console.log(error)
        });
};
    return (
        <div className="mar0-50">
            <Grid container className="pad10"spacing={1} >
                {/* {
                    !isLoading ? <Loader /> : null
                } */}
                <Grid item md={8} xs={12} className="checkout">
                    <div className="card_container" >
                        <div className="subHeading">
                            <Typography variant="h6"> CHECKOUT</Typography>
                        </div>
                    </div>
                    <div>
                        <Accordion square expanded={expanded === 'panel1'} onChange={tabChange('panel1')} className="mart-10">
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>DELIVERY ADDRESS</Typography>
                            </AccordionSummary>
                            {isEdit ?
                                <AccordionDetails className="pad0" style={{ boxShadow: '0 0 2px 1px #ddd' }}>
                                    <div className="wid100" >
                                        <RadioGroup value={changeAddress} onChange={addressChange}>
                                            {DeliveryAddress.map((add, i) => (
                                                <div key={i}>
                                                    {changeAddress === add._id ?
                                                        <div className="delivery_address">
                                                            <div>
                                                                <FormControlLabel
                                                                    value={add._id}
                                                                    control={<Radio />}
                                                                    label={add.name}
                                                                />
                                                                <Typography>{add.address}</Typography>
                                                                <button style={{ width: 'unset' }} className="addCart_btn">DELIVER HERE </button>
                                                            </div>
                                                            <EditIcon className="appIcon" onClick={() => { EditAddrress(add._id, add) }} />
                                                        </div> :
                                                        <div className="non-delivery_address">
                                                            <FormControlLabel
                                                                key={i}
                                                                value={add._id}
                                                                control={<Radio />}
                                                                label={add.name}
                                                            />
                                                            <Typography>{add.address}</Typography>
                                                        </div>
                                                    }
                                                </div>
                                            ))}

                                            {/* <Typography onClick={AddNewAddress} className="addNewAddress">ADD NEW ADDRESS</Typography> */}
                                            <div className="new-delivery_address">
                                            <AddIcon className="fntsize20" />
                                                <FormControlLabel
                                                    value="Add Address"
                                                    control={<Radio />}
                                                    label="Add Address"
                                                    onChange={ChangeNewAddrress}
                                                />

                                            </div>
                                            {IsNewAddrress ?
                                                <form onSubmit={addAddressSubmit} >
                                                    <div className="form wid67">
                                                        <div className="group">
                                                            <TextField
                                                                fullWidth
                                                                name="name"
                                                                id="name"
                                                                label="Name"
                                                                onChange={changeHandler}
                                                            />
                                                        </div>
                                                        <div className="group">
                                                            <TextField
                                                                fullWidth
                                                                name="mobile_no"
                                                                id="mobile_no"
                                                                label="Mobile number"
                                                                onChange={changeHandler}
                                                            />
                                                        </div>
                                                        <div className="group">
                                                            <TextField
                                                                fullWidth
                                                                name="pincode"
                                                                id="pincode"
                                                                label="Pincode"
                                                                onChange={changeHandler}
                                                            />
                                                        </div>
                                                        <div className="group">
                                                            <TextField
                                                                fullWidth
                                                                id="_id"
                                                                select
                                                                label="Select State"
                                                                onChange={changeStateHandler}
                                                                name="state"
                                                            >
                                                                {UserState.map((state, i) => (
                                                                    <MenuItem key={i} value={state._id}>
                                                                        {state.state_name}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </div>
                                                        <div className="group">
                                                            <TextField
                                                                fullWidth
                                                                name="city"
                                                                id="city"
                                                                label="City"
                                                                onChange={changeHandler}
                                                            />
                                                        </div>
                                                        <div className="group">
                                                            <TextareaAutosize
                                                                rowsMax={4}
                                                                name="address"
                                                                id="address"
                                                                placeholder="Address"
                                                                onChange={changeHandler}
                                                            />
                                                        </div>
                                                    </div>
                                                    <button type="submit" className="addCart_btn ">SAVE AND DELIVER HERE</button>
                                                    <button onClick={cancelAddAddress} className="cancel-btn ">Cancel</button>
                                                </form>
                                                : null
                                            }
                                        </RadioGroup>

                                    </div>

                                </AccordionDetails>
                                :
                                <AccordionDetails>
                                    <form onSubmit={updateAddressSubmit} >
                                        <div className="form">
                                            <div className="group">
                                                <TextField
                                                    fullWidth
                                                    name="name"
                                                    defaultValue={EditAddress.name}
                                                    id="name"
                                                    label="Name"
                                                    onChange={EditAddressHandler}
                                                />
                                            </div>
                                            <div className="group">
                                                <TextField
                                                    fullWidth
                                                    name="mobile_no"
                                                    id="mobile_no"
                                                    label="Mobile number"
                                                    defaultValue={EditAddress.mobile_no}
                                                    onChange={EditAddressHandler}
                                                />
                                            </div>
                                            <div className="group">
                                                <TextField
                                                    fullWidth
                                                    name="pincode"
                                                    id="pincode"
                                                    label="Pincode"
                                                    defaultValue={EditAddress.pincode}
                                                    onChange={EditAddressHandler}
                                                />
                                            </div>
                                            <div className="group">
                                                <TextField
                                                    fullWidth
                                                    id="_id"
                                                    select
                                                    label="Select State"
                                                    value={EditAddress.state._id}
                                                    onChange={EditStateAddressHandler}
                                                    name="state"
                                                >
                                                    {state.map((state, i) => (
                                                        <MenuItem key={i} value={state._id}>
                                                            {state.state_name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </div>
                                            <div className="group">
                                                <TextField
                                                    fullWidth
                                                    name="city"
                                                    id="city"
                                                    label="City"
                                                    defaultValue={EditAddress.city}
                                                    onChange={EditAddressHandler}
                                                />
                                            </div>
                                            <div className="group">
                                                <TextareaAutosize
                                                    rowsMax={4}
                                                    name="address"
                                                    id="address"
                                                    defaultValue={EditAddress.address}
                                                    placeholder="Address"
                                                    onChange={EditAddressHandler}
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className="addCart_btn">SAVE AND DELIVER HERE</button>
                                        <button onClick={() => setisEdit(!isEdit)} className="cancel-btn">CANCEL</button>
                                    </form>
                                </AccordionDetails>
                            }
                        </Accordion>


                        <Accordion square expanded={expanded === 'panel2'} onChange={tabChange('panel2')} className="mart-10">
                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                <Typography>ORDER SUMMARY</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="pad0" style={{ display: 'unset' }}>
                                {Cart.length ?
                                <div>
                                    {Cart.map((cart, i) => (
                                        <div key={i} className="cart_card" >
                                            <div className="cart_image">
                                                <img src={cart.image} alt="" />
                                            </div>
                                            <div className="cart_content">
                                                <Link to={`/product/${cart._id}`}>
                                                    <h6 style={{ fontSize: '17px' }} >{cart.description} </h6>
                                                </Link>
                                                <div className="recently_product_price" style={{ justifyContent: 'unset' }}>
                                                    <div><FontAwesomeIcon icon={faRupeeSign} /></div>
                                                    <h4 style={{ color: 'green' }} >{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(cart.selling_price)}</h4>
                                                    <p className="discount_amt"> <FontAwesomeIcon icon={faRupeeSign} />{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(cart.mrp)}</p>
                                                </div>
                                            </div>
                                            <div className="proQuantity">
                                                <div className="add_remove"
                                                    onClick={() => decrement_quantity(i)}>
                                                    <RemoveIcon />
                                                </div>
                                                <div className="countValue">
                                                    <input type="number"
                                                        value={cart.quantity}
                                                        onChange={AddhandleChange(i)} />
                                                </div>
                                                <div className="add_remove"
                                                    onClick={() => add_quantity(i)}>
                                                    <AddIcon />
                                                </div>
                                            </div>
                                            <div className="total_amt">
                                                <p className="amt_value" > <FontAwesomeIcon icon={faRupeeSign} /> {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(cart.quantity * cart.selling_price)} </p>
                                            </div>

                                            <div className="saveRemove">
                                                <p onClick={() => removeCart(cart._id)}>Remove </p>
                                            </div>
                                            <hr />
                                            
                                        </div>
                                    ))
                                }
                                    <button  className="addCart_btn ">Continue</button>
                                    </div>
                                    :
                                    <div>
                                        <Typography variant="h5" align="center"> Your Cart was Empty !!!</Typography>
                                    </div>
                                }
                            </AccordionDetails>
                        </Accordion>
                        <Accordion square expanded={expanded === 'panel3'} onChange={tabChange('panel3')} className="mart-10">
                            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                                <Typography>PAYMENTS</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Payments :)
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>

                </Grid>
                <Grid item md={4} xs={12}>
                    <div className="card_container " >
                        <div className="subHeading">
                            <Typography variant="h6"> PRICE DETAILS<span className="countSize">&nbsp;&nbsp;{Cart.length}&nbsp;items</span></Typography>
                        </div>
                        <div>
                        <div className="pad20 "  style={{borderBottom:'1px solid gainsboro'}}>
                                        <div>
                                        <div className="priceTotal">
                                                <p>No of items   </p>
                                                <p>{Cart.length}&nbsp;items</p>
                                            </div>
                                            <div className="priceTotal">
                                                <p>Price   </p>
                                                <p><FontAwesomeIcon icon={faRupeeSign} />&nbsp;
                                                {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
                                                    Cart.reduce((price, cart) => (
                                                        (price += cart.quantity * cart.mrp)
                                                    ), 0)
                                                )}
                                                </p>
                                            </div>
                                            <div className="priceTotal ">
                                                <p>Your savings</p>
                                                <p style={{ color: 'green' }}>-&nbsp;&nbsp;<FontAwesomeIcon icon={faRupeeSign} />&nbsp;
                                                {
                                                        new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
                                                            Cart.reduce((discount, cart, dis) => (
                                                                dis = cart.mrp - cart.selling_price,
                                                                discount += cart.quantity * dis
                                                            ), 0)
                                                        )
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="priceTotal pad10-15">
                                            <p style={{ fontWeight: 'bold' }}>Total Amount</p>
                                            <p style={{ fontWeight: 'bold' }} ><FontAwesomeIcon icon={faRupeeSign} />&nbsp;
                                                {
                                                    new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
                                                        Cart.reduce((mrp, cart, discount, dis, total) => (
                                                            mrp += cart.quantity * cart.mrp,
                                                            dis = cart.mrp - cart.selling_price,
                                                            discount = cart.quantity * dis,
                                                            total = mrp - discount
                                                        ), 0)
                                                    )
                                                }
                                            </p>
                                        </div>
                            {/* <div className="pad20">
                                <div className="price_details">
                                    <div>
                                        <p>Price</p>
                                        <p>Discount</p>
                                        <p style={{ fontWeight: 'bold' }}>Total Amount</p>
                                    </div>
                                    <div>
                                        <p>:</p>
                                        <p>:</p>
                                        <p>:</p>
                                    </div>
                                    <div align='right'>
                                        <p><FontAwesomeIcon icon={faRupeeSign} />&nbsp;
                                    {
                                                new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
                                                    OrderCartList.reduce((price, cart) => (
                                                        price += cart.quantity * cart.mrp
                                                    ), 0)
                                                )
                                            }
                                        </p>
                                        <p style={{ color: 'green' }}>-&nbsp;&nbsp;<FontAwesomeIcon icon={faRupeeSign} />&nbsp;
                                    {
                                                new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
                                                    OrderCartList.reduce((discount, cart, dis) => (
                                                        dis = cart.mrp - cart.selling_price,
                                                        discount += cart.quantity * dis
                                                    ), 0)
                                                )
                                            }
                                        </p>

                                        <p style={{ fontWeight: 'bold' }} ><FontAwesomeIcon icon={faRupeeSign} />&nbsp;
                                    {
                                                new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
                                                    OrderCartList.reduce((mrp, cart, discount, dis, total) => (
                                                        mrp += cart.quantity * cart.mrp,
                                                        dis = cart.mrp - cart.selling_price,
                                                        discount = cart.quantity * dis,
                                                        total = mrp - discount
                                                    ), 0)
                                                )
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
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
            </Grid>
        </div>
    );
}
export default Checkout;