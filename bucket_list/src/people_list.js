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
        
        this.state = {
          newItem: "",
          followedAccounts: [],
          suggestedAccounts: [], };

    }

    async componentDidMount() {
      
      // initialize followedAccounts()
      await this.getSuggestedAccounts();
  
      
    }

    followedAccounts() {
      // let followedAccounts = [];
      // let summary = {};
      // for (let i = 0; i < this.props.friendsListData.length; i += 1) {
      //   summary['account_summary_name']
      // }

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
        // console.log("From people's list:********************************** ");
        // console.log("suggested: ");
        // console.log(this.state.suggestedAccounts);
        // console.log("within peopleList********************, friendsListData:");
        // console.log(this.props.friendsListData);//PROBLEM only Identifier included
     
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
                    data={this.props.friendsListData}
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
                  data = {this.state.suggestedAccounts}
                />
              </div>
            </Box>
        );
    }
}

function FollowedList(props) {
  //let friendsListData = props.friendsListData;  
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
            />

          );
        })}
      </div>
    );
};


function SuggestionsList(props) {
  //const [accounts, setSuggestedAccounts] = useState(null);
  


  // useEffect( () => {     
  //     console.log("useEffect");
  //     api.findFriends(props.userIdentifier, props.friendsListData).
  //     then(arr => {
  //       setSuggestedAccounts(arr)
  //     });
  // },[]);
  // console.log("inside SuggestionsList: ");
  // console.log(props.data);
  return (
    <div>
        { !props.data ? <h1>Loading</h1>:
          props.data.map(function (friend) {
        
          // console.log("suggestedList component:");
          // console.log(friend.account_identifier);//works
          // console.log(friend.accountIdentifier);//undefined

          // console.log(friend['account_identifier']);//works


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
            />
            
          
          );
        }) }
        
      </div>
    );
};

 // async function follow(userIdentifier, accountSummary) {
// {    "name":"David",
//      "status": "happy",
//      "account_identifier": "asldkfadjf"
//  }
function AccountSummary(props) {
  
  const handleClick = function() {
    console.log(props.accountIdentifier);//undefined
    const data = {
      account_summary_name:props.accountSummaryName,
      account_summary_status: props.accountSummaryStatus,
      account_identifier: props.accountIdentifier
    };
    // console.log("data sent from component: " + JSON.stringify(data));
    
    props.following ? props.removeAccount(props.accountIdentifier):
      props.followAccount(data);

  };
  try {
    // //console.log("accountSummary check++++++++++++++++++++++++++++++++++");
    // console.log(props.accountIdentifier);
    // console.log(props.accountSummaryName);
    // console.log(props.accountSummaryStatus);
  }
  catch {
    console.log("error in accountSummary");
  }

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
                <Avatar sx={{bgcolor: deepOrange[500]}} >{props.accountSummaryName[0]}</Avatar>
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
            </ListItem>

  );
}

export default PeopleList;