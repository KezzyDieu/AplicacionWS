const express = require("express");
const usuariosRutas = require("./rutas/rutasUsuarios");
const productosRutas = require("./rutas/rutasProductos");
const ventasRutas = require("./rutas/rutasVentas");  // Importando rutas de ventas

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/", usuariosRutas);
app.use("/", productosRutas);
app.use("/", ventasRutas);  // Agregando rutas de ventas

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Servidor en http://localhost:"+port)
});
