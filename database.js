const mysql = require('mysql');

const Pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'leaf_bd'
});

module.exports = Pool;