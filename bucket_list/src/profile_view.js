import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactSVG } from 'react-svg';
import './css/profile.css';

//getUserById("62b62c2b14d8eed1db9ea1a8");


class ProfileTopRow extends React.Component {
    
    render() {
        const user = this.props.user;
        return (
            <div className="row main-top-row-box">
                <div className="main-top-row-div bucket-list col-lg-4">
                    <h2>BucketList</h2>
                    {user.bucket_list.map(function (item) {
                        return (
                          <Item text={item['text']} 
                                completed={item['completed']} />  
                        );}                       
                    )}                  
                </div>
                <div className="main-top-row-div bucket-img-box col-lg-4">
                    <ReactSVG className="bucket-img" src="bucket_image.svg" />
                    <h1 className="name">{user.profile_name}</h1>
                    <h4>status: "{user.status}"</h4>
                </div>
                <div className="main-top-row-div col-lg-4">
                    <h2>My Bucket Buddies</h2> 
                    {user.friends_list.map(function (buddy) {
                        return (<p className="buddy">{buddy}</p>);}                       
                    )}     
                </div>
            </div>                 
        );    
    };
}


class Item extends React.Component {
    //warning says that no constructor is needed here.
    render() {
        let textDecoration = "none";
        if (this.props.completed) {
            textDecoration = "line-through"
        }
        return (
            <p className="item">
                <span className="item-left">
                    <ReactSVG className="bucket-icon" 
                        src="bucket-fill.svg" />
                    <p style = {{textDecoration}}>
                        {this.props.text}</p>
                </span>
                <span className="item-right">
                    {this.props.completed ? 
                        <ReactSVG className="square-icon" 
                        src="check-square.svg" /> :
                        <ReactSVG className="square-icon" 
                        src="square.svg" />
                    } 
                    <ReactSVG className="trash-icon" 
                        src="trash.svg" />
                </span>
            </p>
        );
    }
}


export default ProfileTopRow;
