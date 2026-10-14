const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get(['/', '/dashboard'], (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

//Rotas
const lojaRoutes = require('./routes/estoque');
app.use('/loja', lojaRoutes);

module.exports = app;