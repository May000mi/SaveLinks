const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err,connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('LA CONEXION A LA BASE DE DATOS HA SIDO CERRADA--DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE DEMACIADAS CONEXIONES--DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('LA CONEXION A LA BASE DE DATOS FUE RECHAZADA--DATABASE CONNECTION WAS REFUSED');
        }
    }

    if(connection) connection.release();
    console.log('BD esta Conectada--DB is Connected');
    return;
});

//se convierte en promesas lo que antes se hacia con callbacks
//Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;