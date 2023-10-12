import { Router } from "express";
import { alterarValorPromocao, alternarPromocao } from "../repository/promocoesRepository.js";

const endpoints = Router();

endpoints.put('/promocao/:idProduto', async (req, resp) => {
    try {
        let {idProduto} = req.params;
        let promocao = req.query.promocao === 'true';

        let linhasAfetadas = await alternarPromocao(idProduto, promocao);

        if(linhasAfetadas !== 1)
            throw new Error('Não foi possível configurar a promoção.')

        resp.status(204).send();

    } catch (error) {
        resp.status(500).send(error.message);
    }
});

endpoints.put('/promocao/valor/:idProduto', async (req, resp) => {
    try {
        let {idProduto} = req.params;
        let {valorPromocional} = req.body;

        let linhasAfetadas = await alterarValorPromocao(idProduto, valorPromocional);

        if(linhasAfetadas !== 1)
            throw new Error('Não foi possível alterar o valor promocional.')

        resp.status(204).send();

    } catch (error) {
        resp.status(500).send(error.message);
    }
});

export default endpoints;