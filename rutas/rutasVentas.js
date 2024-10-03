const express = require('express');
const router = express.Router();
const { bd } = require('../bd/conexion');

const { crearVenta, cancelarVenta, buscarVentaPorId } = require('../bd/ventasBD');

router.get('/ventas', (req, res) => {
    bd.collection('ventas').get()
        .then((snapshot) => {
            let ventas = [];
            snapshot.forEach((doc) => {
                ventas.push({ id: doc.id, ...doc.data() });
            });
            res.status(200).json(ventas);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

// Ruta para crear una nueva venta
router.post('/crearVenta', (req, res) => {
    const { idUsuario, idProducto, fecha, hora } = req.body;
    crearVenta(idUsuario, idProducto, fecha, hora)
        .then((venta) => res.status(200).json({ message: 'Venta creada exitosamente', ventaId: venta.id }))
        .catch((error) => res.status(500).json({ error: error.message }));
});

// Ruta para cancelar una venta por ID
router.put('/cancelarVenta/:idVenta', (req, res) => {
    const { idVenta } = req.params;
    cancelarVenta(idVenta)
        .then(() => res.status(200).json({ message: 'Venta cancelada exitosamente' }))
        .catch((error) => res.status(500).json({ error: error.message }));
});

// Ruta para buscar una venta por ID
router.get('/buscarVentaPorId/:idVenta', (req, res) => {
    const { idVenta } = req.params;
    buscarVentaPorId(idVenta)
        .then((venta) => {
            if (!venta.exists) {
                return res.status(404).json({ message: 'Venta no encontrada' });
            }
            res.status(200).json({ venta: venta.data() });
        })
        .catch((error) => res.status(500).json({ error: error.message }));
});

module.exports = router;
