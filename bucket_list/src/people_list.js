import React from 'react';
// import { useState } from "react";
// import { useEffect } from 'react';
import { Component } from 'react';
import './css/profile.css';
//import Box from '@mui/material/Box';
import api from './apiCalls';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { deepOrange } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Decorator from './card_decorator.js';


// PROPS:
// userIdentifier 
// friendsListData 
// refreshUserData 
// profileName
// guestView 
// viewGuestProfile()
export class PeopleList extends Component {
    constructor(props) {
        super(props);
        this.followAccount = this.followAccount.bind(this);
        this.getSuggestedAccounts = this.getSuggestedAccounts.bind(this);
        this.addItemPlaceholderText = "Add an Item to Your Bucket List";
        this.removeAccount = this.removeAccount.bind(this);
        this.state = {
          newItem: "",
          followedAccounts: [],
          suggestedAccounts: [], };
    }

    async componentDidMount() {  
      // initialize followedAccounts()
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
      console.log("suggestedAccounts");
      console.log(accounts);
      this.setState({suggestedAccounts: accounts});
    }
    
    render(){
        return ( 
            <Decorator>
              <div id="people-list-container">
              <div id="people_list">
              <div className="heading">Following</div>
            <List >
              <FollowedList 
                data={this.props.friendsListData}
                refreshUserdata = {this.props.refreshUserdata}
                removeAccount = {this.removeAccount}
                userIdentifier = {this.props.userIdentifier}
                guestView = {this.props.guestView}
                // visitProfile = {this.props.visitProfile}
                viewGuestProfile = {this.props.viewGuestProfile}
              />
            </List>  
            
            {this.props.guestView ? null:
            //render account suggestions, if user is looking at they're
            // own profile
            <div>
              <Divider />
                <div className="heading2">
                    BucketList Suggestions: 
                </div>
                <SuggestionsList 
                    userIdentifier = {this.props.userIdentifier}
                    refreshUserdata = {this.props.refreshUserdata}
                    followAccount = {this.followAccount}
                    data = {this.state.suggestedAccounts}
                />
            </div>
            }
            
              </div>
            </div>
            </Decorator>

        );
    }
}

// PROPS:
// data={this.props.friendsListData}
// refreshUserdata = {this.props.refreshUserdata}
// removeAccount = {this.removeAccount}
// userIdentifier = {this.props.userIdentifier}
// guestView = {this.props.guestView}
// viewGuestProfile = {this.props.viewGuestProfile}
function FollowedList(props) {
  console.log("followedList():");
  console.log(props.data);
  return (
    <div>
        {!props.data ? <h1>Loading</h1>:
          props.data.map(function (friend) {
         
          return (
            <AccountSummary 
              following = {true}
              accountSummaryName = {friend['account_summary_name']}
              accountSummaryStatus = {friend['account_summary_status']}
              key = {friend['account_identifier']}
              accountIdentifier = {friend['account_identifier']}
              userIdentifier = {props.userIdentifier}
              refreshUserdata = {props.refreshUserdata}
              removeAccount = {props.removeAccount}
              friendsListData = {props.friendsListData}
              guestView = {props.guestView}
              // visitProfile = {props.visitProfile}
              viewGuestProfile = {props.viewGuestProfile}
            />

          );
        })}
      </div>
    );
};


function SuggestionsList(props) {
  return (
    <div>
     
      <List>
      { !props.data ? <h1>Loading</h1>:
          props.data.map(function (friend) {
          return (
            <AccountSummary 
              following = {false}
              accountSummaryName = {friend['account_summary_name']}
              accountSummaryStatus = {friend['account_summary_status']}
              key = {friend['account_identifier']}
              accountIdentifier = {friend['account_identifier']}
              refreshUserdata = {props.refreshUserdata}
              followAccount = {props.followAccount}
              userIdentifier = {props.userIdentifier}
              // visitProfile = {props.visitProfile}
            /> 
          
          );
        }) 
        }
        

      </List>
        
      </div>
    );
};

 
//PROPS:
// following
// accountSummaryName 
// accountSummaryStatus 
// key 
// accountIdentifier
// userIdentifier 
// refreshUserdata 
// removeAccount 
// friendsListData 
// guestView 
//  visitGuestProfile()
function AccountSummary(props) {

  
  function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  } 
  
  function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();
  
    return "00000".substring(0, 6 - c.length) + c;
  }

  let iconColor = intToRGB(hashCode(props.accountSummaryName) );
  iconColor = "#" + iconColor;

  
  
  const handleClick = function() {
    console.log(props.accountIdentifier);//undefined
    const data = {
      account_summary_name:props.accountSummaryName,
      account_summary_status: props.accountSummaryStatus,
      account_identifier: props.accountIdentifier
    };
    
    props.following ? props.removeAccount(props.accountIdentifier):
      props.followAccount(data);

  };
  
  const visitProfile = function () {
    console.log("visiting " + props.accountIdentifier );
    props.viewGuestProfile(props.accountIdentifier);
  }
  
  return (
    
    <ListItem alignItems="flex-start" 
        secondaryAction= 
            
            {props.guestView ? "": 
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
          
          <ListItemButton onClick={visitProfile}>
              <ListItemAvatar>
                <Avatar sx={{bgcolor: iconColor /*deepOrange[500]*/}} >{props.accountSummaryName[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={props.accountSummaryName}
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
                    "{props.accountSummaryStatus}"
                  </React.Fragment>
                }
              />
              </ListItemButton>
            </ListItem>

  );
}



export default PeopleList;