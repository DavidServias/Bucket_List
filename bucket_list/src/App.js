//import logo from './logo.svg';
import React from 'react';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileTopRow from './profile_view';
import api from './apiCalls';


class App extends React.Component {    
  constructor(props) {
    super(props);
  
    //Initializing the state 
    this.state ={ user: null } ;
    this.updateUser = this.updateUser.bind(this);
  }
  componentDidMount() {
    this.updateUser();
    // const userId = "62ba2de07b2ab7715a9ba5ca";
    // const userData = await api.getUserData(userId);
    // this.setState({user: userData});
    
  }
  async updateUser() {
    console.log("updateUser()");
    const userId = "62ba2de07b2ab7715a9ba5ca";
    const userData = await api.getUserData(userId);
    this.setState({user: userData});
  }
  render() {
   let user = this.state.user;
   console.log(this.state.user);
    return (
      this.state.user===null  ?
        <h1>Loading</h1>: 
        <div className="App">
          <ProfileTopRow 
            //user ={this.state.user}
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
