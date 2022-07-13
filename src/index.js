const express = require('express');
const http = require('http');
const path = require('node:path');
const { port } = require ('./config/config.json');

const infoRoutes = require('./routes/about.js');
const authorRoutes = require('./routes/author.js');
const funcRoutes = require('./routes/functionality.js');
const gameRoutes = require('./routes/minigame.js');

const app = express();
app.get('/', (req, res) => {
    const root = path.join(__dirname, './endpoints/start.html')
    return res.status(200).sendFile(root);
})

app.use('/', infoRoutes);
app.use('/', authorRoutes);
app.use('/', funcRoutes);
app.use('/', gameRoutes);

const server = http.createServer(app);

server.listen( {port: port }, () => {
    console.log(`Server is listening on port : ${port}`);
})