import React from 'react';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileNew from './profileNew';
import api from './apiCalls';
import LoginScreen from './login';
import CreateProfileForm from './createProfileForm';
require('dotenv').config();
const jwt  = require('jsonwebtoken');


class App extends React.Component  {    
  constructor(props) {
    super(props);
    this.state= {
      user: null,
      showLogin: true,
      showProfile: false,
      showCreateAccount: false,

    };
    //this.handleCallbackResponse = this.handleCallbackResponse.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  async updateUser(identifier) {
    console.log("updateUser()");
    console.log("identifier received:" + identifier);
    const userId = "62bd0a4fe89b669738f21dae";
    let TEMP = "1234";
    let dataFromUser = await api.getUserByIdentifier(identifier);
    console.log("data:" + dataFromUser);
    if (dataFromUser.message === "no match") {
      this.setState({
        showLogin:false,
        showProfile: false,
        showCreateAccount: true
      });
    } else {
      this.setState({user: dataFromUser, loggedIn: true});
    }
    
  }
  
  handleSignOut() {
    console.log("handleSignOut()");
    this.setState({user: null});
  }

  render() {
      return (
        <div className="App">
          
          {(this.state.showLogin) &&
              <LoginScreen
              updateUser = {this.updateUser}
          />}

          {(this.state.showProfile) &&
            <ProfileNew 
              profileName = {this.state.user['profile_name']}
              status = {this.state.user['status']}
              bucketListData ={this.state.user['bucket_list']} 
              friendsListData = {this.state.user['friends_list']}
              userId = {this.state.user['_id']}
              updateUser = {this.updateUser}
              handleSignOut = {this.handleSignOut}
            />
          }

          {(this.state.showCreateAccount) && 
            <CreateProfileForm/>
          }

        </div>    
      );
  }
}


export default App;
