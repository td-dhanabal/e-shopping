import React, { Component } from 'react';
import { AppBar, Button, TextField, Toolbar, MenuItem, TextareaAutosize, Dialog, DialogContent, Snackbar } from '@material-ui/core';
// import { BrowserRouter as Router, Link } from 'react-router-dom';
import { withRouter, Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import axios from 'axios';
import Config from '../../config'


class header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      handleValue: '',
      SuggestData: [],
      IsLogin: false,
      errorMsg: '',
      snackbar: false,
      Loginopen: false,
      IsSearchList: false,
      IsShowSearch: '',
      Registeropen: false,
      IsRegister: false,
      failerror: '',
      states: [],
      RegisterData: {
        name: '',
        email: '',
        mobile_no: '',
        address: '',
        pincode: '',
        state: ''
      },
      LoginData: {
        user_name: '',
        password: '',
      }
    }
  }
  componentDidMount() {
    axios.get(`${Config.baseURL}/api/state`
    )
      .then(res => {
        this.setState({
          states: res.data
        })
      })
      .catch(error => {
        console.log(error)
      })
    localStorage.getItem('key') ?
      this.setState({
        IsLogin: !this.state.IsLogin
      }) :
      this.setState({
        IsLogin: (this.state.IsLogin)
      })

  };
  suggestChange = e => {
    let sugestName = e.currentTarget.value;
    if (sugestName === '') {
      console.log("sugestName",sugestName)
      this.setState({
        IsSearchList: !this.state.IsSearchList
      })

    } else {
      console.log("sugestNamaae",sugestName)
      this.setState({
        IsSearchList: !this.state.IsSearchList
      })
    }
    this.setState({ handleValue: sugestName });
    axios.get(`${Config.baseURL}/api/search-product?search=${sugestName}`)
      .then(res => {
        this.setState({
          SuggestData: res.data
        })

      })
      .catch(error => {
        console.log("error", error)
      })
  };
  searchSubmit = (e) => {
    e.preventDefault();
    if (this.state.handleValue) {
      let Url = `/searchResult/${this.state.handleValue}`;
      this.props.history.push(Url);
    }

    this.setState({
      IsSearchList: !this.state.IsSearchList
    })


  };
  logout = () => {
    localStorage.removeItem('key');
    this.setState({
      errorMsg: ("Logout successfully"),
      snackbar: !this.state.snackbar
    })
  };
  LoginSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.LoginData)
    // axios.post(`${Config.baseURL}/api/login`, this.state.LoginData)
    //   .then(res => {
    //     if (res.data.success) {
    //       localStorage.setItem('key', res.data.key)
    //       this.setState({
    //         IsLogin: res.data.success,
    //         errorMsg: "Login Successfully",
    //         snackbar: !this.state.snackbar,
    //         Loginopen: this.state.Loginopen == false
    //       })

    //     } else {
    //       this.setState({
    //         failerror: res.data.message,
    //         Loginopen: this.state.Loginopen === true
    //       })
    //     }
    //   })
    //   .catch(error => {
    //     console.log("error", error)
    //   })
  };

  registerSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.RegisterData)
    // axios.post(`${Config.baseURL}/api/user-registration`, this.state.RegisterData)
    //   .then(res => {
    //     console.log(res.data);
    //     if (res.data.success) {
    //       this.setState({
    //         Registeropen: this.state.Registeropen === false,
    //         snackbar: !this.state.snackbar,
    //         errorMsg: res.data.message,
    //         IsRegister: res.data.success
    //       })
    //     } else {
    //       this.setState({
    //         failerror: res.data.message,
    //         Registeropen: this.state.Registeropen === true,
    //       })
    //     }

    //   })
    //   .catch(error => {
    //     console.log(error)
    //   });

  };
  goSignUp = () => {
    this.setState({
      Loginopen: !this.state.Loginopen,
      Registeropen: !this.state.Registeropen,
    })

  };
  goSignIn = () => {
    this.setState({
      Loginopen: !this.state.Loginopen,
      Registeropen: !this.state.Registeropen,
    })
  };
  createPopupClose = () => {
    this.setState({
      Loginopen: this.state.Loginopen === true,
      Registeropen: this.state.Registeropen === false,
    })
  };
  logincreatePopupClose =()=>{
    this.setState({
      Loginopen: this.state.Loginopen === false,
      Registeropen: this.state.Registeropen === true,
    })
  };
  RegisterHandler = e => {
    this.setState({
      RegisterData: { ...this.state.RegisterData, [e.target.name]: e.target.value }
    })

  };
  LoginHandler = e => {
    this.setState({
      LoginData: { ...this.state.LoginData, [e.target.name]: e.target.value }
    })
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbar: !this.state.snackbar });
  };
  LoginPopupOpen = () => {
    this.setState({
      Loginopen: !this.state.Loginopen
    })
  };
  render() {
    const { IsSearchList, IsShowSearch, Loginopen, IsLogin, loginfailerror, Registeropen, IsRegister, failerror, states, snackbar, errorMsg } = this.state;
    return (
      <div>
        <AppBar position="fixed" className="themeClr">

          <Toolbar >
            <div className="header">
              <div className="logo">
				  <h3>Happy Shopping</h3>
                {/*<Link to="/"><img src="https://propluslogics.com/wp-content/themes/propluslogics/images/logo.png" alt="" /></Link>*/}
              </div>
              <div className="text-box">
                <form onSubmit={this.searchSubmit} className="dis-flex" >
                  <div className="search_box">
                    <input type="text" placeholder="Search" onChange={this.suggestChange} />
                    {this.state.handleValue === '' ? null :
                      <div className="searchList">
                        {this.state.SuggestData?.map((data, i) => (
                          <div key={i} className="search_boxList" style={{ display: (IsSearchList ? 'none' : IsShowSearch ? 'block' : 'block') }}>
                            <Link to={`/searchResult/${data.suggest}`} >
                              <li >{data.suggest}</li>
                            </Link>
                          </div>
                        ))
                        }
                      </div>
                    }
                    <button type="submit" style={{ border: 'none', backgroundColor: 'unset' }}><SearchIcon /></button>
                  </div>
                </form>
              </div>
              
                  <div className="dis-flex">
                    <div className="dropdown">
                      <button className="myAccount btn-bg-remove clrwhite" >My Account <ArrowDropDownIcon /></button>
                      <div className="myAccount_card">
                        <ArrowDropUpIcon className="arrow_icon" />
                        <Link to="/profile"><li>Profile</li></Link>
                        <Link to="/order"><li>Orders</li></Link>
                        <Link to="/manage-address"><li>Address</li></Link>
                        <li onClick={this.logout}>Logout</li>
                      </div>
                    </div>
                    <div>
                      <Link to="/cart"><span className=""></span><button className="btn-bg-remove clrwhite " > <ShoppingCartIcon className="nav-icons " />Cart</button>
                      </Link>
                    </div>
                  </div> 
                  <Link to="">
                    <button onClick={this.LoginPopupOpen} className="btn-bg-remove clrwhite login_btn">Login</button>
                  </Link>
             
            </div>
          </Toolbar>
        </AppBar>
        <Dialog open={Loginopen} onClose={this.logincreatePopupClose} aria-labelledby="form-dialog-title">
          <form onSubmit={this.LoginSubmit} >
            <DialogContent className="pad0">
              <div className="form">
                <div className="register_imgCard">
                  <img className="wid100" src="./login.png" alt="" />
                </div>
                <div className="wid300 pad20">
                  <h3>Log In</h3>
                  {IsLogin ?
                    null :
                    <p className="login_alert">{loginfailerror}</p>
                  }
                  <div>
                    <TextField
                      className="wid100"
                      name="user_name"
                      id="user_name"
                      label="User Name"
                      onChange={this.LoginHandler}
                    />
                  </div>
                  <div >
                    <TextField
                      className="wid100"
                      type="password"
                      name="password"
                      id="standard-password-input"
                      label="Password"
                      onChange={this.LoginHandler}
                    />
                  </div>
                  <p>Forgot Password?</p>
                  <Button
                    type="submit"
                    className="themeClr wid100 pad10"
                    size="small"
                    color="primary">
                    Login
                </Button>
                  <p className="notAccount">Don't have account?
                <Button onClick={this.goSignUp}
                      size="small"
                      color="primary">
                      SignUp
                 </Button>
                  </p>
                </div>
              </div>
            </DialogContent>
          </form>
        </Dialog>
        {/************** LOGIN POPUP END *****************/}
        {/************** REGISTER POPUP START *****************/}
        <Dialog open={Registeropen} onClose={this.createPopupClose} aria-labelledby="form-dialog-title">
          <form onSubmit={this.registerSubmit} >

            <DialogContent className="pad0">
              <div className="form">
                <div className="register_imgCard">
                  <img className="wid100" src="./login.png" alt="" />
                </div>
                <div className="wid300 pad10">
                  <h3>Sign Up</h3>
                  {IsRegister ?
                    null : <p className="login_alert">{failerror}</p>
                  }
                  <div >
                    <TextField
                      className="wid100"
                      name="name"
                      id="name"
                      label="User Name"
                      onChange={this.RegisterHandler}
                    />
                  </div>
                  <div >
                    <TextField
                      className="wid100"
                      name="email"
                      id="email"
                      label="Email"
                      onChange={this.RegisterHandler}
                    />
                  </div>
                  <div >
                    <TextField
                      className="wid100"
                      name="mobile_no"
                      id="mobile_no"
                      label="Mobile No"
                      onChange={this.RegisterHandler}
                    />
                  </div>
                  <div className="add_txtarea" >
                    <TextareaAutosize
                      className="wid100"
                      rowsMax={4}
                      name="address"
                      id="address"
                      aria-label="Address"
                      placeholder="Address"
                      onChange={this.RegisterHandler}
                    />
                  </div>
                  <div >
                    <TextField
                      className="wid100"
                      name="pincode"
                      id="pincode"
                      label="Pin Code"
                      onChange={this.RegisterHandler}
                    />
                  </div>
                  <div >
                    <TextField
                      className="wid100"

                      select
                      label="Select State"
                      onChange={this.RegisterHandler}
                      name="state"
                    >
                      {states.map((state, i) => (
                        <MenuItem key={i} value={state.state_name}>
                          {state.state_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <Button
                    type="submit"
                    className="themeClr wid100 pad10 mart-10"
                    size="small"
                    color="primary">
                    Register
                </Button>
                  <p className="notAccount">Already have a account?
                <Button onClick={this.goSignIn}
                      size="small"
                      color="primary">
                      SignIn
                            </Button>
                  </p>
                </div>
              </div>
            </DialogContent>
          </form>
        </Dialog>
        {/************** REGISTER POPUP END *****************/}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={snackbar}
          autoHideDuration={2000}
          onClose={this.handleClose}
          message={errorMsg}
        />
      </div>
    )
  }
}

export default withRouter(header) 