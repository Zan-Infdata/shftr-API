const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { EntityData, SyUser } = require("../models/db");
const { AuthManager } = require("../models/lib");


passport.use(
    new LocalStrategy(
      {
        usernameField: "uname",
        passwordField: "pwd",
      },
      async (username, password, cbDone) => {


        raw_response = await EntityData.getSyUserByName(username);

        resp = raw_response.DATA[0];

        if(resp == null){
            return cbDone(null, false, { message: "User not found" });
        }


        if (raw_response.CODE == 200){

            let pwdCheck = AuthManager.validatePassword(password, resp[SyUser.salt], resp[SyUser.hash]);

            // check password
            if (!pwdCheck){
                return cbDone(null, false, { message: "Invalid password" });

            }
            else return cbDone(null, resp);

        }

        return cbDone(null, false, { message: "Server error" });


        }
      
    )
  );