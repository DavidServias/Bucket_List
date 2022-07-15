//import { Container } from '@mui/system';
import React from 'react';
import { useState } from 'react';
import './css/profile_view.css';
import ProfilePic from './profile_pic.png';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import api from './apiCalls';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import Decorator from './card_decorator.js';


// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#a7ce3b',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));


function AboutMe(props) {
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [newStatus, setNewStatus] = useState("");

    const handleChange = (e) => {
        setNewStatus(e.target.value);
    };
    
    const toggleUpdatingState = function () {
        setUpdatingStatus(updatingStatus ? false: true);
    };

    const handleClickAway = function () {
        setNewStatus("");
        setUpdatingStatus(updatingStatus ? false: true);
    }


    
    const updateStatus = function() {
        api.updateStatus(props.userIdentifier, newStatus);
        setUpdatingStatus(false);
        props.refreshUserData(props.userIdentifier);


    };

    return (
        <Decorator>
<Grid container id="about-me-container">
            <Grid item xs={12}>
                <Container maxWidth="xs">
                    <img 
                        alt="Profile Picture" 
                        src={ProfilePic}    
                    />
                </Container>
            </Grid>
            <Grid item xs={12}>
                <div className="font-weight-600 mb-3 text-muted mt-n1">
                    <p>Status:</p>
                    <p>"{props.status}"</p> 
                </div>
            </Grid>
            <Grid item xs={12}>
            {updatingStatus ? 
                
                <ClickAwayListener onClickAway={handleClickAway}>
                    <TextField

                        fullWidth 
                        margin="none"
                        label={"Update Status"}
                        value={newStatus} 
                        placeholder={updateStatus} 
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton>
                                    <AddIcon onClick = {updateStatus}/>
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                    />
                </ClickAwayListener>
                
                : 
                <Button variant="outlined" 
                    startIcon={<EditIcon />}
                    onClick = {toggleUpdatingState}
                   sx={{backgroundColor: "#F8961E"}}
                >Update Status</Button>
            }
            </Grid>
        </Grid>
        </Decorator>
        
        // <div id="about-me-container">
            
        
        

    );
};

export default AboutMe;



