import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactSVG } from 'react-svg';
import './css/profile.css';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import api from './apiCalls';


import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';


class ProfileTopRow extends React.Component {
    render() {
        const user = this.props.user;
        return (
            <div className="row main-top-row-box">
                <div className="main-top-row-div bucket-list col-lg-4">
                    <h2>BucketList</h2>
                    <BucketList 
                        userId = {this.props.userId}
                        bucketListData = {this.props.bucketListData}
                        updateUser = {this.props.updateUser}
                    />
                </div>
                <div className="main-top-row-div bucket-img-box col-lg-4">
                    <ReactSVG className="bucket-img" src="bucket_image.svg" />
                    <h1 className="name">{this.props.profileName}</h1>
                    <h4>status: "{this.props.status}"</h4>
                </div>
                <div className="main-top-row-div col-lg-4">
                    <h2>My Bucket Buddies</h2> 
                    {this.props.friendsListData.map(function (buddy) {
                        return (<p className="buddy">{buddy}</p>);}                       
                    )}     
                </div>
            </div>                 
        );    
    };
}


export class BucketList extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.state = {newItem: ""};
        this.addItemPlaceholderText = "Add an Item to Your Bucket List";
    }
    handleChange(event) {
        this.setState({newItem: event.target.value});
    }
    async addNewItem(){
        console.log("addNewItem()")
        await api.addBucketListItem(this.props.userId, this.state.newItem);
        this.setState({newItem: ""});
        this.props.updateUser();

    }
    onSubmit() {
        console.log("onSubmit()");
    }
    render(){
        const ariaLabel = { 'aria-label': 'description' };
        return (
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Divider />
            <nav aria-label="secondary mailbox folders">
                <List>
                {this.props.bucketListData.map(function (item) {
                    let userId = this.props.userId;
                    return (
                        <Item item_text={item['text']}
                              completed={item['completed']} 
                              user_id={this.props.userId}
                              item_id={item['_id']}
                              updateUser = {this.props.updateUser}
                              />
                    );
                // reminder for me: the "this" argument has to be included
                // at the end so that the call back has access to the outer
                // "this".
                }, this)}
                </List>
                {/* <input type="text" 
                        value={this.state.newItem} 
                        placeholder={this.addItemPlaceholderText} 
                        onChange={this.handleChange} /> */}
                <TextField

                    fullWidth 
                    margin="none"
                    label={this.addItemPlaceholderText}
                    // id="fullWidth"
                    value={this.state.newItem} 
                    placeholder={this.addItemPlaceholderText} 
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton className="AddBtn" onClick={this.addNewItem}>
					            <AddIcon />
				            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      
                    onChange={this.handleChange}
                />
              
            </nav>
            </Box>
        );
    }
}


class Item extends React.Component {
    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    }
    async remove() {
        console.log("remove");
        await api.removeBucketListItem(this.props.user_id, this.props.item_id);
        this.props.updateUser();
    }
    async updateStatus() {
        console.log("updateStatus()");
        await api.updateItemStatus(
            this.props.user_id, 
            this.props.item_id, 
            this.props.completed
        );
        this.props.updateUser();
    }
    handleCheck() {
        console.log("handleCheck");
    }
    render() {
        let textStyleOveride = this.props.completed===true ? 
            'line-through' : ''; 
        const label = { inputProps: { "aria-label": "Checkbox demo" } };
        return (
            <ListItem disablePadding>
                <ReactSVG className="bucket-icon" 
                    src="bucket-fill.svg" />
                <ListItemButton component="a" href="#">
                    <ListItemText primary = {this.props.item_text}
                        sx={{textDecoration:textStyleOveride}} />
                </ListItemButton>
                <CheckBox {...label} 
                    checked={this.props.completed}
                    onChange={this.updateStatus}/>
                <CheckBox {...label} 
                    checked={this.props.complete}
                    icon={<DeleteIcon />}
                    onChange={this.remove}
                    checkedIcon={<DeleteIcon />}
                    /> 
            </ListItem>
           
        );
    }
}






export default ProfileTopRow;
