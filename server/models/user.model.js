const mongoose = require('mongoose');
const bcerypt = require('bcrypt-nodejs');
const {Schema} = mongoose;

const user = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    id: {type: Number, required: true},
    email: {type: String, required: true},
    adress: {type: String, required: true}
});



user.pre('save', function(next){
    const usuario = this;
    if(!usuario.isModified('password')){
        return next();
    }

    bcerypt.genSalt(10, (err, salt) => {
        if(err){
            next();
        }
        bcerypt.hash(usuario.password, salt, null, (err, hash) =>{
            if( err){
                next();
            }
            usuario.password = hash;
            next();
        })
    })
})


user.method.compararPassword = function(password, cb) {
    bcerypt.compare(password, this.password, (err, equal) => {
        if(err){
            return cb(err);
        }
        cb(null, equal);
    })
}


module.exports = mongoose.model('user', user);