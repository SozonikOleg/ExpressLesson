const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  uniqId: { type: String, unique: true },
  userName: String,
  email: String,
  id: {},
  comments: [Schema.Types.String],
});

const commentsSchema = new Schema({
  id: {},
  userId: String,
  text: String,
});

const User = mongoose.model('user', userSchema);
const Comments = mongoose.model('comments', commentsSchema);

module.exports = {
  User,
  Comments,
};
