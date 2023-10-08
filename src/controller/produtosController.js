import { Router } from "express";
import multer from 'multer';
import { consultaProduto, deletarProduto, inserirProduto, alterarProduto, listarCategorias, listarMarcas, inserirImagem } from "../repository/produtosRepository.js";

const endpoints = Router();

const upload = multer({dest: 'storage/imagensProdutos'})

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

        if(!produto.nome || !produto.preco || !produto.estoque || !produto.descricao || !produto.especificacoes || !produto.categoria || !produto.marca || !produto.peso) {
            throw new Error("Preencha todos os campos de registro.")
        }

        let produtoCadastrado = await inserirProduto(produto)
        resp.send(produtoCadastrado);
    }

    catch(error){
        resp.status(500).send(error.message)
    }
})

endpoints.post('/produto/:id/imagem', upload.single('imagem'), async (req, resp) => {
    try {
        if(!req.file.path)
            throw new Error('Não foi possível adicionar a imagem');

        let primaria = req.query.primaria === 'true';
        let {id} = req.params;
        let imagem = req.file.path;

        let resposta = await inserirImagem(id, imagem, primaria);
        
        if(resposta != 1) {
            throw new Error('Não foi possível inserir a imagem.')
        }

        resp.status(204).send();

    } catch (error) {
        resp.status(400).send(error.message);
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

        if(!produto.nome || !produto.preco || !produto.estoque || !produto.descricao || !produto.especificacoes || !produto.categoria || !produto.marca || !produto.peso) {
            throw new Error("Preencha todos os campos de registro.")
        }
    
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