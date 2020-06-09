const express = require('express');
const userSchema = require('../models/user.model');
const jwt = require('jsonwebtoken');
const usere = {};

usere.create = async (req, res) => {
    const { name,
        password,
        id,
        email } = req.body;
    const newUser = new userSchema({
        name,
        password,
        id,
        email
    });
    console.log(newUser);
    await newUser.save()
        .then(res.json({
            "task": "nice"
        }))
        .catch((err) => {
            console.log(err);
        });
}

usere.login = async (req, res) => {
    const nameUser = await userSchema.findOne({ email: req.body.email })
                                     .catch((err) => {
                                        console.log(err);
                                     });
    if (nameUser) {
       
            console.log(nameUser);
            const token = jwt.sign(req.body, 'user', { expiresIn: '7d' });
            res.json({
                token
            })
        
    } else {
        res.sendStatus(403);
    }
    //const reUser =  userSchema.compararPassword(req.body.password);
    //console.log(reUser)
}

module.exports = usere;