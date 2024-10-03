// Importa el objeto `bd` que probablemente se usa para interactuar con Firebase.
const { bd } = require('./conexion');

// Función para crear una nueva venta con fecha y hora combinadas.
function crearVenta(idUsuario, idProducto, fecha) {
    const nuevaVenta = {
        idUsuario: idUsuario,
        idProducto: idProducto,
        fecha: fecha,  // Fecha y hora juntas 
        estatus: "vendido"  // Estatus por defecto al crear la venta.
    };
    return bd.collection('ventas').add(nuevaVenta);
}

// Función para cancelar una venta (no se borra, solo se cambia el estatus).
function cancelarVenta(idVenta) {
    return bd.collection('ventas').doc(idVenta).update({
        estatus: "cancelado"
    });
}

// Función para buscar una venta por ID.
function buscarVentaPorId(idVenta) {
    return bd.collection('ventas').doc(idVenta).get();
}

module.exports = { crearVenta, cancelarVenta, buscarVentaPorId };
