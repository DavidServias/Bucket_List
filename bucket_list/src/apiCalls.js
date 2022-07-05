
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
    var data = await fetch(url,options);
    data = data.json();   
    
    return data;
}

async function removeBucketListItem(userId, itemId) {
    console.log("removeBucketListItem()");
    let url = "http://localhost:8080/bucket_list/";
    url += userId + "/" + itemId + "/remove-item";
    let options = {
        method: 'DELETE',
        headers: {'Content-Type':'application/json;charset=utf-8'},
    };
    await fetch(url, options)
        .then(response => response.json())
        .then(data => console.log(data));
}

async function addBucketListItem(userId, newItem) {
    console.log("addBucketListItem()");
    let url = "http://localhost:8080/bucket_list/";
    url += userId + "/add-item";
    let reqBody = JSON.stringify({"text": newItem});
    let options = {
        method: 'PATCH',
        headers: {'Content-Type':'application/json;charset=utf-8'},
        body: reqBody
    };
    await fetch(url, options)
        .then(response => response.json())
        .then(data => console.log(data));
}

async function updateItemStatus(userId, itemId, completed) {
    console.log("updateItemStatus()");
    let url = "http://localhost:8080/bucket_list/";
    url += userId + "/" + itemId + "/item-status";
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


export default {
    getUserData,
    getUserByIdentifier,
    removeBucketListItem,
    updateItemStatus,
    addBucketListItem

}