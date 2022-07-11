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


export class PeopleList extends Component {
    constructor(props) {
        super(props);
        this.followAccount = this.followAccount.bind(this);
        this.getSuggestedAccounts = this.getSuggestedAccounts.bind(this);
        this.addItemPlaceholderText = "Add an Item to Your Bucket List";
        this.removeAccount = this.removeAccount.bind(this);
        
        this.state = {newItem: "", suggestedAccounts: []};

    }

    async componentDidMount() {
      await this.getSuggestedAccounts();
    }

    async removeAccount(accountIdentifier)  {
      console.log("removeAccount()");
      await api.unfollow(this.props.userIdentifier, accountIdentifier);
      await this.getSuggestedAccounts();
      this.props.refreshUserData(this.props.userIdentifier);
    };
  
  
    async followAccount (accountSummary)  {
      console.log("followAccount()");
      await api.follow(this.props.userIdentifier, accountSummary);
      await this.getSuggestedAccounts();
      this.props.refreshUserData(this.props.userIdentifier);
    };
  
    async getSuggestedAccounts(){
      console.log("getSuggestedAccounts()");
      let accounts = await api.findFriends(this.props.userIdentifier, this.props.friendsListData);
      this.setState({suggestedAccounts: accounts});
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
                  <FollowedList 
                    friendsListData={this.props.friendsListData}
                    refreshUserdata = {this.props.refreshUserdata}
                    removeAccount = {this.removeAccount}
                    userIdentifier = {this.props.userIdentifier}
                  />
                </List>
              </nav>
              <div className="font-weight-600 mb-3 text-muted mt-n1">
                  BucketList Suggestions: 
              </div>
                <SuggestionsList 
                  userIdentifier = {this.props.userIdentifier}
                  refreshUserdata = {this.props.refreshUserdata}
                  followAccount = {this.followAccount}
                  suggestedAccounts = {this.state.suggestedAccounts}
                />
              </div>
            </Box>
        );
    }
}

function FollowedList(props) {
  //let friendsListData = props.friendsListData;  
  return (
    <div>
        {props.friendsListData.map(function (friend) {
         
          return (
            <AccountSummary 
              following = {true}
              profile_name = {friend['name']}
              status = {friend['status']}
              key = {friend['userIdentifier']}
              accountIdentifier = {friend['userIdentifier']}
              userIdentifier = {props.userIdentifier}
              refreshUserdata = {props.refreshUserdata}
              removeAccount = {props.removeAccount}
              friendsListData = {props.friendsListData}
            />

          );
        })}
      </div>
    );
};


function SuggestionsList(props) {
  const [accounts, setSuggestedAccounts] = useState(null);
  


  // useEffect( () => {     
  //     console.log("useEffect");
  //     api.findFriends(props.userIdentifier, props.friendsListData).
  //     then(arr => {
  //       setSuggestedAccounts(arr)
  //     });
  // },[]);
  
  return (
    <div>
        { props.suggestedAccounts.map(function (friend) {
          return (
            <AccountSummary 
              following = {false}
              profile_name = {friend['profile_name']}
              status = {friend['status']}
              key = {friend['identifier']}
              accountIdentifier = {friend['identifier']}
              refreshUserdata = {props.refreshUserdata}
              followAccount = {props.followAccount}
              userIdentifier = {props.userIdentifier}
            />
            
          
          );
        }) }
        
      </div>
    );
};

 // async function follow(userIdentifier, accountSummary) {
// {    "name":"David",
//      "status": "happy",
//      "userIdentifier": "asldkfadjf"
//  }
function AccountSummary(props) {
  
  const handleClick = function() {
    const data = {
      name:props.profile_name,
      status: props.status,
      userIdentifier: props.accountIdentifier
    };
    
    props.following ? props.removeAccount(props.accountIdentifier):
      props.followAccount(data);

  };
  return (
    <ListItem alignItems="flex-start" 
            secondaryAction={
                <IconButton 
                  edge="end" 
                  aria-label="person_remove"
                  onClick={handleClick}
                >
                  {props.following ? 
                    <PersonRemoveIcon/>: 
                    <PersonAddIcon/>
                  }
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{bgcolor: deepOrange[500]}} >{props.profile_name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={props.profile_name}
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
                    "{props.status}"
                  </React.Fragment>
                }
              />
            </ListItem>

  );
}

export default PeopleList;