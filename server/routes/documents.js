const express = require('express');
const router = express.Router();
const {save, list} = require('../controllers/documents.controllers');

router.route('/save')
      .post(save);

router.route('/list') 
      .get(list); 

module.exports = router;