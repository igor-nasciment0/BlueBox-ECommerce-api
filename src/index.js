import 'dotenv/config';

import express from "express";
import cors from 'cors';

import produtosController from './controller/produtosController.js';

const server = express(); 

server.use(cors());
server.use(express.json());
server.use(produtosController);

server.listen(process.env.PORT, () => console.log('API ONLINE NA PORTA ' + process.env.PORT));