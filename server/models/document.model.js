const mongoose = require('mongoose');
const {Schema} = mongoose;

const document = new Schema({
    email: {type: String, required: true},
    id: {type: String, required: true},
    direccion: {type: String, required: true},
});



module.exports = mongoose.model('document', document);