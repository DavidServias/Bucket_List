import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/profile_view.css';
import BucketList from './bucket_list';

export class ProfileView extends React.Component {

    render() {
        console.log("profileView props: " + this.props);
        return (
<div className="container">
    <div className="profile">
        <ProfileHeader  
            setUserToNull = {this.props.setUserToNull}
        />
        
        <div className="profile-container">
            <ProfileSiderBar 
                profileName = {this.props.profileName}
                status = {this.props.status}
            />
            
            <div className="profile-content">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="tab-content p-0">
                            <div className="tab-pane fade active show" id="profile-followers">
                                <div className="list-group">
                                    <BucketList 
                                        userIdentifier = {this.props.userIdentifier}
                                        bucketListData = {this.props.bucketListData}
                                        refreshUserData = {this.props.refreshUserData}
                                        profileName = {this.props.profileName}
                                    />
                                    
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

        );
        }
}


class ProfileHeader extends React.Component {
    render() {
        return (
            <div className="profile-header">
            <div className="profile-header-cover"></div>
            <div className="profile-header-content">
                <div className="profile-header-img">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
                </div>
                <ul className="profile-header-tab nav nav-tabs nav-tabs-v2">
                    <li className="nav-item">
                        <a href="#profile-post" className="nav-link" data-toggle="tab">
                            <div className="nav-field">Total Items</div>
                            <div className="nav-value">382</div>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#profile-followers" className="nav-link active" data-toggle="tab">
                            <div className="nav-field">Completed</div>
                            <div className="nav-value">1.3m</div>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#profile-media" className="nav-link" data-toggle="tab">
                            <div className="nav-field">Remaining</div>
                            <div className="nav-value">1,397</div>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#profile-media" className="nav-link" data-toggle="tab">
                            <div className="nav-field">Buddies</div>
                            <div className="nav-value">120</div>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#profile-followers" className="nav-link" data-toggle="tab">
                            <div className="nav-field">Likes</div>
                            <div className="nav-value">2,592</div>
                        </a>
                    </li>
                    <li><button onClick={this.props.setUserToNull}>Sign Out</button></li>
                </ul>
            </div>
        </div>

        );
    }
}


class ProfileSiderBar extends React.Component {
    render() {
        return (
            <div className="profile-sidebar">
                <div className="desktop-sticky-top">
                    {/* <h4>{this.props.profileName}</h4> */}
                    <div className="font-weight-600 mb-3 text-muted mt-n1">{this.props.profileName}'s status:
                        <br></br>"{this.props.status}"
                    </div>
                    <div className="font-weight-600 mb-3 text-muted mt-n1">{this.props.profileName}'s status:
                        <br></br>"{this.props.status}"
                    </div>
                    <div className="font-weight-600 mb-3 text-muted mt-n1">{this.props.profileName}'s status:
                        <br></br>"{this.props.status}"
                    </div>
                    <div className="font-weight-600 mb-3 text-muted mt-n1">{this.props.profileName}'s status:
                        <br></br>"{this.props.status}"
                    </div>
                </div>
            </div>

        );
    }
}

export default ProfileView;