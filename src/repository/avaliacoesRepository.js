import con from "./conexao.js"

export async function buscarAvaliacoes(idProduto) {
    let sql = 
    `
        select id_avaliacao     id,
               id_produto       idProduto,
               id_cliente       idCliente,
               ds_comentario    comentario,
               ds_nota          nota,
               dt_postagem      dataPostagem,
               nr_likes         likes
         from  tb_avaliacao
        where  id_produto       = ?
     order by  nr_likes, dt_postagem desc   
    `

    let [resp] = await con.query(sql, [idProduto]);

    return resp;
}

export async function inserirAvaliacao(avaliacao) {
    let sql = 
    `
        insert into tb_avaliacao (id_produto, id_cliente, ds_comentario, ds_nota, dt_postagem, nr_likes)
                          values (?, ?, ?, ?, NOW(), 0);
    `

    let [resp] = await con.query(sql, [avaliacao.idProduto,
                                 avaliacao.idCliente,
                                 avaliacao.comentario,
                                 avaliacao.nota])
    
    avaliacao.id = resp.insertId;

    return avaliacao;
}

export async function darLike(idAvaliacao, idCliente) {
    let sql = 
    `
        insert into tb_avaliacao_like (id_avaliacao, id_cliente)
                               values (?, ?)
    `

    let [resp] = await con.query(sql, [idAvaliacao, idCliente]);

    return resp.affectedRows;
}

export async function tirarLike(idAvaliacaoLike) {
    let sql = 
    `
        delete from     tb_avaliacao_like 
              where     id_avaliacao_like = ?
    `

    let [resp] = await con.query(sql, [idAvaliacaoLike]);

    return resp.affectedRows;
}