import con from "./conexao.js"

export async function loginADM(email, senha) {
    let sql = 
    `
        select ds_nome          nome,
               ds_sobrenome     sobrenome,
               ds_email         email,
               ds_senha         senha,
               ds_telefone      telefone,
               ds_cpf           cpf,
               img_perfil       imagem
          from tb_admin
         where ds_email = ?
           and ds_senha = ?
    `           

    let [resp] = await con.query(sql, [email, senha]);

    return resp;
}