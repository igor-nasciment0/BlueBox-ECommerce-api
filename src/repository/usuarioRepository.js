import con from "./conexao"

export async function cadastroUsuario(credenciais) {
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
                                       credenciais.nascimento]);
    
    credenciais.id = resp.insertId;

    return credenciais;
}

export async function loginUsuario(credenciais) {
    let sql = 
    `
        select ds_nome          nome,
               ds_sobrenome     sobrenome,
               ds_email         email,
               ds_senha         senha,
               ds_telefone      telefone,
               ds_cpf           cpf,
               id_endereco,
               dt_nascimento    dataNascimento,
               img_perfil,
               dt_cadastro      dataCadastro
          from tb_cliente
         where ds_email         = ?
           and ds_senha         = ?
    `

    let [resp] = await con.query(sql, [credenciais.email,
                                       credenciais.senha]);
    
    return resp;
}