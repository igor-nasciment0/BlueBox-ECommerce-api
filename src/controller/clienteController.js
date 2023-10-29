import Router from "express";
import { atualizarCliente, cadastroCliente, calcularIdade, inserirImagemUsuario, loginCliente, verificarCPF, verificarEmail } from "../repository/clienteRepository.js";
import multer from "multer";

const endpoints = Router();

const upload = multer({dest: 'storage/imagens-usuarios'});

endpoints.post('/usuario/cadastro', async (req, resp) => {
    try {
        let credenciais = req.body;

        if(!credenciais)    
            throw new Error('Não foi possível realizar o cadastro.')

        if(!credenciais.nome || !credenciais.sobrenome || !credenciais.email || !credenciais.senha || !credenciais.telefone || !credenciais.cpf || !credenciais.dataNascimento)
            throw new Error('Preencha todos os dados de cadastro.')

        if(credenciais.senha.length < 8)
            throw new Error('A senha deve ter pelo menos 8 caracteres.')            

        let emailCadastrado = await verificarEmail(credenciais.email)
        if(emailCadastrado.length !== 0)
            throw new Error('Email já cadastrado.');

        let cpfCadastrado = await verificarCPF(credenciais.cpf); 
        if(cpfCadastrado.length !== 0)
            throw new Error('CPF já cadastrado.');

        if(credenciais.telefone.replaceAll(' ', '').length !== 17)
            throw new Error('Telefone inválido.');

        if(credenciais.cpf.replaceAll(' ', '').length !== 14)
            throw new Error('CPF inválido.')

        if(calcularIdade(credenciais.dataNascimento) < 16)
            throw new Error('É preciso ter pelo menos 16 anos para se cadastrar.')

        let resposta = await cadastroCliente(credenciais);

        resp.send(resposta);

    } catch (error) {
        resp.status(400).send(error.message);
    }
})

endpoints.post('/usuario/login', async (req, resp) => {
    try {
        let credenciais = req.body;

        if(!credenciais)
            throw new Error('Não foi possível entrar.')

        if(!credenciais.email || !credenciais.senha)
            throw new Error('Preencha todos os campos de login.')

        let resposta = await loginCliente(credenciais);
        console.log(resposta);

        if(resposta.length != 1)
            throw new Error('Email ou senha incorretos');

        resp.send(resposta)

    } catch (error) {
        console.log(error);
        resp.status(400).send(error.message);
    }
})

endpoints.put('/usuario/:id', async (req, resp) => {
    try {
        let idCliente = req.params.id;
        let newCliente = req.body;

        let r = await atualizarCliente(newCliente, idCliente);

        if(r.affectedRows != 1)
            throw new Error('Não foi possível atualizar os dados. Tente novamente mais tarde.');

        resp.status(204).send();

    } catch (error) {
        console.log(error);
        resp.status(500).send(error.message);
    }
})

endpoints.put('/usuario/:id/imagem', upload.single('imagem'), async (req, resp) => {
    try {
        let idUsuario = req.params.id;
        let imagem = req.file.path;

        let linhasAfetadas = await inserirImagemUsuario(idUsuario, imagem)

        if(linhasAfetadas !== 1)
            throw new Error('Não foi possível alterar a imagem. Tente novamente mais tarde.')

        resp.status(204).send();

    } catch (error) {
        resp.status(500).send(error.message);
    }
})

export default endpoints;