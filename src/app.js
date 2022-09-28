const express = require('express');
const { User, Category, Post } = require('./controllers');
const { handleError, validateJWT } = require('./middlewares');

const app = express();

app.use(express.json());

app.post('/login', User.login);
app.post('/user', User.create);
app.get('/user', validateJWT, User.getAll);
app.get('/user/:id', validateJWT, User.getById);
app.post('/categories', validateJWT, Category.create);
app.get('/categories', validateJWT, Category.getAll);
app.get('/post', validateJWT, Post.getAll);

app.use(handleError);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
