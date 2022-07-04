import React from 'react';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileNew from './profileNew';
import api from './apiCalls';
//import {useEffect, useState} from 'react';
//import Login from './login_old';
require('dotenv').config();
//import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
//import express from 'express';

//dotenv.config();
console.log("test:" + process.env.REACT_APP_GOOGLE_CLIENT_ID);
//import express from 'express';
const jwt  = require('jsonwebtoken');
//import GoogleLogin from 'react-google-login';
//import Logout from './logout';


class App extends React.Component  {    
  constructor(props) {
    super(props);
    this.state= {user: null};
    this.handleCallbackResponse = this.handleCallbackResponse.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  handleCallbackResponse(response) {
    console.log("handleCallbackResponse()");
    var userObject = jwt.decode(response.credential);
    console.log(userObject);
    this.updateUser();
  }

  async componentDidMount() {
    /* global google*/
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      //client_id: "845379710734-vv3tm1qqp004uv7kb6f75l7rcrkb3ese.apps.googleusercontent.com",
      callback: this.handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"), 
      {theme: 'outline', size: 'large'}
    );

  }

  async updateUser() {
    console.log("updateUser()");
    const userId = "62bd0a4fe89b669738f21dae";
    let dataFromUser = await api.getUserData(userId);
    console.log(dataFromUser);
    this.setState({user: dataFromUser});
    //setUserData(dataFromUser);

  }
  
  render() {
    return (
      this.state.user===null  ?
      <div className="App">
        <div id="signInDiv"></div>
      </div>:

      <div className="App">
          <ProfileNew 
              profileName = {this.state.user['profile_name']}
              status = {this.state.user['status']}
              bucketListData ={this.state.user['bucket_list']} 
              friendsListData = {this.state.user['friends_list']}
              userId = {this.state.user['_id']}
              updateUser = {this.updateUser}
          />
      </div>  
      
    );

  }
  
}



export default App;
