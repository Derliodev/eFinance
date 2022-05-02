var express = require('express');
const { redirect } = require('express/lib/response');
const async = require('hbs/lib/async');
var router = express.Router();

var Usuario = require('../models').usuario;
var Tiendas = require('../models').tiendas;
var Lista = require('../models').lista;
var Producto = require('../models').producto;

// Capturar Usuario

/* GET home page. */
// Check Main
router.get('/main', async function (req, res, next) {
    var usuario = req.session.usrVar;
    sess = req.session;
    await Tiendas.findAll({}).then(function (tiendaRespuesta) {
        sess.tiendas = tiendaRespuesta;    
    })
    if(usuario){
        res.render('main', {usuario});
    }else{
        res.render('login', {layout: 'layoutLogin'});
    }
});

/////////////
/* TIENDAS */
/////////////

//Listado de tiendas
router.get('/tiendas', function (req, res, next) {
    var usuario = req.session.usrVar;
    if(usuario){
        if(usuario.role == 's'){
            Tiendas.findAll({}).then(function (tiendaRespuesta) {
                res.render('tiendasAuth', { tiendas: tiendaRespuesta, usuario });
            });
        }else{
            Tiendas.findAll({}).then(function (tiendaRespuesta) {
                res.render('tiendas', { tiendas: tiendaRespuesta, usuario });
            });
        }
    }else{
        res.render('login', {layout: 'layoutLogin'});
    }
});

// Agregar Tienda
router.get('/agregarT', function (req, res, next) {
    var usuario = req.session.usrVar;
    if(usuario){
        Tiendas.findAll({}).then(function (tiendaRespuesta) {
            res.render('registroT', { tiendas: tiendaRespuesta, usuario });
        });
    }else{
        res.render('login', {layout: 'layoutLogin'});
    }
}); 

