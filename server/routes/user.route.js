const express = require('express');
const router = express.Router();
const {create, login} = require('../controllers/user.controller');

router.route('/create')
      .post(create);

router.route('/login') 
      .post(login); 

module.exports = router;