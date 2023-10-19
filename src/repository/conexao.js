import 'dotenv/config'
import mysql from 'mysql2/promise';

let dados = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PWD,
    database: process.env.DB,
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