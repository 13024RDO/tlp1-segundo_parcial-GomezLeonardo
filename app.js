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


app.post('/books', (req, res) => {
    const { title, author, year } = req.body;
    
    if (!title || !author || !year) {
        return res.status(400).json({ error: 'Todos los parametros son requeridos' });
    }
    
    const existingBook = books.find(b => b.title === title && b.author === author && b.year === year);
    if (existingBook) {
        return res.status(400).json({ error: 'El libro ya exite' });
    }
    
    const newBook = { id: nextId++, title, author, year };
    books.push(newBook);
    res.status(201).json(newBook);
});



app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});
