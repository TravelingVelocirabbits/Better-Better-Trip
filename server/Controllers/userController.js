const User = require('../Models/userModel')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const jwt = require('jsonwebtoken')
const secret = 'afafaef234234';
const cookieParser = require('cookie-parser')

const userController = {};

userController.signUp = async (req, res, next) => {
    const {username, password} = req.body;
  try{
    const userDoc = await User.create({
      username, 
      password: bcrypt.hashSync(password, salt)});
    res.locals.userDoc = userDoc;
    return next()
  }catch(err){
    return next({log:'sign up controller failed',
                 message:{err}        
        })
  }
}
userController.login = async (req, res, next) => {
  const {username, password} = req.body;
  try{
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if(passOk) {
      //logged in
      jwt.sign({username, id:userDoc._id}, secret, {}, (err, token) => {
        if(err) throw err;
        res.cookie('token', token).json({
          id:userDoc._id,
          username,
        });
        return next()
      })
    }else{
      res.status(400).json('wrong credentials')
    }
  }catch(err){
    return next({log:'login controller failed',
                 message:{err} })
  }
}

userController.checkProfile =  (req, res, next) => {
    const {token} = req.cookies;
    
       jwt.verify(token, secret, {}, (err, info)=>{
          if(err){
              res.status(400).json('Error in jwt verify')
          } else {
              res.status(200).json(info)
              return next()
          }
      })
    } 

userController.logOut = (req, res) => {
    res.cookie('token', '').json('cookie reset ok')
}




module.exports = userController