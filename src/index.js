import 'dotenv/config';
import express from "express";
import cors from 'cors';

import produtosController from './controller/produtosController.js';
import admController from './controller/admController.js';
import usuarioController from './controller/clienteController.js';
import promocoesController from './controller/promocoesController.js';
import avaliacoesController from './controller/avaliacoesController.js';
import cupomController from './controller/cupomController.js';
import pedidoController from './controller/pedidoController.js';

const server = express(); 

server.use(cors());
server.use(express.json());

server.use(produtosController);
server.use('/storage/imagens-produtos', express.static('storage/imagens-produtos'))
server.use('/storage/imagens-usuarios', express.static('storage/imagens-usuarios'))

server.use(admController);
server.use(usuarioController)
server.use(promocoesController)
server.use(avaliacoesController)
server.use(cupomController);
server.use(pedidoController);

server.listen(process.env.API_PORT, () => console.log('API ONLINE NA PORTA ' + process.env.API_PORT));