import { Router } from "express";
import { consultaProduto, deletarProduto, inserirProduto, alterarProduto, listarCategorias, listarMarcas } from "../repository/produtosRepository.js";

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
        let produto = req.body;

        if(!produto) {
            throw new Error("Não foi possível alterar o produto.");
        }

        if(!produto.nome || !produto.preco || !produto.estoque || !produto.descricao || !produto.especificacoes || !produto.categoria || !produto.marca || !produto.usado || !produto.peso) {
            throw new Error("Preencha todos os campos de registro.")
        }

        let produtoCadastrado = inserirProduto(produto)
        resp.send(produtoCadastrado)
    }

    catch(error){
        resp.status(500).send(error.message)
    }
})


endpoints.put('/produto/:id', async (req, resp) =>{

    try{
        let id = req.params.id
        let produto = req.body;

        if(!produto) {
            throw new Error("Não foi possível alterar o produto.");
        }

        console.log(produto);

        if(!produto.nome || !produto.preco || !produto.estoque || !produto.descricao || !produto.especificacoes || !produto.categoria || !produto.marca || !produto.usado || !produto.peso) {
            throw new Error("Preencha todos os campos de registro.")
        }
    
        let resposta = await alterarProduto(id, produto);

        console.log(resposta);

        if(resposta !== 1) {
            throw new Error("Não foi possível alterar o produto.")
        }    

        resp.status(204).send()
    }

    catch(error){
        resp.status(500).send(error.message)
    }
})

endpoints.get('/produto/categoria', async (req, resp) => {
    try {
        let categorias = await listarCategorias();
        
        resp.send(categorias);

    } catch (error) {
        resp.status(500).send(error.message)
    }
})

endpoints.get('/produto/marca', async (req, resp) => {
    try {
        let marcas = await listarMarcas();
        
        resp.send(marcas);

    } catch (error) {
        resp.status(500).send(error.message)
    }
})

export default endpoints;