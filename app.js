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


let id = 1;  

app.post('/books', (req, res) => {
    const { title, author, year } = req.body;
    
    if (!title || !author || !year) {
        return res.status(400).json({ error: 'Todos los parámetros son requeridos' });
    }
    
    const existingBook = db.find(b => b.title === title && b.author === author && b.year === year);
    if (existingBook) {
        return res.status(400).json({ error: 'El libro ya existe' });
    }
    
    const newBook = { id: id++, title, author, year };  // Utilizar id y luego incrementarlo
    db.push(newBook);
    res.status(201).json(newBook);
});



app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const { title, author, year } = req.body;
    
    const book = db.find(b => b.id === bookId);
    
    if (!book) {
        return res.status(404).json({ error: 'Libro no encontrado' });
    }
    
    if (!title || !author || !year) {
        return res.status(400).json({ error: 'Todos los datos son requeridos' });
    }
    
    book.title = title;
    book.author = author;
    book.year = year;
    
    res.json(book);
});


app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const bookIndex = db.findIndex(b => b.id === bookId);
    
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'El libro no existe' });
    }

    db.splice(bookIndex, 1);
    res.status(204).end();
});


app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});
