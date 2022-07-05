import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';

export class CreateProfileForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      handle: "",
      password: ""

    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange = e => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  };

  render() {
    return (
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        
      <TextField
        fullWidth 
        margin="none"
        label="Choose a Handle"
        id="handle"
        value={this.state.handle} 
        placeholder={"Choose a Handle"}      
        onChange={this.handleChange}
      /> 

      <TextField
        fullWidth 
        margin="none"
        label="Choose a Password"
        id="password"
        value={this.state.password} 
        placeholder="Choose a Password"      
        onChange={this.handleChange}
      /> 
       
      </Box>
    );
  }
  
}

export default CreateProfileForm;
