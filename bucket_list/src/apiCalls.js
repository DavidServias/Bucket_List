

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

function getUserData(userId) {
    let url = 'http://localhost:8080/users/' + userId;
    const data = fetch(url)
      .then(response => response.json());   
    return data;
}; 

async function getUserByIdentifier(identifier) {
    let url = 'http://localhost:8080/users/login';
    let reqBody = JSON.stringify({"identifier": identifier});
    let options = {
        method: 'POST',
        headers: {'Content-Type':'application/json;charset=utf-8'},
        body: reqBody
    };
    var response = await fetch(url,options);
    response = response.json();   
    
    return response;
}

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

async function addBucketListItem(userIdentifier, newItem) {
    console.log("addBucketListItem()");
    let url = "http://localhost:8080/bucket_list/";
    url += userIdentifier + "/add-item";
    let reqBody = JSON.stringify({"text": newItem});
    console.log("test1");
    let options = {
        method: 'PATCH',
        headers: {'Content-Type':'application/json;charset=utf-8'},
        body: reqBody
    };
    var response= await fetch(url, options);
    console.log(response);
    var data = await response.json();
    
    console.log(data);
    
}

async function updateItemStatus(userIdentifier, itemId, completed) {
    console.log("updateItemStatus()");
    let url = "http://localhost:8080/bucket_list/";
    url += userIdentifier + "/" + itemId + "/item-status";
    console.log(url);
    let status = completed ? false:true ;
    const reqBody = JSON.stringify({"completed": status});
    console.log(reqBody);
    let options = {
        method: 'PATCH',
        headers: {'Content-Type':'application/json;charset=utf-8'},
        body: reqBody
    };
    
    await fetch(url, options)
        .then(response => response.json())
        .then(data => console.log(data));
}



// router.get('/:identifier/find_friends', userController.findFriends);
async function findFriends(identifier) {
    let url = 'http://localhost:8080/' + identifier + 'find_friends';
    let options = {
        method: 'GET',
        headers: {'Content-Type':'application/json;charset=utf-8'}
    };
    var response = await fetch(url,options);
    response = response.json();   
    
    return response;
}





export default {
    createUser,
    getUserData,
    getUserByIdentifier,
    removeBucketListItem,
    updateItemStatus,
    addBucketListItem,
    findFriends

}