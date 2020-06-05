const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
    nombre: { type: String, required: true},
    id: { type: Number, required: true },
    direccion: {type: String, required: true},
    correo: { type: String, required: true },
    contraseña: { type: String, required: true},
    tipo: { type: String, require: true}
});

module.exports = mongoose.model('Usuario', UsuarioSchema);