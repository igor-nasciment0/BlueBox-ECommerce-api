import { Router } from 'express';
import { adicionarCupom, adicionarProdutoCupom } from '../repository/cupomRepository.js';

const endpoints = Router();

endpoints.post('/cupom', async (req, resp) => {
    try {
        let cupom = req.body;

        let r = await adicionarCupom(cupom);

        resp.send(r);
        
    } catch (error) {
        resp.status(500).send(error);
    }
})

endpoints.post('/cupom/produto', async (req, resp) => {
    try {
        
        let {idCupom, idProduto} = req.body;

        let r = await adicionarProdutoCupom(idCupom, idProduto);

        resp.send(r);
        
    } catch (error) {
        resp.status(500).send(error);
    }
})

export default endpoints;