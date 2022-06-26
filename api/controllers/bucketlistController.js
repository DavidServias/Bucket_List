const { User } = require('../models/user');
const { Item } = require('../models/user');


//add Item
//TODO: 
// 1. Testing 
// 2. Error Handling
// request example:
// {
//        "item_text": "My new bucket list item"
// }
const addItem = async (req, res) => {
    try {
        const userId = req.params.id;
        const newItem = Item(req.body);
        const updatedData = {
            $push: { "bucket_list": newItem }
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


module.exports = {
    addItem
}

