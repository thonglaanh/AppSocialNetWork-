const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

// app.use(express.static(path.join(__dirname, 'uploads')))
app.use('/uploads', express.static('uploads'))

const db = require('./db');
db.connect();

app.engine('hbs', hbs.engine(
    { extname: '.hbs' }
));
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded());
const route = require('./route')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src')))
route(app);
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})