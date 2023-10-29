import 'dotenv/config'
import mysql from 'mysql2/promise';

let dados = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB,
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

let con = await mysql.createConnection(dados);
console.log('Conexão criada');

export default con;