const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String

});
const User = mongoose.model('user', userSchema);

const github = new Schema({
    username: String,
    gitID: String
});


const GitUser = mongoose.model('git', github);

module.exports = User;
// module.exports = GitUser;