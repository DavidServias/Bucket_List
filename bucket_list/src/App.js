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
    this.lookUpUser = this.lookUpUser.bind(this);
    this.setUserToNull = this.setUserToNull.bind(this);
    this.showCreateProfile = this.showCreateProfile.bind(this);
    this.showLoginPage = this.showLoginPage.bind(this);
    this.showProfileView = this.showProfileView.bind(this);
  }

  showCreateProfile(newUserProfileData) {
    this.setState({
      showLogin:false,
      showProfile: false,
      showCreateAccount: true,
      user: newUserProfileData
    });
  }
  showLoginPage() {
    this.setState({
      user: null,
      showLogin:true,
      showProfile: false,
      showCreateAccount: false
    });
  }
  showProfileView(userProfileData) {
    this.setState({
      user: userProfileData,
      showLogin:false,
      showProfile: true,
      showCreateAccount: false
    });
  }


  // Should maybe move this to Login
  async lookUpUser(identifier) {
    // const userId = "62bd0a4fe89b669738f21dae";
    let TEMP = "1234";
    let dataFromUser = await api.getUserByIdentifier(identifier);
    console.log("data:" + dataFromUser);
    return dataFromUser;
  }

  setUserToNull() {
    console.log("handleSignOut()");
    //this.setState({user: null});
    this.showLoginPage();
  }

  render() {
      return (
        <div className="App">
          
          { (this.state.showLogin) ?
            (<LoginScreen 
              lookUpUser = {this.lookUpUser}
              showProfileView = {this.showProfileView}
              showCreateProfile = {this.showCreateProfile}
            />) 
            : null}

          {(this.state.showProfile) ?
            <ProfileNew 
              profileName = {this.state.user['profile_name']}
              status = {this.state.user['status']}
              bucketListData ={this.state.user['bucket_list']} 
              friendsListData = {this.state.user['friends_list']}
              userId = {this.state.user['_id']}
              lookUpUser = {this.lookUpUser}
              setUserToNull = {this.setUserToNull}
            /> 
            : null
          }

          {(this.state.showCreateAccount) ? 
            <CreateProfileForm
              newUserData={this.state.user}
              showProfileView={this.showProfileView}
            /> : null
          }

        </div>    
      );
  }
}


export default App;
