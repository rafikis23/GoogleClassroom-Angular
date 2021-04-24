var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    usuario: String,
    password: String,
    nombre: String,
    imagen: String,
    clases: Array
});

module.exports = mongoose.model('instructores', esquema);