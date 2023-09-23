import Router from "express";
import { cadastroUsuario, loginUsuario } from "../repository/usuarioRepository";

const endpoints = Router();

endpoints.post('/usuario/cadastro', async (req, resp) => {
    try {
        let credenciais = req.body;

        if(!credenciais)    
            throw new Error('Não foi possível realizar o cadastro.')

        let resposta = await cadastroUsuario(credenciais);

        resp.send(resposta);

    } catch (error) {
        resp.status(400).send(error.message);
    }
})

endpoints.post('/usuario/login', async (req, resp) => {
    try {
        let credenciais = req.body;

        let resposta = loginUsuario(credenciais);

        if(resposta.length != 1)
            throw new Error('Credenciais inválidas');

    } catch (error) {
        resp.status(400).send(error.message);
    }
})

export default endpoints;