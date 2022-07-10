const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  text: {type: String, required: true},
  likes: {type: [String], required: false},
  completed: {type: Boolean, required: false}
});

const AccountSummarySchema = new Schema({
  name: {type: String, required: true},
  status: {type: String, required: true},
  userIdentifier: {type: String, required: true}
})

const UserSchema = new Schema({
    profile_name: { type: String, required: true },
    bucket_list: { type: [ItemSchema], required: false },
    friends_list: { type: [AccountSummarySchema], required: false},
    liked_items: { type: [String], required: false },
    status: { type: String, default: "", required: false},
    deep_thoughts: { type: [String], required: false },
    identifier: { type: String, required: false},
    google_verified: {type: Boolean, default: false, required: true},
    logged_in: {type: Boolean, default: false, required: false},
    password: {type: String, required: false}
  }, {
    timestamps: true,
  });

const User = mongoose.model('User', UserSchema);
const Item = mongoose.model('Item', ItemSchema);
const AccountSummary = mongoose.model('AccountSummary', AccountSummarySchema);

module.exports = {User, Item, AccountSummary};