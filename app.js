const express = require('express');
const db = require("./db");

const app = express();

app.use(express.text());
app.use(express.json());





app.get("/", (req,res)=>{
    res.send("Página de Inicio");
});


app.get('/books', (req, res) => {
    res.json(db);
});


app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = db.find(b => b.id === bookId);
    
    if (!book) {
        return res.status(404).json({ error: 'El libro no existe' });
    }
    
    res.json(book);
});









app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const bookIndex = db.findIndex(b => b.id === bookId);
    
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    db.splice(bookIndex, 1);
    res.status(204).end();
});


app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});
