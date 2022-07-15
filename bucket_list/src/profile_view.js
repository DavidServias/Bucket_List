import React from 'react';
import './css/profile_view.css';
import MyAppBar from './app_bar.js';
import BucketList from './bucket_list';
import PeopleList from './people_list';
import AboutMe from './about_me';
import Box from '@mui/material/Box';
import DeepThoughts from './deep_thoughts';
import Grid from '@mui/material/Grid';
import Decorator from './card_decorator.js';


class ProfileView extends React.Component {
    constructor(props){
        super(props);
    }
    render(){  
        return (
            <Box  sx={{ width: '100%', backgroundColor:'#577590' }}>
                    <MyAppBar setUserToNull = {this.props.setUserToNull}/>
                    <Grid container 
                        spacing={1}                 
                        justifyContent="space-around"
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={3} >
                            <AboutMe 
                                status = {this.props.status}
                                userIdentifier = {this.props.userIdentifier}
                                refreshUserData = {this.props.refreshUserData}
                            />
                        
                            
                        </Grid>
                        <Grid item xs={12} sm={9}   >
                        {/* <Decorator>Test</Decorator>  */}
                        <BucketList 
                            userIdentifier = {this.props.userIdentifier}
                            bucketListData = {this.props.bucketListData}
                            refreshUserData = {this.props.refreshUserData}
                            profileName = {this.props.profileName}
                            
                        />  
                        </Grid>
                        <Grid item xs={12} sm={9}   >
                           {/* <Decorator>Test</Decorator> */}
                            <DeepThoughts 
                                userIdentifier = {this.props.userIdentifier}
                                deepThoughts = {this.props.deepThoughts}
                                refreshUserData = {this.props.refreshUserData}
                                profileName = {this.props.profileName}
                           
                            />
                        </Grid>
                        <Grid item sm={3} xs={12}>
                        {/* <Decorator>Test</Decorator> */}
                        <PeopleList 
                            userIdentifier = {this.props.userIdentifier}
                            friendsListData = {this.props.friendsListData}
                            refreshUserData = {this.props.refreshUserData}
                            profileName = {this.props.profileName}
                            test = "test"
                        />  
                        </Grid>
                    </Grid>
            </Box>
        );
    }
    
}

export default ProfileView;