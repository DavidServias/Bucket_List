import React from 'react';
//const {google} = require('googleapis');
const {dotenv} = require('dotenv');
//import { GoogleLogin } from 'react-google-login';


// hide this in .env eventually
const REACT_APP_GOOGLE_CLIENT_ID = "845379710734-vv3tm1qqp004uv7kb6f75l7rcrkb3ese.apps.googleusercontent.com";


// keep this thought
const clientId = REACT_APP_GOOGLE_CLIENT_ID;

class Login extends React.Component {
  constructor(props) {
    super(props);
    // window.handleGoogleLoginCallback = this.handleGoogleLoginCallback;
  }
  componentDidMount() {
    
    //google.accounts.id.prompt();

  }
  
  
  handleClick (res) {
    console.log('Login Success: currentUser:', res.profileObj);
    // google.accounts.id.initialize({
    //   client_id: dotenv.process.env.GOOGLE_CLIENT_ID,
    //   ux_mode: "redirect",
    //   login_uri: "http://localhost:8080/login/handler",
    //   context:"signin",
    //   auto_prompt:"false"

    // });
  }

  onFailure = (res) => {
    console.log('Login failed: res:', res);
  }

  // data-callback={onSuccess}

  render() {
    return (
      <div>
          <div id="g_id_onload" 
              data-client_id="845379710734-vv3tm1qqp004uv7kb6f75l7rcrkb3ese.apps.googleusercontent.com"
              data-context="signin"
              data-ux_mode="redirect"
              data-login_uri="http://localhost:8080/login/handler"
              data-auto_prompt="false">
          </div>

          <div className="g_id_signin"
              data-type="standard"
              data-shape="rectangular"
              data-theme="outline"
              data-text="signin_with"
              data-size="large"
              data-logo_alignment="left">
          </div>

      </div>

    );
  }
      
      
       /* <div id="g_id_onload"
          data-client_id="845379710734-vv3tm1qqp004uv7kb6f75l7rcrkb3ese.apps.googleusercontent.com"
          data-callback="handleGoogleLoginCallback"
          >
      </div> */
      /* <div id="g_id_onload"
         data-client_id="845379710734-vv3tm1qqp004uv7kb6f75l7rcrkb3ese.apps.googleusercontent.com"
         data-ux_mode="redirect"
         data-login_uri="http://localhost:3000/">
    </div> */
    /* <div class="g_id_signin" data-type="standard"></div> */



      /* <div className="g_id_signin" data-type="standard"></div> */
      /* <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      /> */
    
};


export default Login;