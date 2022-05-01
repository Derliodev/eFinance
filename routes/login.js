var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();



var Usuario = require('../models').usuario;

/* Ruta Raiz */
router.get('/', function(req, res, next) {
    //Usuario.findAll({}).then(function(usuariosRespuesta) {
        res.render('login');/*, { usuario: usuariosRespuesta }*/
    //});
});

/* Control Usuario */
router.post('/ingresoUser', async function(req, res, next) {
    usr = req.body.usuario;
    pss = req.body.password;
    exist = await Usuario.findOne({ where: { usuario: usr, password: pss }})
    if(exist == null){
        res.redirect('/?val=1');
    }else{
        console.log(exist.usuario);
        res.redirect('/control/main/' + exist.id);
    }
});

//Guardar Registro
router.post('/guardarUsuario', function (req, res, next) {
    usuario = req['body']['usuario'];
    correo = req['body']['email'];
    password = req['body']['password'];
    staff = req['body']['staff'];
    Usuario.create({
        usuario: usuario,
        correo: correo,
        password: password,
        role: staff
    }).then(function (producto) {
        res.redirect('/');
    });
});





module.exports = router;