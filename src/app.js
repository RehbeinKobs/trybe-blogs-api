const express = require('express');
const { User, Category } = require('./controllers');
const { handleError, validateJWT } = require('./middlewares');

const app = express();

app.use(express.json());

app.post('/login', User.login);
app.post('/user', User.create);
app.get('/user', validateJWT, User.getAll);
app.get('/user/:id', validateJWT, User.getById);
app.post('/categories', validateJWT, Category.create);

app.use(handleError);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
