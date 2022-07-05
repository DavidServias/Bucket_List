import React, { Component } from "react";
import "./css/login.css";
import "./css/background.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
require('dotenv').config();
const jwt  = require('jsonwebtoken');

export default class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
          };    
        this.handleCallbackResponse = this.handleCallbackResponse.bind(this);
    }

    async componentDidMount() {
        /* global google*/
       await google.accounts.id.initialize({
         client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
         callback: this.handleCallbackResponse
       });
   
       await google.accounts.id.renderButton(
         document.getElementById("signInDiv"), 
         {  theme: 'outline', 
            size: 'large', 
            width: '290px'   
        }
       );
     }

    handleCallbackResponse(response) {
        console.log("handleCallbackResponse()");
        var userObject = jwt.decode(response.credential);
        console.log(userObject);
        this.props.updateUser(userObject['sub']);
    }
 
    handleChange = e => {
        this.setState({ [e.currentTarget.id]: e.currentTarget.value });
    };

  render() {
    return (
        <div >
            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>

            <div className="login-buttons">
                <form className="form">
                    <TextField
                        className="textField"
                        label="Username"
                        id="username"
                        placeholder="username"
                        formControlProps={{
                            fullWidth: true
                        }}
                        handleChange={this.handleChange}
                        type="text"
                    />
                    <TextField
                        className="textField"
                        label="Password"
                        id="password"
                        formControlProps={{
                            fullWidth: true
                        }}
                        handleChange={this.handleChange}
                        type="password"
                    />

                    <Button   
                        type="button"
                        className="form__custom-button"
                        onClick={this.handleLogin}
                    >Log in</Button>

                    <Button   
                        type="button"
                        className="form__custom-button"
                        onClick={this.handleCreateAccount}
                    >Create Account</Button>

                    <div id="signInDiv"></div>
                </form>

            </div>
        </div>
    );
  }
}
