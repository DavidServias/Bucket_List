//import logo from './logo.svg';
import React from 'react';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileTopRow from './profile_view';
//import fakeUser from './fake_data';
//const {getUserById} = require("./api_requests");



// const callRestApi = async () => {
//   let response = await getUserById("62b62c2b14d8eed1db9ea1a8");
//   const jsonResponse = await response.json();
//   console.log(jsonResponse);
// };

// callRestApi();

// let result = fetch("http://localhost:8080/users/62b62c2b14d8eed1db9ea1a8", {
//     method: 'GET',
//     headers: {
//         'Content-Type':
//             'application/json;charset=utf-8'
//     }
// });

// result.then(result=>console.log(result));

class App extends React.Component {
    
  //user.then((user) => { console.log(user);});
  constructor(props) {
    super(props);
  
    //Initializing the state 
    this.state ={ user: null } ;
  }
  componentDidMount() {
    fetch('http://localhost:8080/users/62ba2de07b2ab7715a9ba5ca')
    .then(response => response.json())
    .then(data => this.setState({user: data}));
    


    
    
    // let res = 
    //   await fetch("http://localhost:8080/users/62b62c2b14d8eed1db9ea1a8",
        // { method: 'GET',
        //   headers: {'Content-Type':'application/json;charset=utf-8'},
        // }
//    );
  //  console.log(res);
    //const jsonResponse = await response.json();
    //this.setState({user: response}); 
  
    
  }
  render() {
    //let user = fakeUser;
    //let user = this.state.user;
   console.log(this.state.user);
    return (
      this.state.user===null  ?
        <h1>Loading</h1>: 
        // <h1>response received</h1>
        <div className="App">
          <ProfileTopRow user ={this.state.user}/>
        </div>
    );
  }
  
}




export default App;
