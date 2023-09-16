import { Router } from "express";
import { consultaProduto } from "../repository/produtosRepository.js";

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


export default endpoints;