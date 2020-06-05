const mongoose = require('mongoose');
const { Schema } = mongoose;

const DocumentoSchema = new Schema({
    idDocumento: { type: Number, required: true},
    tipoDocumento: { type: String, required: true },
    estadoCert: { type: String, required: true },
    size: { type: Number, required: true},
    formato: { type: String, require: true},
    fecha: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Documento', DocumentoSchema);