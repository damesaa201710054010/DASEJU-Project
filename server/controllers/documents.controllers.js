const express = require('express');
var request = require('request');
const userSchema = require('../models/document.model');
const jwt = require('jsonwebtoken');
const { Doclogin } = require('../controllers/user.controller');
const document = {};

document.save = async (req, res) => {
    const { email,
        id, direccion, nombre } = req.body;
    const newUser = new userSchema({
        email,
        id,
        direccion,
        nombre
    });
    var otracosa = Doclogin(email);
    request.get(
        'http://govCarpetaApp.mybluemix.net/apis​/authenticateDocument​/',{otracosa,direccion,nombre},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        }
    );

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
    const nameUser = await userSchema.find({ email: req.body.email })
        .catch((err) => {
            console.log(err);
        });
    console.log(nameUser);
    res.send(nameUser);
    //const reUser =  userSchema.compararPassword(req.body.password);
    //console.log(reUser)
}

module.exports = document;