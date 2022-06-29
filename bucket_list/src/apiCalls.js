
function getUserData(userId) {
    let url = 'http://localhost:8080/users/' + userId;
    const data = fetch(url)
      .then(response => response.json());   
    return data;
}; 

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
    removeBucketListItem,
    updateItemStatus

}