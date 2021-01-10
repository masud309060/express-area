const userService = require('../services/user.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.authenticated = async (req, res, next) => {
  try {
    const verified = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    console.log("varified", verified);
    if(!verified) {
      res.status(404).json({error: true, data: null, token: null, message: "User not authenticated."})
    }
    next();
  } catch (e) {
    res.status(500).json({error: e, data: null, message:"Something went wrong"})
  }
}

const hashPassword = (password, saltRound) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRound, (err, hash) => {
      if(err) reject(err);
      resolve(hash)
    })
  })
}

module.exports.register = async (req, res, next) => {
  try {
    const { body } = req;
    const saltRound = bcrypt.genSaltSync(10);
    // console.log("saltRound",saltRound);

    body.password = await hashPassword(body.password, saltRound);
    const user = await userService.createUser(body);
    console.log("user", user);
    const userObj = JSON.parse(JSON.stringify(user)); // bson to json
    delete userObj.password;
    // console.log(userObj)

    const token = await jwt.sign({
      data: userObj
    }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });
    // console.log("token", token)

    return res.status(200).json({error: false, data: null, token: token, message: 'Register complited.'})

  } catch (e) {
    return res.status(500).json({error: e, data: null, token: null, message:'Something went wrong'})
  }
};



const comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, match) => {
      if(err) reject(err);
      resolve(match);
    })
  })
}

module.exports.login = async (req, res, next) => {
  try {
    const user = await userService.findUserByEmail(req.body.email);
    const matchPassword = await comparePassword(req.body.password, user.password);
    // console.log(matchPassword);

    if(!matchPassword) {
      return res.status(400).json({error: false, data: null, token: null, message: "User credentials didn\'t matched."})
    }
    const userObj = JSON.parse(JSON.stringify(user));
    delete userObj.password;

    const token = await jwt.sign({
      data: userObj
    }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    return res.status(200).json({error: false, data: null, token: token, message: 'Login Succesfull'});
    
  } catch (e) {
    return res.status(500).json({error: e.message, data: null, token: null, message: 'Something went wrong controller.'})
  }
};