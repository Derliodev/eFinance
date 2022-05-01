var express = require('express');
const { redirect } = require('express/lib/response');
const async = require('hbs/lib/async');
var router = express.Router();

var Usuario = require('../models').usuario;
var Tiendas = require('../models').tiendas;
var Lista = require('../models').lista;
var Producto = require('../models').producto;

// Variables momentaneas
var role = ' ';

// Capturar Usuario

function usuarioObjeto(id){
    Usuario.findByPk(id).then(function(usuarioR){
        return usuarioR;
    })
}

/* GET home page. */

router.get('/main/:id', function (req, res, next) {
    nUser = req.params.id;
    Usuario.findByPk(nUser).then((usuario)=>{
        this.role = usuario.role;
        res.render('main', {role :usuario.role, nombre:usuario.usuario, id:nUser});
    })
});


router.get('/main', function (req, res, next) {
    res.redirect('/login/');
});

/* POST home page.
router.post('/main/:id', function (req, res, next) {
    Usuario.findAll({}).then(function (usuariosRespuesta) {
        res.render('main', { usuario: usuariosRespuesta });
    });
}); */


/* Nav */
router.get('/tiendas/:id', function (req, res, next) {
    //role = req.params.role;
    Tiendas.findAll({}).then(function (tiendaRespuesta) {
        res.render('tiendas', { tiendas: tiendaRespuesta, rol:role });
        //console.log(rol);
    });
});


router.get('/listas/:id', function (req, res, next) {
    nUser = req.params.id;
    Lista.findAll({}).then(function (listaRespuesta) {
        res.render('listas', { listas: listaRespuesta, id:nUser });
    });
});


// Falla !!! Debe traer el nombre de la tienda y pasarlo a la vista
router.get('/verLista', async function (req, res, next) {
    /*productos = await Producto.findAll({});
    tienda =  (fn) => {
        for(let prod of productos){tienda = prod.tienda;};
    };*/
    Producto.findAll({}/*{ where: {tienda:tienda}}*/).then(function (tiendaRespuesta) {
        res.render('listado',{ productos: tiendaRespuesta});
    });
});

router.get('/agregarT', function (req, res, next) {
    Tiendas.findAll({}).then(function (tiendaRespuesta) {
        res.render('registroT', { tiendas: tiendaRespuesta });
    });
});

router.get('/agregarLista', function (req, res, next) {
    Tiendas.findAll({}).then(function (tiendaRespuesta) {
        res.render('registroL', { tiendas: tiendaRespuesta });
    });
});

router.get('/agregarProductos', function (req, res, next) {
    Tiendas.findAll({}).then(function (tiendaRespuesta) {
        res.render('registroP', { tiendas: tiendaRespuesta });
    });
});

router.get('/modificarProducto/:id', function (req, res, next) {
    id = req['params']['id'];
    Producto.findByPk(id).then(function (productoRespuesta) {
        res.render('registroP', { producto: productoRespuesta });
    });
});


/* CRUD TIENDAS */
//Crear Tiendas
router.post('/guardarTienda', function (req, res, next) {
    nombre = req['body']['ntienda'];
    //sucursal = req['body']['sucursal'];
    direccion = req['body']['direccion'];
    ciudad = req['body']['ciudad'];
    region = req['body']['region'];
    Tiendas.create({
        nombre:nombre,
        direccion:direccion,
        ciudad:ciudad,
        region:region,
        estado:''
    }).then(function(){
        res.redirect('/control/tiendas');
    })
});

//Crear listas

router.post('/guardarLista', function (req, res, next) {
    nombre = req['body']['nLista'];
    presup = req['body']['presupuesto'];
    Lista.create({
        nombre:nombre,
        nProd:0,
        nComp:0,
        toPresup:presup,
        toGast:0,
        estado:'',
        alert:''
    }).then(function(){
        res.redirect('/control/listas');
    })
});

//Eliminar lista
//Eliminar
router.get('/eliminarLista/:id', function (req, res, next) {
    id = req.params.id;
    Lista.findByPk(id).then((usuario) => {
        return usuario.destroy();
    }).then(function () {
        res.redirect('/control/listas');
    });
});

//Agregar Productos

router.post('/guardarProducto', function (req, res, next) {
    nombre = req['body']['nProducto'];
    pPresupuesto = req['body']['pPresupuesto'];
    pR = req['body']['pReal'];
    tienda = req['body']['tienda'];
    nota = req['body']['nota'];
    estado = req['body']['estado'];
    lista = req['body']['lista'];
    Producto.create({
        nombre:nombre,
        nPresup:pPresupuesto,
        nReal:pR,
        tienda:tienda,
        nota:nota,
        estado:'',
        lista:lista
    }).then(function(){
        res.redirect('/control/verLista');/*:id */
    })
});

// Modificar Producto

router.post('/actualizarProducto', function (req, res, next) {
    id = req['body']['id'];
    nombre = req['body']['nProducto'];
    pPresupuesto = req['body']['pPresupuesto'];
    pReal = req['body']['pReal'];
    tienda = req['body']['tienda'];
    nota = req['body']['nota'];
    estado = req['body']['estado'];


    Producto.findByPk(id).then(function (prod) {
        prod.nombre = nombre,
        prod.nPresup = pPresupuesto,
        prod.nReal = pReal,
        prod.estado = estado,
        prod.tienda = tienda,
        prod.nota = nota
        prod.save();
    }).then(() => {
        res.redirect('/control/verLista');
    });
});

// Pagar Producto

router.get('/pagarProducto/:id', function (req, res, next) {
    id = req.params.id;
    Producto.findByPk(id).then(function (prod) {
        prod.estado = 'C'
        prod.save();
    }).then(() => {
        res.redirect('/control/verLista');
    });
});


// Eliminar Producto
router.get('/eliminarProducto/:id', function (req, res, next) {
    id = req.params.id;
    Producto.findByPk(id).then((prod) => {
        return prod.destroy();
    }).then(function () {
        res.redirect('/control/verLista');
    });
});





module.exports = router;