const express = require ('express');
const http = require('http');
const newProfileRouter = require('./routes/newprofile.js');
const loginRouter = require('./routes/login.js');
const registerRouter = require('./routes/register.js');
const logoutRouter = require('./routes/logout.js');
require('dotenv/config');
const port = process.env.PORT || 3000;

const app = express();
app.get('/', (req, res) => {
    return res.status(200).send('Welcome to starter page');
});

app.use(express.json());
app.use('/', newProfileRouter);
app.use('/', registerRouter.router);
app.use('/', loginRouter.router);
app.use('/', logoutRouter.router);

const server = http.createServer(app);

server.listen({ port: port }, () => {
    console.log(`Server is listening on port ${port}`);
});