const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const areaSchema = new Schema({
  name: {
      type: String,
      unique: true,
      trim: true
  },
  district: {
      type: String,
      trim: true
  },
  division: {
      type: String,
      trim: true
  },
  area: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model( 'Area', areaSchema );
