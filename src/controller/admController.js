import { Router } from "express";
import { loginADM } from "../repository/admRepository.js";

const endpoints = Router();

endpoints.post('/adm/login', async (req, resp) => {
    try {
        let {email, senha} = req.body;

        let resposta = await loginADM(email, senha);

        if (resposta.length != 1)
        {
            throw new Error('Credenciais inválidas.')
        }

        resp.status(200).send({acesso: true});   

    } catch (error) {
        resp.status(500).send(error.message)
    }
})

export default endpoints;