const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model( 'User', userSchema );