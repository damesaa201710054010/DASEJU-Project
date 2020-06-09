const mongoose = require('mongoose');
const {Schema} = mongoose;

const document = new Schema({
    email: {type: String, required: false},
    id: {type: String, required: false},
    direccion: {type: String, required: false},
    nombre: {type: String, required:false}
});



module.exports = mongoose.model('document', document);