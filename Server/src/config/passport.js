import passport from "passport"
import passportJwt from 'passport-jwt'
import env from "../config/vars"
import User from "../api/service/UserService"

var JwtStrategy = passportJwt.Strategy,
    ExtractJwt = passportJwt.ExtractJwt;
var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = env.sercet
    
    passport.use('jwt',new JwtStrategy(opts,async (jwt_payload, next)=> {
        try {
            let user= await User.findUserById({id: jwt_payload.id});
      
            return next(null, user);

        } catch (error) {
           
            return next(error, false);
        }
     
          
    
    })); 