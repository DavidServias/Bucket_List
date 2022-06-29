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
import api from './apiCalls';


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
        //this.state = {list: this.props.user.bucket_list};
    }
    removeBucketListItem(userId, itemId) {
        let url = "http://localhost:8080/bucket_list/";
        url += userId + "/" + itemId + "/remove-item";
        let options = {
            method: 'DELETE',
            headers: {'Content-Type':'application/json;charset=utf-8'},
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => this.setState({user: data}));
    }
    updateItemStatus(userId, itemId) {
        console.log("userId: " + userId);
        console.log("itemId: " + itemId);
    }
    render(){
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
                              //remove={removeItem} 
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
            </nav>
            </Box>
        );
    }
}


class Item extends React.Component {
    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
    }
    async remove() {
        console.log("remove");
        await api.removeBucketListItem(this.props.user_id, this.props.item_id);
        this.props.updateUser();
    }
    handleCheck() {
        console.log("handleCheck");
    }
    render() {
        let textStyleOveride = this.props.completed ? 
            'line-through' : ''; 
        // if (this.props.completed) {
        //     textDecoration = "line-through"
        // }
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
                    checked={this.props.complete}
                    onChange={this.handleCheck}/>
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
