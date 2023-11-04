import { Router } from 'express';
import { adicionarProdutoPedido, aprovarPagamento, buscarPedidoPorCliente, buscarPedidoPorEstado, buscarPedidoPorID, buscarProdutosPedido, concluirPedido, criarPedido, saiuParaEntrega } from '../repository/pedidoRepository.js';

const endpoints = Router({ strict: true });

endpoints.get('/pedido/estado/:id', async (req, resp) => {
    try {
        let idEstado = req.params.id;

        let pedidos = await buscarPedidoPorEstado(idEstado);

        resp.send(pedidos);

    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.get('/pedido/cliente/:id', async (req, resp) => {
    try {
        let idCliente = req.params.id;

        let pedidos = await buscarPedidoPorCliente(idCliente);

        resp.send(pedidos);

    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.get('/pedido/:id', async (req, resp) => {
    try {
        let idPedido = req.params.id;

        let pedidos = await buscarPedidoPorID(idPedido);

        resp.send(pedidos);

    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.get('/pedido/:id/produtos', async (req, resp) => {
    try {
        let idPedido = req.params.id;

        let produtos = await buscarProdutosPedido(idPedido);

        resp.send(produtos);

    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.post('/pedido', async (req, resp) => {
    try {

        let infoPedido = req.body;

        let produtos = infoPedido.produtos;

        let pedidoCriado = await criarPedido(infoPedido);

        for (let i = 0; i < produtos.length; i++) {
            await adicionarProdutoPedido(pedidoCriado.id, produtos[i]);
        }

        resp.send(pedidoCriado);

    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.put('/pedido/:id/aprovar', async (req, resp) => {
    try {
        let idPedido = req.params.id;

        await aprovarPagamento(idPedido);

        resp.status(204).send();

    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.put('/pedido/:id/saiu', async (req, resp) => {
    try {
        let idPedido = req.params.id;

        await saiuParaEntrega(idPedido);

        resp.status(204).send();

    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.put('/pedido/:id/concluir', async (req, resp) => {
    try {
        let idPedido = req.params.id;

        await concluirPedido(idPedido);

        resp.status(204).send();

    } catch (error) {
        resp.status(500).send(error.message);
    }
})

export default endpoints;