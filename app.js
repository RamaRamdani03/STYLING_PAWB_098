const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const todo = require('./src/routes/todo-routes');
const contact = require('./src/routes/contact-routes');
const session = require('express-session');
const expressEjsLayouts = require('express-ejs-layouts');

// Rute
const aRoutes = require('./src/routes/aRouters');

app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.set('layout', 'layouts/main-layouts');

app.use('/', aRoutes);
app.use('/todo', todo);
app.use('/contact', contact);

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});