const express = require('express');
const { route } = require('.');
const router = express.Router();
const areaController = require('../controller/area.controller');
const userController = require('../controller/user.controller');

// Get Area's listening *** 
router.post('/', userController.authenticated, areaController.create);
router.get('/',  areaController.getAreas); // get all data 
router.get('/:id', areaController.getAreaById);
router.delete('/:id', userController.authenticated, areaController.getAreaByIdAndDelete);
router.patch('/:id', userController.authenticated, areaController.getAreaByIdAndUpdate);

module.exports = router;


/* 
[
    {
    name: "Dhanmondi",
    district: "Dhaka",
    division: "Dhaka",
    area: 4.34,
  },
    {
    name: "Homna",
    district: "Cumilla",
    division: "Chittagang",
    area: 180.1,
  },
    {
    name: "Titus",
    district: "Cumilla",
    division: "Chittagang",
    area: 125.7,
  },
    {
    name: "Tungipara",
    district: "Gopalganj",
    division: "Dhaka",
    area: 127.2,
  },
  
] */