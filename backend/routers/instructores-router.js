var express = require('express');
var router = express.Router();
var instructore = require('../models/instructore');
var mongoose = require('mongoose');
const participante = require('../models/participante');

// Obtener todos los instructores
router.get('/', function(req, res) {
    instructore.find({}, { _id: true, imagen: true })
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});

// Obtenr todas las clases de un instructor y miniaturas
router.get('/:idInstructor/clases', function(req, res) {
    instructore.aggregate([{
                $lookup: {
                    from: "clases",
                    localField: "clases._id",
                    foreignField: "_id",
                    as: "clases"
                }
            },
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.params.idInstructor)
                }
            },
            {
                $project: {
                    "clases._id": true,
                    "clases.seccion": true,
                    "clases.nombreClase": true,
                    "clases.banner": true,
                    "clases.asignaciones.titulo": true,
                    "clases.asignaciones.fecha": true
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
// Obtener el detalle de la clase
// Obtener las asignaciones de la clase seleccionada
router.get('/:idInstructor/clases/:idClase/asignaciones', function(req, res) {
    instructore.aggregate([{
                $lookup: {
                    from: "clases",
                    localField: "clases._id",
                    foreignField: "_id",
                    as: "clases"
                }
            },
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.params.idInstructor),
                    "clases._id": mongoose.Types.ObjectId(req.params.idClase)
                }
            },
            {
                $project: {
                    "clases.asignaciones.titulo": true,
                    "clases.asignaciones.fecha": true,
                    "clases.asignaciones.hora": true,
                    "clases.asignaciones.puntos": true
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
//Obtener todos los anuncios de una clase
router.get('/:idInstructor/clases/:idClase/anuncios', function(req, res) {
    instructore.aggregate([{
                $lookup: {
                    from: "clases",
                    localField: "clases._id",
                    foreignField: "_id",
                    as: "clases"
                }
            },
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.params.idInstructor),
                    "clases._id": mongoose.Types.ObjectId(req.params.idClase)
                }
            },
            {
                $project: {
                    usuario: true,
                    imagen: true,
                    "clases.seccion": true,
                    "clases.nombreClase": true,
                    "clases.banner": true,
                    "clases.descripcion": true,
                    "clases.aula": true,
                    "clases.anuncios.mensaje": true,
                    "clases.anuncios.hora": true,
                    "clases.anuncios.comentarios.usuario": true,
                    "clases.anuncios.comentarios.mensaje": true,
                    "clases.anuncios.comentarios.hora": true
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
//Visualizar los comentarios de un anuncio
router.get('/:idInstructor/clases/:idClase/comentarios', function(req, res) {
    instructore.aggregate([{
                $lookup: {
                    from: "clases",
                    localField: "clases._id",
                    foreignField: "_id",
                    as: "clases"
                }
            },
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.params.idInstructor),
                    "clases._id": mongoose.Types.ObjectId(req.params.idClase)
                }
            },
            {
                $project: {
                    "clases.anuncios.comentarios.usuario": true,
                    "clases.anuncios.comentarios.mensaje": true,
                    "clases.anuncios.comentarios.hora": true
                }
            }
        ])
        .then(result => {
            res.send(result[0]);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        })
});
// Agregar un instructor
router.post('/instructor', function(req, res) {
    let ins = new instructore({
        _id: mongoose.Types.ObjectId(),
        usuario: req.body.usuario,
        password: req.body.password,
        nombre: req.body.nombre,
        imagen: req.body.imagen
    });
    // Promesa
    ins.save()
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        })
});




module.exports = router;