import con from './conexao.js';

export async function buscarEndereco(idEndereco) {
    let sql = 
    `
        select id_endereco      idEndereco,
               ds_logradouro    logradouro,
               ds_bairro        bairro,
               ds_cidade        cidade,
               ds_estado        estado,
               ds_cep           cep,
               nr_endereco      numero
          from tb_endereco
         where id_endereco      = ?
    `

    let [resp] = await con.query(sql, [idEndereco]);

    return resp[0];
}

export async function adicionarEndereco(endereco) {
    let sql =
    `
        insert into tb_endereco(ds_logradouro, ds_bairro, ds_cidade, ds_estado, ds_cep, nr_endereco)
                         values(?, ?, ?, ?, ?, ?)
    `

    let [resp] = await con.query(sql, [endereco.logradouro,
                                     endereco.bairro,
                                     endereco.cidade,
                                     endereco.estado,
                                     endereco.cep,
                                     endereco.numero]);
    
    endereco.idEndereco = resp.insertId;
    
    return endereco;
}

export async function mudarEndereco(idCliente, idEndereco) {
    let sql = 
    `
        update tb_cliente
           set id_endereco      = ?
         where id_cliente       = ?  
    `

    console.log(idCliente);
    console.log(idEndereco);

    let [resp] = await con.query(sql, [idEndereco, idCliente]);

    console.log(resp);

    return resp;
}