//Crear Tiendas
router.post('/guardarTienda', function (req, res, next) {
    nombre = req['body']['ntienda'];
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

// Eliminar Tienda
router.get('/eliminarTienda/:id', function (req, res, next) {
    id = req.params.id;
    idLista = sess.lista;
    Tiendas.findByPk(id).then((tienda) => {
        return tienda.destroy();
    }).then(function(){
        res.redirect('/control/tiendas');
    })
});


// Activar Tienda
router.get('/activarT/:id', function (req, res, next) {
    var usuario = req.session.usrVar;
    id = req.params.id;
    if(usuario){
        Tiendas.findByPk(id).then(function (tienda) {
            tienda.estado = 'A';
            tienda.save();
            res.redirect('/control/tiendas');
        });
    }else{
        res.render('login', {layout: 'layoutLogin'});
    }
}); 


///////////////////////
/* Listas de Compras */ 
///////////////////////

//Listado de Listas de comprar
router.get('/listas', function (req, res, next) {
    var usuario = req.session.usrVar;
    if(usuario){
        Lista.findAll({where:{ idUser : usuario.id }}).then(function (listaRespuesta) {
            res.render('listas', { listas: listaRespuesta});
        });
    }else{
        res.render('login', {layout: 'layoutLogin'});
    }
});

// Ver una Lista
router.get('/verLista/:id', async function (req, res, next) {
    var usuario = req.session.usrVar;
    idLista = req['params']['id'];
    sess = req.session;
    sess.lista = idLista;
    if(usuario){
        Producto.findAll({where:{lista:sess.lista}}).then(function (listaRespuesta) {
                var cant = listaRespuesta.length;
                let sumaValor = 0;
                let sumaComp = 0;
                for(let i = 0; i < cant; i++){
                    sumaValor +=  parseInt(listaRespuesta[i].nReal);
                    if(listaRespuesta[i].estado == 'C'){
                        sumaComp+= 1;
                    }
                }
                Lista.findByPk(idLista).then(function(lista){
                    lista.toGast = sumaValor;
                    lista.nProd = cant;
                    lista.nComp = sumaComp;
                    lista.save();
                }).then(()=>{
                    res.render('listado',{ productos: listaRespuesta});
                })
        });
    }else{
        res.render('login', {layout: 'layoutLogin'});
    }
});


//Crear Lista
router.get('/agregarLista', function (req, res, next) {
    var usuario = req.session.usrVar;
    if(usuario){
        Tiendas.findAll({}).then(function (tiendaRespuesta) {
            res.render('registroL', { tiendas: tiendaRespuesta });
        });
    }else{
        res.render('login', {layout: 'layoutLogin'});
    }
});

// Guardar listas
router.post('/guardarLista', function (req, res, next) {
    var usuario = req.session.usrVar;
    idU = usuario.id;
    nombre = req['body']['nLista'];
    presup = req['body']['presupuesto'];
    Lista.create({
        idUser:idU,
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

// Eliminar Lista
router.get('/eliminarLista/:id', function (req, res, next) {
    id = req.params.id;
    Lista.findByPk(id).then((lista) => {
        return lista.destroy();
    }).then(function () {
        res.redirect('/control/listas');
    });
});


///////////////
/* PRODUCTOS */
///////////////

// Agregar producto

router.get('/agregarProductos/', function (req, res, next) {
    var usuario = req.session.usrVar;
    if(usuario){
        Tiendas.findAll({}).then(function (tiendaRespuesta) {
            res.render('registroP', { tiendas: tiendaRespuesta,usuario});
        });
    }else{
        res.render('login', {layout: 'layoutLogin'});
    }
});


// Guardar Productos
router.post('/guardarProducto', function (req, res, next) {
    var usuario = req.session.usrVar;
    
    nombre = req['body']['nProducto'];
    pPresupuesto = req['body']['pPresupuesto'];
    pR = req['body']['pReal'];
    tienda = req['body']['tienda'];
    nota = req['body']['nota'];
    estado = req['body']['estado'];
    idLista = sess.lista;
    Producto.create({
        nombre:nombre,
        nPresup:pPresupuesto,
        nReal:pR,
        tienda:tienda,
        nota:nota,
        estado:'',
        lista:idLista
    }).then(function(){
        idLista = sess.lista;;
        res.redirect('/control/verLista/'+idLista);
    })
});

// Eliminar Producto
router.get('/eliminarProducto/:id', function (req, res, next) {
    id = req.params.id;
    idLista = sess.lista;
    Producto.findByPk(id).then((producto) => {
        return producto.destroy();
    }).then(function(){
        res.redirect('/control/verLista/'+idLista);
    })
});

// Modificar Producto

router.get('/modificarProducto/:id', function (req, res, next) {
    var usuario = req.session.usrVar;
    id = req['params']['id'];
    if(usuario){
        Producto.findByPk(id).then(function (productoRespuesta) {
            res.render('registroP', { producto: productoRespuesta });
        });
    }else{
        res.render('login', {layout: 'layoutLogin'});
    }
});


// Guardar producto modificado
router.post('/actualizarProducto', function (req, res, next) {
    id = req['body']['id'];
    nombre = req['body']['nProducto'];
    pPresupuesto = req['body']['pPresupuesto'];
    pReal = req['body']['pReal'];
    tienda = req['body']['tienda'];
    nota = req['body']['nota'];
    estado = req['body']['estado'];
    idLista = sess.lista;
    Producto.findByPk(id).then(function (producto) {
        producto.nombre = nombre,
        producto.nPresup = pPresupuesto,
        producto.nReal = pReal,
        producto.estado = estado,
        producto.tienda = tienda,
        producto.nota = nota
        producto.save();
    }).then(() => {
        res.redirect('/control/verLista/'+idLista);
    });
});

// Pagar Producto
router.get('/pagarProducto/:id', function (req, res, next) {
    id = req.params.id;
    idLista = sess.lista;
    Producto.findByPk(id).then(function (producto) {
        producto.estado = 'C'
        producto.save();
    }).then(() => {
        res.redirect('/control/verLista/'+idLista);
    });
});







module.exports = router;