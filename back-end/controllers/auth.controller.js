const passport = require("passport");
const jwt = require("jsonwebtoken");

const db = require("../models");
const User = db.user;

exports.register = async (req, res) => {
    try {
        passport.authenticate("signup", (err, user, info) => {
            if (err) {
                console.log(err);
                res.status(500).send({error: err.message});
            } else {
                if (user){
                    res.status(401).send({message: info.message});
                } else {
                    res.send({message: info.message});
                }
            }
        })(req, res)
    } catch (err) {
        console.log(err);
        res.status(500).send({error: err.message})
    }
}

exports.login = async (req, res) => {
    try {
        passport.authenticate("signin", async (err, user, info) => {
            if (err) {
                console.log(err);
                res.status(500).send({error: err.message});
            } else {
                if (!user) {
                    res.status(401).send({message: info.message});
                } else {
                    req.login(user, (err) => {
                        const token = jwt.sign({username: user.username}, 'supersecretkey'); //temp key?
                        res.send({
                            message: info.message,
                            token: token
                        })
                    })
                }
            }
        })(req, res)
    } catch (err) {
        console.log(err);
        res.status(500).send({error: err.message});
    }
}

exports.getProfile = async (req, res) => {
    try {
        passport.authenticate("jwtverify", {session: false}, async (err, user) => {
            if (err) {
                console.log(err);
                res.status(500).send({error: err.message});
            } else {
                res.send({user: user})
            }
        })(req, res)
    } catch (err) {
        console.log(err)
        res.status(500).send({error: err.message});
    }
}