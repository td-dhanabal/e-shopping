import React, { useEffect, useState } from 'react'
import { Typography, Snackbar, Grid, TextField, TextareaAutosize, MenuItem } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Config from '../../config';
import Moment from 'moment';
import Loader from '../commonComponents/loader';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import UserAddress from "../../json/userAddress.json";
import UserState from '../../json/state.json'
function ManageAddress(props) {
    const [errorMsg, seterrorMsg] = useState('');
    const [snackbar, setsnackbar] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [EditAddress, setEditAddress] = useState([]);
    const [state, setstate] = useState([]);
    const [Url, setUrl] = useState('');
    const [Addrress, setAddrress] = useState([]);
    const [isEdit, setisEdit] = useState(true);
    const [IsNewAddress, setIsNewAddress] = useState(false);
    const [Datas, setDatas] = useState({
        name: '',
        mobile_no: 0,
        pincode: 0,
        state: '',
        city: '',
        address: ''
    });
    useEffect(() => {
        const url=props.match.url;
        setUrl(url)
        setisLoading(isLoading == true)
        axios.get(`${Config.baseURL}/api/user-address`, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                setAddrress(res.data);
            })
            .catch(error => {
                console.log(error)
            });
        axios.get(`${Config.baseURL}/api/state`
        )
            .then(res => {
                setstate(res.data);
            })
            .catch(error => {
                console.log(error)
            });
            getAllUsers();
    }, [])
    const getAllUsers = () => {
        axios.get(`${Config.baseURL}/api/user-address`, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                setAddrress(res.data);
            })
            .catch(error => {
                console.log(error)
            });
    };
    const EditAddressHandler = e => {
        setDatas({ ...Datas, [e.target.name]: e.target.value });
    }
    const EditStateAddressHandler = e => {
        let datas = { ...Datas }
        datas.state = e.target.value;
        setDatas({ ...Datas, ...datas })
    };
    const EditAddrress = (_id, addresses) => {
        setisEdit(!isEdit);
        setEditAddress(addresses);
        setDatas(addresses);
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
                getAllUsers();
            })
            .catch(error => {
                console.log(error)
            });

    };
    const addNewAddrress = () => {
        setIsNewAddress(!IsNewAddress)
    };
    const DeleteAddrress = (_id) => {
        axios.delete(`${Config.baseURL}/api/user-address/${_id}`, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                seterrorMsg(res.data.message);
                setsnackbar(!snackbar);
                getAllUsers();
            })
            .catch(error => {
                console.log(error)
            });
    };
    const addNewAddress = e => {
        setDatas({ ...Datas, [e.target.name]: e.target.value });
    };
    const AddStateAddress = e => {
        let datas = { ...Datas }
        datas.state = e.target.value;
        setDatas({ ...Datas, ...datas })
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setsnackbar(!snackbar);
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
                setIsNewAddress(!IsNewAddress);
                getAllUsers();
            })
            .catch(error => {
                console.log(error)
            });
    };

    return (
        <div className="inner-maxWidth-container ">
            {/* {
                !isLoading ? <Loader /> : null
            } */}
            <Grid container>
            <Grid className=" profile_addrress">
                    <div className="tabHeading pad10-0">
                        <button className="addAddrress_btn" onClick={addNewAddrress}><AddIcon /> Add Addresses</button>
                    </div>
                    <div className="profile_addrress_body">
                    <div className='card_view' >
                        {IsNewAddress?
                        <form onSubmit={addAddressSubmit} >
                        <div className="form wid67">
                            <div className="group">
                                <TextField
                                    fullWidth
                                    name="name"
                                    id="name"
                                    label="Name"
                                    onChange={addNewAddress}
                                />
                            </div>
                            <div className="group">
                                <TextField
                                    fullWidth
                                    name="mobile_no"
                                    id="mobile_no"
                                    label="Mobile number"
                                    onChange={addNewAddress}
                                />
                            </div>
                            <div className="group">
                                <TextField
                                    fullWidth
                                    name="pincode"
                                    id="pincode"
                                    label="Pincode"
                                    onChange={addNewAddress}
                                />
                            </div>
                            <div className="group">
                                <TextField
                                    fullWidth
                                    id="_id"
                                    select
                                    label="Select State"
                                    onChange={AddStateAddress}
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
                                    onChange={addNewAddress}
                                />
                            </div>
                            <div className="group">
                                <TextareaAutosize
                                    rowsMax={4}
                                    name="address"
                                    id="address"
                                    placeholder="Address"
                                    onChange={addNewAddress}
                                />
                            </div>
                        </div>
                        <button type="submit" className="addCart_btn">Add Addrress</button>
                        <button onClick={() => setIsNewAddress(!IsNewAddress)} className="cancel-btn">Cancel</button>
                    </form>
                    :
                    isEdit ?
                    UserAddress.map((address, i) => (
                            <div key={i}>
                                <div className="manageAddress_card" >
                                    <div>
                                        <p className="rupee_icon">{address.name} &nbsp;{address.mobile_no},</p>
                                        <p>{address.address} &nbsp;&nbsp;{address.city}&nbsp;&nbsp; {address.state.state_name}&nbsp;-&nbsp;{address.pincode}.</p>
                                    </div>
                                    <div className="Address_icon">
                                        <MoreVertIcon />
                                        <div className="addrerssEdit">
                                        <p onClick={() => { EditAddrress(address._id, address) }} >Edit</p>
                                        <p onClick={() => { DeleteAddrress(address._id) }}>Delete</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))

                        :
                        <div>
                            <p>Edit Address</p>
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
                                            onChange={EditStateAddressHandler}
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
                                <button type="submit" className="addCart_btn">Update Addrress</button>
                                <button onClick={() => setisEdit(!isEdit)} className="cancel-btn">CANCEL</button>
                            </form>
                        </div>
                    }
                    
                        
                    </div>
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
    )
}

export default ManageAddress
