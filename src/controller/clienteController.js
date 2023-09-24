import Router from "express";
import { cadastroCliente, loginCliente, verificarCPF, verificarEmail } from "../repository/clienteRepository.js";

const endpoints = Router();

endpoints.post('/usuario/cadastro', async (req, resp) => {
    try {
        let credenciais = req.body;

        if(!credenciais)    
            throw new Error('Não foi possível realizar o cadastro.')

        if(!credenciais.nome || !credenciais.sobrenome || !credenciais.email || !credenciais.senha || !credenciais.telefone || !credenciais.cpf || !credenciais.dataNascimento)
            throw new Error('Faltam dados de cadastro.')

        if(credenciais.senha.length < 8)
            throw new Error('A senha deve ter pelo menos 8 caracteres.')            

        let emailCadastrado = await verificarEmail(credenciais.email)
        if(emailCadastrado.length !== 0)
            throw new Error('Email já cadastrado.');

        let cpfCadastrado = await verificarCPF(credenciais.cpf); 
        if(cpfCadastrado.length !== 0)
            throw new Error('CPF já cadastrado.');

        if(credenciais.telefone.replaceAll(' ', '').length !== 14)
            throw new Error('Telefone inválido.');

        if(credenciais.cpf.replaceAll(' ', '').length !== 14)
            throw new Error('CPF inválido.')

        let resposta = await cadastroCliente(credenciais);

        resp.send(resposta);

    } catch (error) {
        resp.status(400).send(error.message);
    }
})

endpoints.post('/usuario/login', async (req, resp) => {
    try {
        let credenciais = req.body;

        let resposta = loginCliente(credenciais);

        if(resposta.length != 1)
            throw new Error('Credenciais inválidas');

    } catch (error) {
        resp.status(400).send(error.message);
    }
})

export default endpoints;