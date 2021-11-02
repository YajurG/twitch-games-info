const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");

const db = require("../models")
const User = db.user;

module.exports = (passport) => {
        passport.use("signin", new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            session: false
        }, async (username, password, done) => {
                try {
                    let user = await User.findOne({username: username});
                    if (!user) {
                        return done(null, false, {message: "Username not found"});
                    }
                    else {
                        const compare = await bcrypt.compare(password, user.password);
                        if (!compare) {
                            return done(null, false, {message: "Incorrect password provided"});
                        }
                    }
                    return done(null, user, {message: "User signed in successfully"});
                } catch (err) {
                    console.log(err);
                    return done(err);
                }
            }
        ))

        passport.use("signup", new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        }, async (req, username, password, done) => {
                try {
                    let user = await User.findOne({username: username});
                    if (user) {
                        return done(null, false, {message: "Account exists with provided username"});
                    } else {
                        const hashedPassword = await bcrypt.hash(password, 10);
                        let user = await new User({
                            username: username,
                            password: hashedPassword
                        });
                        await user.save();
                        return done(null, user, {message: "New user successfully created!"});
                    }
                    
                } catch (err) {
                    console.log(err);
                    return done(err);
                }
            }
        ))

        passport.use("jwtverify", new JWTStrategy(
            {
                secretOrKey:'supersecretkey',
                jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token') // token will be a query parameter
            },
            async (token, done) => {
                try {
                    let user = await User.findOne({username: token.username})
                    if (user) {
                        console.log("user found")
                        done(null, user);
                    } else {
                        console.log("no user found");
                        done(null, false);
                    }
                } catch (err) {
                    done(err, false)
                }
            }
        ))
}
