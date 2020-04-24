const express = require('express');
//const morgan = require('morgan');
//const pug = require('pug');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'pug');



app.use(express.urlencoded({extended: false}));
app.use(express.json());
//app.use(morgan('dev'));

app.use(require('./routes'));

app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './views')));


app.listen(app.get('port'), ()=>{
    console.log(`El servidor esta funcionando en el puerto ${app.get('port')}`);
});