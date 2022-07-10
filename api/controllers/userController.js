const { User, AccountSummary } = require('../models/user');

// gets all users
// triggered by route: GET /users/
//TODO: 
// 1. Testing 
// 2. Error Handling
const get_all_users = (req, res) => {
    User.find().sort({ createdAt: -1 })
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(400).send(`There is an error in the server while retrieving users.`);
        });
}


//Params:req, res
//Return: gets user by id
//Notes: triggered by route /:id/add-item
//TODO: 
// triggered by route: GET /users/:id
//TODO: 
// 1. Testing 
// 2. Error Handling
const get_user_by_id = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(result => {
            // no matching user
            if(result === null){
                let response = {"message":"no matching user found"};
                res.status(404).send(response);
            }
            else {
                res.status(200).send(result);
            };
        })
        .catch(err => {
            res.status(400).send(err);
        });
}


const addFriend = async (req, res) => {
    console.log("hello?");
    try {
       
        const userIdentifier = req.params.identifier;
        let filter = {"identifier": userIdentifier};
        let newFriendData = req.body;
        let newFriend = AccountSummary(newFriendData);
        const update = {
            $push: {"friends_list": [newFriend]}
        };
        const options = {new: true}; 
        const result = await User.findOneAndUpdate(
            filter, update, options);
        
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

};


//router.get('/:identifier/get-friends', userController.getFriends);
const getFriends = (req, res) => {
    const identifier = req.params.identifier;
    User.findOne({identifier: identifier},
        function(err, result){
            if (err) {
                console.log(err);
            } else {
                if (result === null) {
                    res.send({"message":"no profile matching that identifier"});
                } else {
                    const followed = result.friends_list;
                    res.send(followed );
                };

                    
               
            }
        }
    );
};


const findFriends = async (req, res) => {
    const identifier = req.params.identifier;
    let user = await User.findOne({identifier: identifier});
    //generate friends list
    let friends = [identifier];// starts with self, so self is not included in friend
    // suggestions.
    let length = user.friends_list.length;
    for (let i = 0; i < length; i += 1) {
        let nextFriend = user.friends_list[i].userIdentifier;
        friends.push(nextFriend);
    };
    // find users that are not on the friend list already:
    let suggestions = await User.find({ "identifier": { $nin: friends} });
    res.send(suggestions);

};



// creates new user
// triggered by route: POST /users/
//TODO: 
// 1. Testing 
// 2. Error Handling
const create_user = (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(result => {
            res.status(201).send(result);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};

//update status
//TODO: 
// 1. Testing 
// 2. Error Handling
const updateStatus = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const options = {new: true};
        const result = await User.findByIdAndUpdate(
        userId, updatedData, options);
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
};

//add Item
//TODO: 
// 1. Testing 
// 2. Error Handling
const addLikedItem = async (req, res) => {
    try {
        const userId = req.params.id;
        let newLikedItem = req.body["new_liked_item"];
        newLikedItem['completed'] = 'false';
        const updatedData = {
            $push: { "liked_items": newLikedItem }
        };
        console.log(updatedData);
        const options = {new: true};
        const result = await User.findByIdAndUpdate(
        userId, updatedData, options);
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
};

// deletes user by ID
// triggered by route: DELETE /users/:id
//TODO: 
// 1. Testing 
// 2. Error Handling
const delete_user = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then(result => {
            // no matching user
            if(result === null){
                let response = {"message":"no matching user found"};
                res.status(404).send(response);
            }
            else {
                res.status(200).send(result);
            }
            
        })
        .catch(err => {
            res.status(400).send(err);
        });
}


const get_user_by_identifier = (req, res) => {
    const identifier = req.body.identifier;
    User.findOne({identifier: identifier},
        function(err, result){
            if (err) {
                console.log(err);
            } else {
                if (result === null) {
                    res.send({"message":"no profile matching that identifier"});
                } else {
                    res.send(result);
                };
                    
               
            }
        }
    );
            
};


module.exports = {
    get_all_users,
    get_user_by_id,
    getFriends,
    create_user,
    delete_user,
    addLikedItem,
    updateStatus,
    get_user_by_identifier,
    addFriend,
    findFriends
}

