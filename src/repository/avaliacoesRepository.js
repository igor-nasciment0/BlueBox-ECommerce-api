import con from "./conexao.js"

export async function buscarAvaliacoes(idProduto) {
    let sql = 
    `
       select  id_avaliacao     id,
               id_produto       idProduto,
               ds_comentario    comentario,
               ds_nota          nota,
               dt_postagem      dataPostagem,
               a.id_cliente     idCliente,
               ds_nome          nomeCliente,
               ds_sobrenome     sobrenomeCliente,
               img_perfil       imgCliente
         from  tb_avaliacao     as a
   inner join  tb_cliente       on a.id_cliente = tb_cliente.id_cliente
        where  id_produto       = ?
     order by  ds_comentario, 
               dt_postagem desc   
    `

    let [resp] = await con.query(sql, [idProduto]);

    return resp;
}

export async function inserirAvaliacao(idProduto, avaliacao) {
    let sql = 
    `
        insert into tb_avaliacao (id_produto, id_cliente, ds_comentario, ds_nota, dt_postagem)
                          values (?, ?, ?, ?, NOW())
    `

    let [resp] = await con.query(sql, [idProduto,
                                 avaliacao.idCliente,
                                 avaliacao.comentario,
                                 avaliacao.nota])
    
    avaliacao.id = resp.insertId;

    return avaliacao;
}

export async function deletarAvaliacao(idAvaliacao) {
    let sql = 
    `
        delete from     tb_avaliacao
              where     id_avaliacao = ?
    `

    let [resp] = await con.query(sql, [idAvaliacao]);

    return resp;
}

export async function darLike(idCliente, idAvaliacao) {
    let sql = 
    `
        insert into tb_avaliacao_like (id_avaliacao, id_cliente)
                               values (?, ?)
    `

    let [resp] = await con.query(sql, [idAvaliacao, idCliente]);

    return resp;
}

export async function tirarLike(idCliente, idAvaliacao) {
    let sql = 
    `
        delete from     tb_avaliacao_like 
              where     id_cliente = ?
                and     id_avaliacao = ?
    `

    let [resp] = await con.query(sql, [idCliente, idAvaliacao]);

    return resp.affectedRows;
}

export async function verificarLike(idCliente, idAvaliacao) {
    let sql = 
    `
        select id_cliente           idCliente,
               id_avaliacao         idAvaliacao
          from tb_avaliacao_like
               where                id_cliente = ?
               and                  id_avaliacao = ?
    `

    let [resp] = await con.query(sql, [idCliente, idAvaliacao]);

    return resp;
}

export async function numeroLikes(idAvaliacao) {
    let sql = 
    `
        select id_avaliacao_like    id,
               id_cliente           idCliente,
               id_avaliacao         idAvaliacao
          from tb_avaliacao_like
               where                id_avaliacao = ?
    `

    let [resp] = await con.query(sql, [idAvaliacao]);

    return resp;
}