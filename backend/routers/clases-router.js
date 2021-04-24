var express = require('express');
var router = express.Router();
var clase = require('../models/clase');
var participante = require('../models/participante');
var mongoose = require('mongoose');

// Me devuelve todds las clases
router.get('/', function(req, res) {
    clase.find({}, { _id: true })
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        })
});
router.get('/idClase/detalle', function(req, res) {
    clase.find({ _id: req.params.idClase }, {
            _id: true,
            nomreClase: true
        })
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});
//Listar a todos los participantes de una clase seleccionada
// Obtener los participantes de la clase 
router.get('/:idClase/participantes', function(req, res) {
    participante.aggregate([{
                $lookup: {
                    from: "clases",
                    localField: "clases._id",
                    foreignField: "_id",
                    as: "clases"

                }
            },
            {
                $match: {
                    "clases._id": mongoose.Types.ObjectId(req.params.idClase)
                }

            },
            {
                $project: {
                    nombre: true,
                    imagen: true
                }
            }
        ])
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        })
});
// Agregar un nuevo comentario a un anuncio hecho
router.post('/:idClase/anuncios/:idAnuncio/comentario', function(req, res) {
    clase.update({
        _id: mongoose.Types.ObjectId(req.params.idClase),
        "anuncios._id": mongoose.Types.ObjectId(req.params.idAnuncio)
    }, {
        $push: {
            "anuncios.$.comentarios": {
                usuario: req.body.usuario,
                mensaje: req.body.mensaje,
                fecha: req.body.fecha,
                hora: req.body.hora

            }
        }
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
});
module.exports = router;