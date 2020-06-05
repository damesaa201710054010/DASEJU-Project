const express = require('express');
const router = express.Router();
const usuario = require('../controllers/usuario.controller');
const { subir } = require('../index');

router.post('/', usuario.crearUsuario);
router.get('/:id', usuario.getUsuario);
router.put('/:id', usuario.editarUsuario);
router.delete('/:id', usuario.eliminarUsuario);

module.exports = router;