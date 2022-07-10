const mysql = require('mysql2/promise');
    
    mysql.createConnection({
        user     : config.sequelize.username,
        password : config.sequelize.password
    }).then((connection) => {
        connection.query('CREATE DATABASE IF NOT EXISTS myRandomDb;').then(() => {
            // Safe to use sequelize now
        })
    })