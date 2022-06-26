//import logo from './logo.svg';
import React from 'react';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileTopRow from './profile_view';
import fakeUser from './fake_data';

function App() {
  return (
    <div className="App">
      <ProfileTopRow user ={fakeUser}/>
     
    </div>
  );
}




export default App;
