const { User } = require('../models/user');
const { Item } = require('../models/user');
const {userRoutes} = require('../routes/userRoutes.js');


//Params:req, res
//Return: adds an item to user's bucket list
//Notes: triggered by route /:id/add-item
//TODO: 
// 1. Testing 
// 2. Error Handling
const addItem = async (req, res) => {
    try {
        const userId = req.params.id;
        let newItemInfo = req.body;
        newItemInfo['completed'] = "false";
        let newItem = Item(newItemInfo);
        const updatedData = {
            $push: {"bucket_list": [newItem]}
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


//Params:req, res
//Return: updates an item's status on the database
//Notes: 
// responds to route: '/:userId/:itemId/item-status' 
// TODO: respond to errors
const updateItemStatus = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const itemId = req.params.item_id;
    
        let user = await User.findById(req.params.user_id);
        let item = user.bucket_list.id(itemId);
        item.completed = req.body['completed'];
        user.save(function (err) {
            if (err) return handleError(err)
            console.log('Success!');
          });
        
        res.send(user);
          
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
};


//Params:req, res
//Return: remove item from user's bucket list
//Notes: 
// responds to route: '/:userId/:itemId/remove-item' 
// TODO: respond to errors
const removeItem = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const itemId = req.params.item_id;
    
        let user = await User.findById(req.params.user_id);
        user.bucket_list.id(itemId).remove();
        user.save(function (err) {
            if (err) return handleError(err)
            console.log('Success!');
          });
        
        res.send(user);
          
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
};


module.exports = {
    addItem,
    updateItemStatus,
    removeItem
}

