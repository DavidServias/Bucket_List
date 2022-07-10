
import React from 'react';
import { useState } from "react";
import { useEffect } from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/profile.css';
import Box from '@mui/material/Box';
//import { ReactSVG } from 'react-svg';
import Grid from '@mui/material/Grid';

//import api from './apiCalls';

//import Stack from '@mui/material/Stack';



import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { deepOrange, deepPurple } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { SvgIcon } from '@mui/material';
import { flexbox } from '@mui/system';
import api from './apiCalls';



export class FriendsList extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.follow = this.follow.bind(this);
        this.state = {newItem: ""};
        this.addItemPlaceholderText = "Add an Item to Your Bucket List";
    }
    componentDidMount() {
      this.createFriendsList();
    }
    handleChange(event) {
        this.setState({newItem: event.target.value});
    }
    async follow(){
        

    }
    createFriendsList() {
      const list = this.props.friendsListData;
      const length = list.length;
      let arr = [];
      for (let i=0; i< length; i+= 1) {
        arr.push(list[i]['userIdentifier']);
      };
      let result = {"friends_arr": arr};
      result = JSON.stringify(result);
      console.log(result);
      return result;

    }
    render(){
       
        //const ariaLabel = { 'aria-label': 'description' };
        return (
            <Box sx={{ width: '100%', /*maxWidth: 360, */bgcolor: 'background.paper' }}>
              <div id="followed-list-container">
              <div className="font-weight-600 mb-3 text-muted mt-n1">
                  Bucket Lists You Follow: 
              </div>
              <Divider />
                <Followed friendsListData={this.props.friendsListData}/>
              <div className="font-weight-600 mb-3 text-muted mt-n1">
                  BucketList Suggestions: 
              </div>
                <Suggestions 
                  userIdentifier = {this.props.userIdentifier}
                  friendsListData = {this.props.friendsListData}
                />
              </div>
            </Box>
        );
    }
}

function Followed(props) {
  //let friendsListData = props.friendsListData;  
  return (
    <div>
        {props.friendsListData.map(function (friend) {
          return (
            <nav aria-label="secondary mailbox folders">
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem alignItems="flex-start"
                secondaryAction={
                  <IconButton edge="end" aria-label="person_remove">
                    <PersonRemoveIcon/>
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{bgcolor: deepOrange[500]}} >{friend['name'][0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={friend['name']}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline'}}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Status: 
                      </Typography>
                      "{friend['status']}"
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>    
            </nav>
            
          );
        })}
        
      </div>
    );
};



function createSuggestionsList(data) {
  const length = data.length;
  let arr = [];
  for (let i=0; i< length; i+= 1) {
    arr.push(data[i]['userIdentifier']);
  };
  let result = {"friends_arr": arr};
  result = JSON.stringify(result);
  console.log(result);
  return arr;


};

function Suggestions(props) {

  const [accounts, setSuggestedAccounts] = useState([]);

  useEffect( () => {    // Update the document title using the browser API    
    console.log("useEffect");
      let data = api.findFriends(props.userIdentifier);
      setSuggestedAccounts(createSuggestionsList(data));
  });

  

  
  return (
    <div>
        {accounts.map(function (friend) {
          return (
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem alignItems="flex-start"
                
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <PersonAddIcon/>
                  </IconButton>        
                }
              >
                <ListItemAvatar>
                <Avatar sx={{bgcolor: deepOrange[500]}} >{friend['name'][0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={friend['name']}
                  
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline'}}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Status: 
                      </Typography>
                      "{friend['status']}"
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>    
            
          );
        })}
        
      </div>
    );
};

// function BucketIcon(props) {
//   return (
//     <SvgIcon {...props}>
      
//      <path d="M2.522 5H2a.5.5 0 0 0-.494.574l1.372 9.149A1.5 1.5 0 0 0 4.36 16h7.278a1.5 1.5 0 0 0 1.483-1.277l1.373-9.149A.5.5 0 0 0 14 5h-.522A5.5 5.5 0 0 0 2.522 5zm1.005 0a4.5 4.5 0 0 1 8.945 0H3.527z"/>
//     </SvgIcon>
//   );
// }


export default FriendsList;