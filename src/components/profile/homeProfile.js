import React, { useEffect, useState } from 'react';
import { Typography, TextField, Grid, Snackbar } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import CallIcon from '@material-ui/icons/Call';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import axios from 'axios';
import Config from '../../config';
import ProfileData from '../../json/profile.json'
function HomeProfile(props) {
    const [IsProfile, setIsProfile] = useState(true);
    const [IsAddrress, setIsAddrress] = useState(false);
    const [errorMsg, seterrorMsg] = useState('');
    const [snackbar, setsnackbar] = useState(false);
    const [EditName, setEditName] = useState(true);
    const [EditEmail, setEditEmail] = useState(true);
    const [EditMobile_no, setEditMobile_no] = useState(true);
    const [isLoading, setisLoading] = useState(false);
    const [Name, setName] = useState('');
    const [profile, setProfile] = useState([]);
    const [Datas, setDatas] = useState({
        name: '',
        mobile_no: '',
        email: ''
    });
    useEffect(() => {
        const url=props.match.url;
        setisLoading(isLoading == true)
        axios.get(`${Config.baseURL}/api/profile`, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                setName(res.data.name);
                setProfile(res.data);
                setisLoading(isLoading == false)
            }
            )
            .catch(error => {
                console.log(error)
            });
        getAllProfile();
    }, [])
    const getAllProfile = () => {
        axios.get(`${Config.baseURL}/api/profile`, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                setName(res.data.name);
                setProfile(res.data);
            }
            )
            .catch(error => {
                console.log(error)
            });
    };

    const NameEdit = (e) => {
        setEditName(!EditName)
    };
    const UpdateName = (e) => {
        axios.put(`${Config.baseURL}/api/profile`, Datas, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                seterrorMsg(res.data.message);
                setsnackbar(!snackbar);
                setEditName(!EditName);
                getAllProfile();
            }
            )
            .catch(error => {
                console.log(error)
            });

    };
    const EmailEdit = (e) => {
        setEditEmail(!EditEmail)
    };
    const UpdateEmail = (e) => {
        axios.put(`${Config.baseURL}/api/profile`, Datas, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                seterrorMsg(res.data.message);
                setsnackbar(!snackbar);
                setEditEmail(!EditEmail);
                getAllProfile();
            }
            )
            .catch(error => {
                console.log(error)
            });
    };
    const EditMobile = () => {
        setEditMobile_no(!EditMobile_no)
    };
    const UpdateMobile_no = (e) => {
        axios.put(`${Config.baseURL}/api/profile`, Datas, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                seterrorMsg(res.data.message);
                setsnackbar(!snackbar);
                setEditMobile_no(!EditMobile_no);
                getAllProfile();
            }
            )
            .catch(error => {
                console.log(error)
            });

    };
    const ManageAddrress = () => {
        setIsProfile(IsProfile == false);
        setIsAddrress(IsAddrress == true)
    };
    const editProfilehandler = (e) => {
        setDatas({ ...Datas, [e.target.name]: e.target.value });
    };
    const AddressSubmit = (e) => {
        e.preventDefault();
        axios.put(`${Config.baseURL}/api/profile`, Datas, {
            headers: {
                user: localStorage.getItem('key')
            }
        })
            .then(res => {
                seterrorMsg(res.data.message);
                setsnackbar(!snackbar);
                getAllProfile();
            }
            )
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

    return (

        <Grid container>
            <Grid className=" profile_addrress">
            <div className="tabHeading">
            <Typography variant="h5"> My Profile<span className="countSize"></span></Typography>
                    </div>
                <div className="profile_addrress_body">
                    <form onSubmit={AddressSubmit}>
                        {
                            EditName ?
                                <div>
                                    <Typography style={{ padding: '20px 0px' }} variant="h6" align="center" component="h2">
                                        <PermIdentityIcon />  Personal information
                                             </Typography>
                                    <div className="editAddress disable">
                                        <TextField
                                            fullWidth
                                            name="name"
                                            value={ProfileData.name || ''}
                                            id="name"
                                            onChange={editProfilehandler}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                        <EditIcon onClick={NameEdit} />
                                    </div>
                                </div>
                                :
                                <div>
                                    <Typography style={{ padding: '20px 0px' }} variant="h6" align="center" component="h2">
                                        <PermIdentityIcon />  Edit personal information
                                             </Typography>
                                    <div className="editAddress">
                                        <TextField
                                            fullWidth
                                            name="name"
                                            defaultValue={ProfileData.name || ''}
                                            id="name"
                                            onChange={editProfilehandler}
                                        />

                                        <button onClick={UpdateName} > <SaveIcon /></button>
                                        <button onClick={NameEdit} ><ClearIcon /></button>
                                    </div>
                                </div>
                        }
                        {EditEmail ?
                            <div>
                                <Typography style={{ padding: '20px 0px' }} variant="h6" align="center" component="h2">
                                    <MailOutlineIcon />  Email address
                                         </Typography>
                                <div className="editAddress disable">
                                    <TextField
                                        fullWidth
                                        name="email"
                                        id="email"
                                        value={ProfileData.email || ''}
                                        onChange={editProfilehandler}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                    <EditIcon onClick={EmailEdit} />
                                </div>
                            </div>
                            :
                            <div>
                                <Typography style={{ padding: '20px 0px' }} variant="h6" align="center" component="h2">
                                    <MailOutlineIcon /> Edit email address
                                        </Typography>
                                <div className="editAddress">
                                    <TextField
                                        fullWidth
                                        name="email"
                                        id="email"
                                        defaultValue={ProfileData.email || ''}
                                        onChange={editProfilehandler}
                                    />
                                    <button onClick={UpdateEmail}><SaveIcon /></button>
                                    <button onClick={EmailEdit}><ClearIcon /></button>
                                </div>
                            </div>
                        }
                        {EditMobile_no ?
                            <div>
                                <Typography style={{ padding: '20px 0px' }} variant="h6" align="center" component="h2">
                                    <CallIcon />Mobile number
                                     </Typography>
                                <div className="editAddress disable">
                                    <TextField
                                        fullWidth
                                        name="mobile_no"
                                        id="mobile_no"
                                        value={ProfileData.mobile_no || ''}
                                        onChange={editProfilehandler}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                    <EditIcon onClick={EditMobile} />
                                </div>
                            </div>
                            :
                            <div>
                                <Typography style={{ padding: '20px 0px' }} variant="h6" align="center" component="h2">
                                    <CallIcon />  Edit Mobile Number
                                 </Typography>
                                <div className="editAddress">
                                    <TextField
                                        fullWidth
                                        name="mobile_no"
                                        id="mobile_no"
                                        defaultValue={ProfileData.mobile_no || ''}
                                        onChange={editProfilehandler}
                                    />
                                    <button onClick={UpdateMobile_no}><SaveIcon /></button>
                                    <button onClick={EditMobile}><ClearIcon /></button>
                                </div>
                            </div>
                        }
                    </form>
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

    )
}

export default HomeProfile
