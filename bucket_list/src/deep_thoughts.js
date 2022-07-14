import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './css/profile.css';
//import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
//import Item from './item';
import api from './apiCalls';
//import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactSVG } from 'react-svg';
import './css/profile.css';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBox from '@mui/material/Checkbox';
//import api from './apiCalls';



export class DeepThoughts extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addThought = this.addThought.bind(this);
        this.state = {newThought: ""};
        this.addThoughtPlaceholderText = "Add a deep thought.";
    }
    handleChange(event) {
        this.setState({newThought: event.target.value});
    }
    async addThought(){
        console.log("addThought");
        await api.addThought(this.props.userIdentifier, this.state.newThought);
        this.setState({newThought: ""});
        this.props.refreshUserData(this.props.userIdentifier);

    }
    // onSubmit() {
    //     console.log("onSubmit()");
    // }
    render(){
        return (

            <div id="deep-thought-container">
            <h3>{this.props.profileName}'s Deep Thoughts</h3>
            <Divider />
            <nav aria-label="secondary mailbox folders">
                <List>
                {this.props.deepThoughts.map(function (thought) {
                    //let userId = this.props.userId;
                    return (
                        <Thought item_text={thought['text']} 
                              userIdentifier={this.props.userIdentifier}
                              thought_id={thought['_id']}
                              key = {thought['_id']}
                              refreshUserData= {this.props.refreshUserData}
                        
                              />
                    );
                // reminder for me: the "this" argument has to be included
                // at the end so that the call back has access to the outer
                // "this".
                }, this)}
                </List>
              
                <TextField

                    fullWidth 
                    margin="none"
                    label={this.addThoughtPlaceholderText}
                    value={this.state.newThought} 
                    placeholder={this.addThoughtPlaceholderText} 
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton className="AddBtn" onClick={this.addThought}>
					            <AddIcon />
				            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      
                    onChange={this.handleChange}
                />
              
            </nav>
            </div>
            // </Box>
        );
    }
}


class Thought  extends React.Component {
    constructor(props) {
        super(props);
        this.removeThought = this.removeThought.bind(this);
        // this.updateStatus = this.updateStatus.bind(this);
    };

    async removeThought() {
        console.log("remove");
        await api.removeThought(this.props.userIdentifier, this.props.thought_id);
        this.props.refreshUserData(this.props.userIdentifier);
    };

    // async updateStatus() {
    //     console.log("updateStatus()");
    //     await api.updateItemStatus(
    //         this.props.userIdentifier, 
    //         this.props.item_id, 
    //         this.props.completed
    //     );
    //     this.props.refreshUserData(this.props.userIdentifier);
    // };

    // handleCheck() {
    //     console.log("handleCheck");
    // };

    render() {
        let textStyleOveride = this.props.completed===true ? 
            'line-through' : ''; 
        const label = { inputProps: { "aria-label": "Checkbox demo" } };
        return (
            <ListItem disablePadding>
                {/* <ReactSVG className="bucket-icon" 
                    src="bucket-fill.svg" /> */}
                <ListItemButton component="a" href="#">
                    <ListItemText primary = {this.props.item_text}
                        sx={{textDecoration:textStyleOveride}} />
                </ListItemButton>
               
                <CheckBox {...label} 
                    checked={this.props.complete}
                    icon={<DeleteIcon />}
                    onChange={this.removeThought}
                    checkedIcon={<DeleteIcon />}
                    />  
            </ListItem>
           
        );
    };
}


export default DeepThoughts;