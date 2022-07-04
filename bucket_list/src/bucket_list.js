import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/profile.css';
import Box from '@mui/material/Box';
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
            <Box sx={{ width: '100%', /*maxWidth: 360, */bgcolor: 'background.paper' }}>
            <div className="bucket-list-container">
            <h1>{this.props.profileName}'s Bucket List</h1>
            <div className="font-weight-600 mb-3 text-muted mt-n1">
                Here is what {this.props.profileName} hopes to experience during this life: 

                    </div>
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
            </div>
            </Box>
        );
    }
}

export default BucketList;