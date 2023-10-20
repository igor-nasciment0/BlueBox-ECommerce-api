import { Router } from "express";
import { buscarAvaliacoes, darLike, inserirAvaliacao, tirarLike, verificarLike } from "../repository/avaliacoesRepository.js";

const endpoints = Router();

endpoints.get('/produto/:id/avaliacao', async (req, resp) => {
    try {
        let idProduto = req.params.id;

        let comentarios = await buscarAvaliacoes(idProduto);

        resp.send(comentarios);

    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.post('/produto/:id/avaliacao', async (req, resp) => {
    try {
        let idProduto = req.params.id;
        let avaliacao = req.body;

        if(avaliacao.nota < 0 || avaliacao.nota > 5)
            throw new Error('Nota inválida');

        let r = await inserirAvaliacao(idProduto, avaliacao);

        resp.send(r);
        
    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.get('/produto/avaliacao/:id/like', async (req, resp) => {
    try {
        let idAvaliacao = req.params.id;
        let idCliente = req.body.idCliente;
        
        let r = await verificarLike(idCliente, idAvaliacao);

        resp.send({like: r.length !== 0})

    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.post('/produto/avaliacao/:id/like', async (req, resp) => {
    try {
        let idAvaliacao = req.params.id;
        let idCliente = req.body.idCliente;
        
        await darLike(idCliente, idAvaliacao);

        resp.status(204).send();
        
    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.delete('/produto/avaliacao/:id/like', async (req, resp) => {
    try {   

        let idAvaliacao = req.params.id;
        let idCliente = req.body.idCliente;
        
        await tirarLike(idCliente, idAvaliacao);

        resp.status(204).send();
        
    } catch (error) {
        resp.status(500).send(error.message);
    }
})

export default endpoints;