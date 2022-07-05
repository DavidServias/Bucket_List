import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./css/login.css";
import AnimatedBackground from './animated_background';
import api from './apiCalls';


export class CreateProfileForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      status: "",
      profileName: "",
      googleVerified: false,
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateProfile = this.handleCreateProfile.bind(this);
    this.createProfile = this.createProfile.bind(this);
    //this.generateIdentifier = this.generateIdentifier.bind(this);
  }
  
  async createProfile(newUserData) {//includes "identifier" and "google_verified"
    let userData = newUserData;
    console.log("userData:" + userData);
    userData['profile_name'] = this.state.profileName;
    userData['first_status'] = this.state.status;
    userData['password'] = this.state.password;
    //test
    console.log("user data sent to create new profile:");
    console.log(userData);
    var newProfile = await api.createUser(JSON.stringify(userData));

    return newProfile;
  }

  // generateIdentifier() {
  //   var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //   var identifierLength = 12;
  //   var identifier = "";
  //   for (var i = 0; i <= identifierLength; i++) {
  //     var randomNumber = Math.floor(Math.random() * chars.length);
  //     identifier += chars.substring(randomNumber, randomNumber +1);
  //    }

  //   return identifier;
  // }

  handleChange(e) {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  };
  async handleCreateProfile() {
    var newProfile = await this.createProfile(this.props.newUserData)
    this.props.showProfileView(newProfile); 
  }

  render() {
    return (
      <div>
     
      <AnimatedBackground />
      
      <form className='form'>    
        <TextField
          className="textField"
          label="Choose a Profile Name"
          id="profileName"
          placeholder={"Choose a Profile Name"}
          formControlProps={{
            fullWidth:true
          }}     
          onChange={this.handleChange}
          type="text"
        />

        <TextField
          className="textField"
          label="Choose a Password"
          id="password"
          placeholder={"Choose a Password"}
          formControlProps={{
            fullWidth:true
          }}     
          onChange={this.handleChange}
          type="text"
        /> 

        <Button   
          type="button"
          className="form__custom-button"
          onClick={this.handleCreateProfile}
        >Create Profile</Button>

         
       </form>
      </div>
    );
  }
  
}

export default CreateProfileForm;
