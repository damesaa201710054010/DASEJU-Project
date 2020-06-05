const mongoose = require('mongoose');
const { Schema } = mongoose;

const SolicitudSchema = new Schema({
    idSolicitud: { type: Number, required: true},
    tipoSolicitud: { type: String, required: true }
});

module.exports = mongoose.model('Solicitud', SolicitudSchema);