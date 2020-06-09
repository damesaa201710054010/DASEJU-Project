const express = require('express');
const userSchema = require('../models/document.model');
const jwt = require('jsonwebtoken');
const document = {};

document.save = async (req, res) => {
    const { email,
        id,direccion } = req.body;
    const newUser = new userSchema({
        email,
        id,
        direccion
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

document.list = async (req, res) => {
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

module.exports = document;