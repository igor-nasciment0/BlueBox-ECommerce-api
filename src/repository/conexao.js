import 'dotenv/config'
import mysql from 'mysql2/promise';

let dados = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    typeCast: function (field, next) {
        if (field.type === 'TINY' && field.length === 1) {
            return field.string() === '1'
        }
        else if (field.type === 'NEWDECIMAL'){
            return Number(field.string());
        } 
        else {
            return next();
        }
    }
}

const pool = mysql.createPool(dados);
const con = pool.getConnection();
console.log('Conexão criada');

setInterval(() => {
    con.query('select id_categoria from tb_categoria')
}, 300000);

export default con;