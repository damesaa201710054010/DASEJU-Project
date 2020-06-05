const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificacionSchema = new Schema({
    idNotificacion: { type: Number, required: true},
    tipoNotificacion: { type: String, required: true },
    notificacion: { type: String, required: true }
});

module.exports = mongoose.model('Notificacion', NotificacionSchema);