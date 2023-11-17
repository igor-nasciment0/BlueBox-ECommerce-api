import { Router } from 'express';
import { adicionarCupom, adicionarProdutoCupom, buscarCupom, buscarProdutoCupom } from '../repository/cupomRepository.js';

const endpoints = Router();

endpoints.get('/cupom', async (req, resp) => {
    try {
        let {codigo, idProduto} = req.query 

        let cupom = await buscarCupom(codigo);

        if(!cupom) {
            throw new Error('Este código de cupom é inválido.')
        }

        let hoje = new Date();
        let expiracao = new Date(cupom.expiracao);

        if(hoje > expiracao) {
            throw new Error('Este cupom está expirado.');
        }

        let produto = await buscarProdutoCupom(idProduto, cupom.idCupom);

        if(produto) {
            resp.send({cupomServe: true, desconto: cupom.percentDesconto / 100}); 
        } else {
            resp.send({cupomServe: false})
        }       
        
    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.post('/cupom', async (req, resp) => {
    try {
        let cupom = req.body;

        if(!cupom.codigo || !cupom.percentDesconto || !cupom.expiracao)  
            throw new Error('Preencha todos os campos do cupom.');

        
        let hoje = new Date();

        if(new Date(cupom.expiracao) < hoje)
            throw new Error('A data de expiração deve ser futura.')


        let cupomExistente = await buscarCupom(cupom.codigo);

        if(cupomExistente)
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