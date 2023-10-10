import con from "./conexao.js"

export async function cadastroCliente(credenciais) {
    let sql = 
    `
        insert into tb_cliente(ds_nome, ds_sobrenome, ds_email, ds_senha, ds_telefone, ds_cpf, dt_nascimento, dt_cadastro)
                        values(?, ?, ?, ?, ?, ?, ?, NOW());
    `

    let [resp] = await con.query(sql, [credenciais.nome,
                                       credenciais.sobrenome,
                                       credenciais.email,
                                       credenciais.senha,
                                       credenciais.telefone,
                                       credenciais.cpf,
                                       credenciais.dataNascimento]);
    
    credenciais.id = resp.insertId;

    return credenciais;
}

export async function loginCliente(credenciais) {
    let sql = 
    `
        select id_cliente       id,
               ds_nome          nome,
               ds_sobrenome     sobrenome,
               ds_email         email,
               ds_telefone      telefone,
               ds_cpf           cpf,
               id_endereco      idEndereco,
               dt_nascimento    dataNascimento,
               img_perfil       imgPerfil,
               dt_cadastro      dataCadastro
          from tb_cliente
         where ds_email         = ?
           and ds_senha         = ?
    `

    let [resp] = await con.query(sql, [credenciais.email,
                                       credenciais.senha]);
    
    return resp;
}

export async function verificarEmail(email) {
    let sql =
    `
        select ds_email 
          from tb_cliente
         where ds_email = ? 
    `

    let [resp] = await con.query(sql, [email]);

    return resp;
}

export async function verificarCPF(cpf) {
    let sql =
    `
        select ds_cpf 
          from tb_cliente
         where ds_cpf = ? 
    `

    let [resp] = await con.query(sql, [cpf]);

    return resp;
}

export async function inserirImagemUsuario(idCliente, imagem) {
    let sql = 
    `
        update tb_cliente
           set img_perfil = ?
         where id_cliente = ?
    `

    let [resp] = await con.query(sql, [imagem, idCliente]);

    return resp.affectedRows;
}

export function calcularIdade(data)
{
    let hoje = new Date();
    let nascimento = new Date(data);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    let mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    return idade;
}