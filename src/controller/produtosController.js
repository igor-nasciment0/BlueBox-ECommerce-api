import { Router } from "express";
import { consultaProduto, deletarProduto } from "../repository/produtosRepository.js";

const endpoints = Router();

endpoints.get('/produto', async (req, resp) => {
    try {
        let nome = req.query.nome;

        if(!nome)
            nome = '';

        let produtos = await consultaProduto(nome);

        console.log(produtos);

        resp.send(produtos)

    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.delete('/produto/:id', async (req, resp) => {
    try {
        let id = req.params.id;

        let response = await deletarProduto(id);

        if(response.affectedRows != 1)
            throw new Error('Ocorreu um erro. :(')

        resp.status(204).send();
    } catch (error) {
        resp.status(500).send(error.message);
    }
})


export default endpoints;