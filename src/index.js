const express = require ('express');
const http = require('http');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../src/.env')});
const port = process.env.PORT;
const { initBot } = require('./app.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');
const usersRoute = require('./routes/getAllUsers.js');
const singleUserRoute = require('./routes/getSingleUser.js');
const authRoute = require('./routes/loginAdmin.js');

initBot();

const app = express();
app.use('/admin-panel', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', usersRoute);
app.use('/user', singleUserRoute);
app.use('/login', authRoute);

const server = http.createServer(app);

server.listen( {port: port }, () => {
    console.log(`Server is listening on port : ${port}`);
});