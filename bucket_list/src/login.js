import React, { Component } from "react";
import "./css/login.css";
import "./css/login.css";
import AnimatedBackground from './animated_background';
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
        this.handleGoogleResponse = this.handleGoogleResponse.bind(this);
        this.generateIdentifier = this.generateIdentifier.bind(this);
    }

    async componentDidMount() {
        /* global google*/
       await google.accounts.id.initialize({
         client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
         callback: this.handleGoogleResponse
       });
   
       await google.accounts.id.renderButton(
         document.getElementById("signInDiv"), 
         {  theme: 'outline', 
            size: 'large', 
            width: '290px'   
        }
       );
     }

    async handleGoogleResponse(response) {
        console.log("handleGoogleResponse()");
        // decode google response and save to userGoogleData
        var googleData = jwt.decode(response.credential);
        console.log(googleData);
        // check to see if google user already has a profile:
        let profileData = await this.props.lookUpUser(googleData['sub']);
        console.log(profileData);
        // if googleUser is does not have a BucketList profile,
        // show create account form.
        if (profileData.message === "no profile matching that identifier") {
            console.log("no profile data");
            let newUserData = {
                "google_verified": true,//maybe backend doesn't need this?
                "identifier" : googleData['sub']
            };
            this.props.showCreateProfile(newUserData);
        // If google user has a profile already, set user in state to
        // this user, and show profile view.
        } else {
            console.log("profile data found");
            this.props.showProfileView(profileData);

        }
    }
 
    handleChange(e) {
        this.setState({ [e.currentTarget.id]: e.currentTarget.value });
    };

    generateIdentifier() {
        var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var identifierLength = 12;
        var identifier = "";
        for (var i = 0; i <= identifierLength; i++) {
          var randomNumber = Math.floor(Math.random() * chars.length);
          identifier += chars.substring(randomNumber, randomNumber +1);
         }
    
        return identifier;
    }
    

  render() {
    return (
        <div >
           <AnimatedBackground/>

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
