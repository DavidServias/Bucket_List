const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  text: {type: String, required: true},
  likes: {type: [String], required: false}
});

const UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    bucket_list: { type: [ItemSchema], required: false },
    friends_list: { type: [String], required: false},
    liked_items: { type: [String], required: false },
    status: { type: String, required: false}
  }, {
    timestamps: true,
  });

const User = mongoose.model('User', UserSchema);
const Item = mongoose.model('Item', ItemSchema);

module.exports = {User, Item};