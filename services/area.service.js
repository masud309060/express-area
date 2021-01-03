const ObjectId = require('mongodb').ObjectID;
const Area = require('../models/Area.model');

module.exports.create = area => {
  return Area.create(area);
}

module.exports.getAreas = (query) => {
  return Area.find(query);
}

module.exports.getAreaById = (id) => {
  return Area.findOne({_id: ObjectId(id)})
}

module.exports.getAreaByIdAndDelete = (id) => {
  return Area.deleteOne({_id: ObjectId(id)})
}

module.exports.getAreaByIdAndUpdate = (id, name, district) => {
  return Area.updateOne({_id: ObjectId(id)},
  {
    $set: { name: name, district: district }
  }
)};