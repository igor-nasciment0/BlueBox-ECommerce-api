import { Router } from "express";
import multer from 'multer';
import { consultaProduto, deletarProduto, inserirProduto, alterarProduto, listarCategorias, listarMarcas, inserirImagemProduto, deletarImagem, buscarImagens, consultaProdutoPorid } from "../repository/produtosRepository.js";
const endpoints = Router();

const upload = multer({dest: 'storage/imagens-produtos'})

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

endpoints.get('/produto/buscar/:id', async (req, resp) => {
    try {
        let id = req.params.id;

        let produto = await consultaProdutoPorid(id);

        resp.send(produto);

    } catch (err) {
        resp.status(500).send(err.message);
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

        resp.send(produto);
    }

    catch(error){
        resp.status(500).send(error.message)
    }
})


///// CONTROLE DE IMAGENS DOS PRODUTOS

endpoints.get('/produto/:id/imagem', async (req, resp) => {
    try {
        let idProduto = req.params.id;

        let imagens = await buscarImagens(idProduto);

        resp.send(imagens);
        
    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.post('/produto/:id/imagem', upload.single('imagem'), async (req, resp) => {
    try {
        if(!req.file.path)
            throw new Error('Não foi possível adicionar a imagem');

        let primaria = req.query.primaria === 'true';
        let {id} = req.params;
        let imagem = req.file.path;

        let resposta = await inserirImagemProduto(id, imagem, primaria);
        
        if(resposta != 1) {
            throw new Error('Não foi possível inserir a imagem.')
        }

        resp.status(204).send();

    } catch (error) {
        resp.status(400).send(error.message);
    }
})

endpoints.delete('/produto/imagem/:id', async (req, resp) => {
    try {
        let {id} = req.params;
        
        let linhasAfetadas = await deletarImagem(id);

        if(linhasAfetadas !== 1)
            throw new Error('Não foi possível deletar a imagem.');
        
        resp.status(204).send();
            
    } catch (error) {
        resp.status(500).send(error.message);
    }
})



///// GET MARCAS E CATEGORIAS

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