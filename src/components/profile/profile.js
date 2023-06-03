import React, { useEffect, useState } from 'react';
import { Typography, TextField, Grid, Snackbar } from '@material-ui/core';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import axios from 'axios';
import Config from '../../config';
import Loader from '../commonComponents/loader';
import ManageAddress from './manageAddress';
import HomeProfile from './homeProfile';
import HomeOrder from '../Order/homeOrder';
import ProfileData from '../../json/profile.json'
function Profile(props) {
    const [profile, setProfile] = useState([]);
    const [errorMsg, seterrorMsg] = useState('');
    const [snackbar, setsnackbar] = useState(false);
    const [Name, setName] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const [Url, setUrl] = useState('');

    useEffect(() => {
        const url=props.match.url;
        setUrl(url);
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
            })
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
    const logout = () => {
        localStorage.removeItem('key');
        seterrorMsg("Logout");
        setsnackbar(!snackbar);
        props.history.push('/');
    }
    return (
            <div className="mar0-50 profile_body">
                {console.log("object",ProfileData)}
                <Grid container spacing={1} className="pad10-0">
                    <Grid item md={3} xs={12}  >
                    <div style={{ boxShadow: '0 0 2px 1px #ddd' }}>
                        <div className="profileCard">
                            <div className="pad20">
                                <Avatar className="porfile_Avatar">P</Avatar>
                            </div>
                            <Typography style={{ padding: '20px 0px' }} variant="h5" align="center" component="h2">
                                Hi, {ProfileData.name}
                            </Typography>
                            <Typography style={{ padding: '20px 0px' }} align="center" component="p">
                                {ProfileData.email}
                            </Typography>
                            <Typography style={{ padding: '20px 0px' }} align="center" component="p">
                                {ProfileData.mobile_no}
                            </Typography>
                        </div>
                        <Link to={`${Url}`}><Typography className="profile_menus"><PermIdentityIcon />Profile</Typography></Link>
                        <Link to={`${Url}/orders`}><Typography className="profile_menus"><LoyaltyIcon />My Orders </Typography></Link>
                        <Link to={`${Url}/manage-address`}><Typography className="profile_menus"><HomeIcon />Manage Address</Typography>
                        </Link>
                        <Typography onClick={logout} className="profile_menus"><PowerSettingsNewIcon />Logout </Typography>
                        </div>
                    </Grid>
                   
                    <Grid item md={9} xs={12}>
                        <Switch>
                            <Route exact path={`${Url}`} component={HomeProfile} />
                            <Route path={`${Url}/manage-address`} component={ManageAddress} />
                            <Route  path={`${Url}/orders`} component={HomeOrder} />
                        </Switch>
                    </Grid>
                </Grid>
            </div>
        
    );
}



export default Profile
