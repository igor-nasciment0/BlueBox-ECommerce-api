import { Router } from 'express';
import { adicionarCupom, adicionarProdutoCupom, buscarCupom } from '../repository/cupomRepository.js';

const endpoints = Router();

endpoints.post('/cupom', async (req, resp) => {
    try {
        let cupom = req.body;

        if(!cupom.codigo || !cupom.percentDesconto || !cupom.expiracao)  
            throw new Error('Preencha todos os campos do cupom.');

        
        let hoje = new Date();

        if(new Date(cupom.expiracao) < hoje)
            throw new Error('A data de expiração deve ser futura.')


        let cupomExistente = await buscarCupom(cupom.codigo);

        if(cupomExistente.length > 0)
            throw new Error('Já existe um cupom com este código.');

        let r = await adicionarCupom(cupom);

        resp.send(r);
        
    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.post('/cupom/produto', async (req, resp) => {
    try {

        console.log(req.body);
        
        let {idCupom, idProduto} = req.body;

        let r = await adicionarProdutoCupom(idCupom, idProduto);

        resp.send(r);
        
    } catch (error) {
        resp.status(500).send(error.message);
    }
})

export default endpoints;