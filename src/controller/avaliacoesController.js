import { Router } from "express";
import { buscarAvaliacoes, inserirAvaliacao } from "../repository/avaliacoesRepository.js";

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

        let r = await inserirAvaliacao(idProduto, avaliacao);

        resp.send(r);
        
    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.post('/produto/:id/avaliacao/like', async (req, resp) => {
    try {
        
    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.delete('/produto/:id/avaliacao/like', async (req, resp) => {
    try {
        
    } catch (error) {
        resp.status(500).send(error.message);
    }
})

export default endpoints;