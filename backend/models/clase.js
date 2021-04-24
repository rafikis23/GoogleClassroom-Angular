var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    seccion: String,
    nombreClase: String,
    banner: String,
    descripcion: String,
    aula: String,
    asignaciones: Array,
    anuncios: Array
});

module.exports = mongoose.model('clases', esquema);