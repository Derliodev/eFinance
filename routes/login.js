var express = require('express');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
var router = express.Router();



var Usuario = require('../models').usuario;

/* Ruta Raiz */
router.get('/', function(req, res, next) {
    //Usuario.findAll({}).then(function(usuariosRespuesta) {
        res.render('login');/*, { usuario: usuariosRespuesta }*/
    //});
});


/////////////
/* Session */
/////////////


// Iniciar Sesion
router.post('/ingresoUser', async function(req, res, next) {
    usr = req.body.usuario;
    pss = req.body.password;
    exist = await Usuario.findOne({ where: { usuario: usr, password: pss }})
    if(exist == null){
        res.redirect('/?val=1');
    }else{
        // Variable objeto Usuario
        sess = req.session;
        sess.usrVar = exist;
        res.redirect('/control/main/');
    }
});

//Cerrar Sesion
router.get('/logout', function(req,res,next) {
    delete req.session.usrVar;
    delete req.session.destroy();
    res.redirect('/');
})



//////////////
/* Usuarios */
//////////////

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