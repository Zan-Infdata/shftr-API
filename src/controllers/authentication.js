const passport = require("passport");
const { AuthManager } = require("../models/lib");


async function login(req, res) {

    let out = {};
    if (!req.body.uname || !req.body.pwd){
        
        res.status(400).json({"message": "All fields are required"});
    }
    else
      passport.authenticate("local", (err, user, info) => {

        if (err){
            out.CODE = 500;
            out.DATA = { "message": err.message };
        } 
        if (user){
            out.CODE = 200;

            let jwt = AuthManager.generateJwt(user);
            out.DATA = {"token": jwt};           
        }
        else {
            out.CODE = 401;
            out.DATA = { "message": info.message }; 
        } 
        res.status(out.CODE).json(out.DATA);

      })(req, res);
  };


module.exports = {
    login,
};