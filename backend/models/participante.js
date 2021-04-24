var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    nombre: String,
    imagen: String,
    clases: Array
});

module.exports = mongoose.model('participantes', esquema);