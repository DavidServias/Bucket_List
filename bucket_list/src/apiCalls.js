/*******************************************************
**Function Name: createUser
**Description: creates user on the db. 
**Params: data about the user. 
identifier: assigned automatically when through google.
If the user didn't sign in through google, identifier can be
a random string of letters. Google users numbers. 
Sample:
{
    "profile_name": "Big Bird",
    "status": "I'm a big yellow bird",
    "identifier": "asdlfkjasdwerweravaasdfkj"
}
**Pre-Conditions: na
**Post-Conditions:New User is created on the db
**TODO:
1. Handle errors.
********************************************************/
async function createUser(data) {
    let url = 'http://localhost:8080/users/';
    let reqBody = data;
    let options = {
        method: 'POST',
        headers: {'Content-Type':'application/json;charset=utf-8'},
        body: reqBody
    };
    var response = await fetch(url,options);
    response = response.json();   

    return response;

};



/*******************************************************
**Function Name: getUserByIdentifier(identifier)
**Description: checks args
**Params: both command line args
**Pre-Conditions: na
**Post-Conditions:na
**TODO:
1. Handle errors.
********************************************************/
async function getUserByIdentifier(userIdentifier) {
    let url = 'http://localhost:8080/users/login';
    let reqBody = JSON.stringify({"user_identifier": userIdentifier});
    let options = {
        method: 'POST',
        headers: {'Content-Type':'application/json;charset=utf-8'},
        body: reqBody
    };
    var response = await fetch(url,options);
    response = response.json();   
    
    return response;
}

/*******************************************************
**Function Name: args_are_valid
**Description: checks args
**Params: both command line args
**Pre-Conditions: na
**Post-Conditions:na
**TODO:
1. Handle errors.
********************************************************/
async function removeBucketListItem(userIdentifier, itemId) {
    console.log("removeBucketListItem()");
    let url = "http://localhost:8080/bucket_list/";
    url += userIdentifier + "/" + itemId + "/remove-item";
    let options = {
        method: 'DELETE',
        headers: {'Content-Type':'application/json;charset=utf-8'},
    };
    await fetch(url, options)
        .then(response => response.json())
        .then(data => console.log(data));
}

/*******************************************************
**Function Name: args_are_valid
**Description: checks args
**Params: both command line args
**Pre-Conditions: na
**Post-Conditions:na
**TODO:
1. Handle errors.
********************************************************/
async function addBucketListItem(userIdentifier, newItem) {
    console.log("addBucketListItem()");
    let url = "http://localhost:8080/bucket_list/";
    url += userIdentifier + "/add-item";
    let reqBody = JSON.stringify({"text": newItem});
    let options = {
        method: 'PATCH',
        headers: {'Content-Type':'application/json;charset=utf-8'},
        body: reqBody
    };
    var response= await fetch(url, options);
    var data = await response.json();
    
   
}


/*******************************************************
**Function Name: args_are_valid
**Description: checks args
**Params: both command line args
**Pre-Conditions: na
**Post-Conditions:na
**TODO:
1. Handle errors.
********************************************************/
async function updateItemStatus(userIdentifier, itemId, completed) {
    console.log("updateItemStatus()");
    let url = "http://localhost:8080/bucket_list/";
    url += userIdentifier + "/" + itemId + "/item-status";
    let status = completed ? false:true ;
    const reqBody = JSON.stringify({"completed": status});
    let options = {
        method: 'PATCH',
        headers: {'Content-Type':'application/json;charset=utf-8'},
        body: reqBody
    };
    
    await fetch(url, options)
        .then(response => response.json())
        .then(data => console.log(data));
}



/*******************************************************
**Function Name: args_are_valid
**Description: checks args
**Params: both command line args
**Pre-Conditions: na
**Post-Conditions:Returns an array of account_summaries
**TODO:
1. Handle errors.
********************************************************/
// router.get('/:user_identifier/find_friends', userController.findFriends);
async function findFriends(userIdentifier) {
    console.log("findFriends()");
    let url = 'http://localhost:8080/users/' + userIdentifier + '/find_friends';
    let options = {
        method: 'GET',
        headers: {'Content-Type':'application/json;charset=utf-8'}
    };
    var response = await fetch(url,options);
    response = await response.json();
    let responseArr = [];
    let nextSuggestion = {};
    for (let i=0; i< response.length; i+= 1) {
        nextSuggestion = {};
        nextSuggestion.account_summary_name = response[i].profile_name;
        nextSuggestion['account_summary_status'] = response[i].status;
        nextSuggestion['account_identifier'] = response[i].user_identifier;
        responseArr.push(nextSuggestion);
    }
    // console.log("response from findFriends: ****************************");
    // console.log(responseArr);
    return responseArr;
}


// const AccountSummarySchema = new Schema({
//     name: {type: String, required: true},
//     status: {type: String, required: true},
//     userIdentifier: {type: String, required: true}
//   })

// router.patch('/:user_identifier/follow', userController.follow);
// sample accountSummary 
// {    "name":"David",
//      "status": "happy",
//      "userIdentifier": "asldkfadjf"
//  }
/*******************************************************
**Function Name: args_are_valid
**Description: checks args
**Params: both command line args
**Pre-Conditions: na
**Post-Conditions:na
**TODO:
1. Handle errors.
********************************************************/
async function follow(userIdentifier, accountSummary) {
    console.log("follow()");
    let url = "http://localhost:8080/users/";
    url += userIdentifier + "/follow";
    let reqBody = JSON.stringify(accountSummary);
    console.log("from controller: " + reqBody)
    let options = {
        method: 'PATCH',
        headers: {'Content-Type':'application/json;charset=utf-8'},
        body: reqBody
    };
    var response= await fetch(url, options);
    var data = await response.json();
    
    
}


/*******************************************************
**Function Name: args_are_valid
**Description: checks args
**Params: both command line args
**Pre-Conditions: na
**Post-Conditions:na
**TODO:
1. Handle errors.
********************************************************/
async function unfollow(userIdentifier, accountToUnfollow) {
    console.log("unfollow()");
    let url = "http://localhost:8080/users/";
    url += userIdentifier + "/unfollow";
    let reqBody = '{"accountToUnfollow": "'+accountToUnfollow+'"}';
    let options = {
        method: 'DELETE',
        headers: {'Content-Type':'application/json;charset=utf-8'},
        body: reqBody
    };
    var response= await fetch(url, options);
    var data = await response.json();
    
}


export default {
    createUser,
    getUserByIdentifier,
    removeBucketListItem,
    updateItemStatus,
    addBucketListItem,
    findFriends,
    follow,
    unfollow

}