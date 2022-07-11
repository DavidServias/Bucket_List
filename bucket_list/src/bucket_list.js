import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/profile.css';
//import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import Item from './item';
import api from './apiCalls';


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
        await api.addBucketListItem(this.props.userIdentifier, this.state.newItem);
        this.setState({newItem: ""});
        this.props.refreshUserData(this.props.userIdentifier);

    }
    onSubmit() {
        console.log("onSubmit()");
    }
    render(){
        return (
/* <ProfileView 
            profileName = {this.state.user['profile_name']}
            status = {this.state.user['status']}
            bucketListData ={this.state.user['bucket_list']} 
            friendsListData = {this.state.user['friends_list']}
            userIdentifier = {this.state.user['identifier']}
            lookUpUser = {this.lookUpUser}
            refreshUserData = {this.refreshUserData}
            setUserToNull = {this.setUserToNull}
          />  */

            <div id="bucket-list-container">
            <h1>{this.props.profileName}'s Bucket List</h1>
            <div className="font-weight-600 mb-3 text-muted mt-n1">
                Here is what {this.props.profileName} hopes to experience during this life: 
                    </div>
            <Divider />
            <nav aria-label="secondary mailbox folders">
                <List>
                {this.props.bucketListData.map(function (item) {
                    //let userId = this.props.userId;
                    return (
                        <Item item_text={item['text']}
                              completed={item['completed']} 
                              userIdentifier={this.props.userIdentifier}
                              item_id={item['_id']}
                              key = {item['_id']}
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
                    label={this.addItemPlaceholderText}
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
            </div>
            // </Box>
        );
    }
}

export default BucketList;