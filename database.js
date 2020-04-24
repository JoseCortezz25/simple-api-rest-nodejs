const mysql = require('mysql');

const Pool = mysql.createPool({
    host: 'remotemysql.com',
    user: 'wl2K3iPohQ',
    password: 'f8bItoOiy9',
    database: 'wl2K3iPohQ',
    port: '3306'
});

module.exports = Pool;