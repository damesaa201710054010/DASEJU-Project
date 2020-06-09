const express = require('express');
const userSchema = require('../models/user.model');
const jwt = require('jsonwebtoken');
const usere = {};
var request = require('request');


usere.create = async (req, res) => {
    const { name,
        password,
        id,
        email, adress } = req.body;
    sended = {
        "id": id,
        "name": name,
        "address": adress,
        "email": email,
        "operatorId": 23,
        "operatorName": "daseju"
    }
    var con = "El ciudadado con cedula: " + id + " no presenta registro en otro operador [Code: 0001]";
    request.get(
        'http://govCarpetaApp.mybluemix.net/apis/validateCitizen/' + id,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        }
    );

    request.post(
        'http://govCarpetaApp.mybluemix.net/apis/registerCitizen',
        { json: sended },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    );
    const newUser = new userSchema({
        name,
        password,
        id,
        email,
        adress
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

usere.Doclogin = async (email) => {
    const nameUser = await userSchema.findOne({ email: email })
        .catch((err) => {
            console.log(err);
        });
        return nameUser.id;
    //const reUser =  userSchema.compararPassword(req.body.password);
    //console.log(reUser)
}


module.exports = usere;