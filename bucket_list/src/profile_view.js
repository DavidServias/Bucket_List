import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './css/profile_view.css';
import BucketList from './bucket_list';
import PeopleList from './people_list';
import AboutMe from './about_me';
import Box from '@mui/material/Box';

// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

class ProfileView extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        
        return (
            <Box  sx={{ height: '500px', }}>
            <Grid container spacing={0}>
                {/* sidebar */}
                <Grid item sm={2} xs={12} order={{sm:0, xs: 1}} sx={{height:'500px'}} >
                <Item sx={{backgroundColor: "blue"}} >Sidebar</Item>
                </Grid>
                {/* main panel */}
                <Grid item sm={10} xs={12} order={{md:1, xs: 0}}>
                    <Grid container spacing={0} justifyContent="space-between">
                        {/* header */}
                        <Grid item xs={12} alignItems="center" >
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <AboutMe 
                                status = {this.props.status}
                                userIdentifier = {this.props.userIdentifier}
                                refreshUserData = {this.props.refreshUserData}
                            />
                        </Grid>
                        <Grid item sm={9} xs={12}>
                        <BucketList 
                            userIdentifier = {this.props.userIdentifier}
                            bucketListData = {this.props.bucketListData}
                            refreshUserData = {this.props.refreshUserData}
                            profileName = {this.props.profileName}
                            test = "test"
                        />  
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Item>{this.props.profileName}'s Deep Thoughts</Item>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                        <PeopleList 
                            userIdentifier = {this.props.userIdentifier}
                            friendsListData = {this.props.friendsListData}
                            refreshUserData = {this.props.refreshUserData}
                            profileName = {this.props.profileName}
                            test = "test"
                        />  
                        </Grid>
                    </Grid>
                
                </Grid>
                
            </Grid> 
            
        
            </Box>
        );
  }
    
}

export default ProfileView;