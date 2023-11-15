import { Router } from 'express';
import { adicionarEndereco, buscarEndereco, mudarEndereco } from '../repository/enderecoRepository.js';

const endpoints = Router();

endpoints.get('/endereco/:idEndereco', async (req, resp) => {
    try {
        let { idEndereco } = req.params;
        
        let endereco = await buscarEndereco(idEndereco);

        resp.send(endereco);

    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.post('/endereco', async (req, resp) => {
    try {

        let endereco = req.body;

        let r = await adicionarEndereco(endereco);

        resp.send(r);
        
    } catch (error) {
        resp.status(500).send(error.message);
    }
})

endpoints.put('/endereco', async (req, resp) => {
    try {
        
        let {idCliente, idNovoEndereco} = req.body;

        await mudarEndereco(idCliente, idNovoEndereco);

        resp.status(204).send();
        
    } catch (error) {
        resp.status(500).send(error.message);
    }
})

export default endpoints;