const express = require('express');
const db = require("./db");

const app = express();

app.use(express.text());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Página de Inicio");
});


app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});
