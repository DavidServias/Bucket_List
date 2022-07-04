import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactSVG } from 'react-svg';
import './css/profile.css';
import BucketList from './bucket_list';


class MyProfileView extends React.Component {
    render() {
        const user = this.props.user;
        return (
            <div className="row main-top-row-box">
                <div className="main-top-row-div bucket-list col-lg-4">
                    <h2>BucketList</h2>
                    <BucketList 
                        userId = {this.props.userId}
                        bucketListData = {this.props.bucketListData}
                        updateUser = {this.props.updateUser}
                    />
                </div>
                <div className="main-top-row-div bucket-img-box col-lg-4">
                    <ReactSVG className="bucket-img" src="bucket_image.svg" />
                    <h1 className="name">{this.props.profileName}</h1>
                    <h4>status: "{this.props.status}"</h4>
                </div>
                <div className="main-top-row-div col-lg-4">
                    <h2>My Bucket Buddies</h2> 
                    {this.props.friendsListData.map(function (buddy) {
                        return (<p className="buddy">{buddy}</p>);}                       
                    )}     
                </div>
            </div>                 
        );    
    };
}


export default MyProfileView;
