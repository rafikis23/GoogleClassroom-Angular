var express = require('express');
var cors = require('cors'); //Para gestionar politicas de dominios cruzados
var bodyParser = require('body-parser');
var database = require('./modules/database');
var clasesRouter = require('./routers/clases-router');
var instructoresRouter = require('./routers/instructores-router');
var participantesRouter = require('./routers/participantes-router');

var app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/clases', clasesRouter);
app.use('/participantes', participantesRouter);
app.use('/instructores', instructoresRouter);



app.listen(8888, () => {
    console.log('Servidor del backend levantado en 8888');
});