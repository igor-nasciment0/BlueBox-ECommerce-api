import con from "./conexao.js"

export async function buscarAvaliacoes(idProduto) {
    let sql = 
    `
       select  id_avaliacao     id,
               id_produto       idProduto,
               ds_comentario    comentario,
               ds_nota          nota,
               dt_postagem      dataPostagem,
               nr_likes         likes,
               a.id_cliente     idCliente,
               ds_nome          nomeCliente,
               ds_sobrenome     sobrenomeCliente,
               img_perfil       imgCliente
         from  tb_avaliacao     as a
   inner join  tb_cliente       on a.id_cliente = tb_cliente.id_cliente
        where  id_produto       = ?
     order by  nr_likes, 
               ds_comentario, 
               dt_postagem desc   
    `

    let [resp] = await con.query(sql, [idProduto]);

    return resp;
}

export async function inserirAvaliacao(idProduto, avaliacao) {
    let sql = 
    `
        insert into tb_avaliacao (id_produto, id_cliente, ds_comentario, ds_nota, dt_postagem, nr_likes)
                          values (?, ?, ?, ?, NOW(), 0);
    `

    let [resp] = await con.query(sql, [idProduto,
                                 avaliacao.idCliente,
                                 avaliacao.comentario,
                                 avaliacao.nota])

    console.log(resp);
    
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