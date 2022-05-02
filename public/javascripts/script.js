/* Manejador de mensajes */


function eliminarLista(id) {
    Swal.fire({
        title: 'Esta seguro de eliminar la lista?',
        text: "Este proceso no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminada!',
                'La lista ha sido eliminada.',
                'success'
            ).then(()=>{
                window.location = '/control/eliminarLista/'+id;
            })
        }
    })
}

function eliminarTienda(id) {
    Swal.fire({
        title: 'Esta seguro de eliminar la Tienda?',
        text: "Este proceso no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminada!',
                'La tienda ha sido eliminada.',
                'success'
            ).then(()=>{
                window.location = '/control/eliminarTienda/'+id;
            })
        }
    })
}

function eliminarProducto(id) {
    Swal.fire({
        title: 'Esta seguro de eliminar el producto?',
        text: "Este proceso no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminado!',
                'El producto ha sido eliminada.',
                'success'
            ).then(()=>{
                window.location = '/control/eliminarProducto/'+id;
            })
        }
    })
}

function pagarProducto(id) {
    Swal.fire({
        title: 'Desea marcar como Pagado?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Pagar!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                ' Pagado!',
                'El producto esta como pagado.',
                'success'
            ).then(()=>{
                window.location = '/control/pagarProducto/'+id;
            })
        }
    })
}








