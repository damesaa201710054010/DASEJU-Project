const Usuario = require('../models/Usuario');
const usuarioController = {};

usuarioController.crearUsuario = async (req, res) => {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.json({
        'status': 'Usuario guardado'
    });
};

usuarioController.getUsuario = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id);
    res.json(usuario);
};

usuarioController.editarUsuario = async (req, res) => {
    const usuario = {
        nombre: req.params.nombre,
        direccion: req.params.direccion,
        correo: req.params.correo,
        contraseña: req.params.contraseña,
        tipo: req.params.tipo
    }
    await Usuario.findByIdAndUpdate(req.params.id, {$set: usuario});
    res.json({
        'status': 'Usuario actualizado'
    });
};

usuarioController.eliminarUsuario = async (req, res) => {
    await Usuario.findByIdAndRemove(req.params.id);
    res.json({
        'status': 'Usuario eliminado'
    })
};

module.exports = usuarioController;