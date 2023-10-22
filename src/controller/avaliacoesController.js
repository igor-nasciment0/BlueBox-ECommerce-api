import { Router } from "express";
import { buscarAvaliacoes, darLike, inserirAvaliacao, numeroLikes, tirarLike, verificarLike } from "../repository/avaliacoesRepository.js";

const endpoints = Router({strict: true});

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

endpoints.get('/produto/avaliacao/:id/numerolikes', async (req, resp) => {
    try {
        let idAvaliacao = req.params.id;
        let r = await numeroLikes(idAvaliacao);

        resp.send({numeroLikes: r.length});
        
    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.get('/produto/avaliacao/:id/like', async (req, resp) => {
    try {
        let idAvaliacao = req.params.id;
        let idCliente = req.query.cliente;
        
        let r = await verificarLike(idCliente, idAvaliacao);

        resp.send({deuLike: r.length > 0});
        
    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.post('/produto/avaliacao/:id/like', async (req, resp) => {
    try {
        let idAvaliacao = req.params.id;
        let idCliente = req.query.cliente;;
        
        await darLike(idCliente, idAvaliacao);

        resp.status(204).send();
        
    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.delete('/produto/avaliacao/:id/like', async (req, resp) => {
    try {   
        let idAvaliacao = req.params.id;
        let idCliente = req.query.cliente;;
        
        await tirarLike(idCliente, idAvaliacao);

        resp.status(204).send();
        
    } catch (error) {
        resp.status(500).send(error.message);
    }
})

export default endpoints;