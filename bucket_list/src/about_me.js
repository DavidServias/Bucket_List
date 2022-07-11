//import { Container } from '@mui/system';
import React from 'react';
import './css/profile_view.css';
import ProfilePic from './profile_pic.png';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

function AboutMe (props) {
    return (
        <div id="about-me-container">
            
            <img 
                alt="Profile Picture" 
                src={ProfilePic}
                
            />
            <div className="font-weight-600 mb-3 text-muted mt-n1">
                <p>Status:</p>
                <p>"{props.status}"</p> 
            </div>
            <Button variant="outlined" startIcon={<EditIcon />}>
                Update Status
            </Button>
            
        
        </div>
        

    );
};

export default AboutMe;



