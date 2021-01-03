const areaService = require('../services/area.service')

module.exports.create = async (req, res, next) => {
  try {
    const area = await areaService.create(req.body);
    return res.status(201).json(area)
  } catch (e) {
    console.error(e);
    return res.status(505).json({message: `Something went wrong. ${e}.`})
  }
}

/* get all data from area */
module.exports.getAreas = async (req, res, next) => {
  try {
    const areas = await areaService.getAreas({});
    return res.status(200).json({status: 200, data: areas, message: "successfully areas retrieved."})
  } catch (e) {
    console.error(e);
    return res.status(505).json({message: `Something went wrong. ${e}.`})
  }
}

/* get area data by id */
module.exports.getAreaById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const area = await areaService.getAreaById(id)
    return res.status(200).json({status:200, data: area, message: "Successfully area data find."})
  } catch (e) {
    console.error(e);
    return res.status(505).json({message: `Something went wrong. ${e}.`})
  }
}

/* get area data by id and delete */
module.exports.getAreaByIdAndDelete = async (req, res, next) => {
  const id = req.params.id;
  try {
    const area = await areaService.getAreaByIdAndDelete(id);
    return res.status(200).json({status: 200, data: area, message: 'Successfullt delete data'})
  } catch (e) {
    console.error(e)
    return res.status(404).json({status: 404, message: `Something went wrong ${e}`})
  }
}
/* get area data by id and update */
module.exports.getAreaByIdAndUpdate = async (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const district = req.body.district;
  try {
    const updateArea = await areaService.getAreaByIdAndUpdate(id, name, district);
    return res.status(200).json({status: 200, data: updateArea, message: 'Successfullt update data'})
  } catch (e) {
    console.error(e)
    return res.status(404).json({status: 404, message: `Something went wrong ${e}`})
  }
}