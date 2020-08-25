const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.get("/", (request, response, next) => {
    return response.status(200).json({
        message: "GET user"
    });
});

router.post("/signup", (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        console.log(user);
        if(user.length > 0) {
            return res.status(409).json({
                message: "Mail already registered"
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {

                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                    });
        
                    console.log(user);
                    user.save()
                    .then(result => {
                        console.log(result);
                        return res.status(201).json({
                            message: "User created"
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    });
});

router.post("/signin", (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1) {
            return res.status(404).json({
                message: "Auth failed"
            });
        } else {
           bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                } else {
                    if(result) {
                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        }, process.env.JWT_KEY, {
                            expiresIn: "1h"
                        });

                        return res.status(200).json({
                            message: "Auth successful",
                            token: token
                        });
                    }
                }
           });  
        }
    })
    .catch(err => {
        return response.status(500).json({
            error: err
        });
    });
});

router.delete("/:userId", (req, res, next) => {
    User.remove({_id: req.params.id})
    .exec()
    .then(result => {
        res.status(200).json({
           message: "User deleted" 
        });
    })
    .catch(err => {
        return response.status(500).json({
            error: err
        });
    });
});

module.exports = router;