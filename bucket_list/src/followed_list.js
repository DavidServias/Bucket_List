
import React from 'react';
import { useState } from "react";
import { useEffect } from 'react';
import { Component } from 'react';
import './css/profile.css';
import Box from '@mui/material/Box';
import api from './apiCalls';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { deepOrange } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';



export class FriendsList extends Component {
    constructor(props) {
        super(props);
        //this.handleChange = this.handleChange.bind(this);
        this.follow = this.follow.bind(this);
        this.state = {newItem: ""};
        this.addItemPlaceholderText = "Add an Item to Your Bucket List";
    }
   
    async follow(){
        console.log("follow");

    }
    
    render(){
        return (
            <Box sx={{ width: '100%', /*maxWidth: 360, */bgcolor: 'background.paper' }}>
              <div id="followed-list-container">
              <div className="font-weight-600 mb-3 text-muted mt-n1">
                  Bucket Lists You Follow: 
              </div>
              <Divider />
              <nav aria-label="secondary mailbox folders">
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  <Followed friendsListData={this.props.friendsListData}/>
                </List>
              </nav>
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
            <ListItem alignItems="flex-start"
            key={friend['userIdentifier']}  
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
            
          );
        })}
        
      </div>
    );
};


function Suggestions(props) {

  const [accounts, setSuggestedAccounts] = useState(null);

  useEffect( () => {    // Update the document title using the browser API    
      console.log("useEffect");
      api.findFriends(props.userIdentifier).
      then(arr => {
        setSuggestedAccounts(arr)
      });
  },[]);

  return (
    <div>
        { (accounts===null)? <h1>Loading</h1> : accounts.map(function (friend) {
          return (
            <ListItem alignItems="flex-start"
                key={friend['identifier']}
                secondaryAction={
                  <IconButton edge="end" aria-label="person_remove">
                    <PersonAddIcon/>
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{bgcolor: deepOrange[500]}} >{friend['profile_name'][0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={friend['profile_name']}
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
            
          );
        }) }
        
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