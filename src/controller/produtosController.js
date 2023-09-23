import { Router } from "express";
import { consultaProduto, deletarProduto, inserirProduto, alterarProduto } from "../repository/produtosRepository.js";

const endpoints = Router();

endpoints.get('/produto', async (req, resp) => {
    try {
        let nome = req.query.nome;

        if(!nome)
            nome = '';

        let produtos = await consultaProduto(nome);

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

endpoints.post('/produto', async (req, resp) => {
    try {
        let novoProduto = req.body;

        let produtoCadastrado = inserirProduto(novoProduto)
        resp.send(produtoCadastrado)
    }

    catch(error){
        resp.status(500).send(error.message)
    }
})


endpoints.put('/produto/:id', async (req, resp) =>{

    try{
        let id = req.params.id
        let produto = req.body
    
        let resposta = await alterarProduto(id, produto);

        if(resposta !== 1) {
            throw new Error("Não foi possível alterar o produto.")
        }    

        resp.status(204).send()
    }

    catch(error){
        resp.status(500).send(error.message)
    }
})

export default endpoints;