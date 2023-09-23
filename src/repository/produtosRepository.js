import con from "./conexao.js";

export async function consultaProduto(nome) {
    nome = `%${nome}%`

    let sql = 
    `
        select id_produto       id,
               nm_produto       nome,
               qtd_estoque      estoque,
               bt_usado         usado,
               vl_preco         preco
          from tb_produto
    inner join tb_categoria     on tb_produto.id_categoria = tb_categoria.id_categoria
    inner join tb_marca         on tb_produto.id_marca = tb_marca.id_marca
         where nm_produto       like ?
            or ds_marca         like ?
            or ds_categoria     like ?
    `

    let [resp] = await con.query(sql, [nome, nome, nome])
    return resp;
}

export async function deletarProduto(id) {
    
    let sql = 
    `
        delete from tb_produto
        where id_produto = ?
    `

    let [resp] = await con.query(sql, [id]);
    
    return resp;
}

export async function inserirProduto(produto){
    let sql = `
        insert into tb_produto(nm_produto, vl_preco, bt_promocao, qtd_estoque, ds_produto, ds_especificacoes, id_categoria, id_marca, bt_usado, vl_peso, dt_cadastro)
        values(?, ?, false, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    let [resp] = await con.query(sql, [produto.nome,
                                       produto.preco,
                                       produto.estoque,
                                       produto.descricao,
                                       produto.especificacoes,
                                       produto.categoria,
                                       produto.marca,
                                       produto.usado,
                                       produto.peso,
                                       produto.cadastro]);

    produto.id = resp.insertId

    return produto                  
}

export async function alterarProduto(id, produto){
    let sql = `update tb_produto
                set nm_produto = ?
                    vl_preco = ?
                    bt_promocao = ?
                    qtd_estoque = ?
                    ds_produto = ?
                    ds_especificacoes = ?
                    id_categoria = ?
                    id_marca = ?
                    bt_usado = ?
                    vl_peso = ?
                    dt_cadastro = ?
                    where id_produto = ?`

    let [resp] = await con.query(sql, [produto.nome,
                                       produto.preco,
                                       produto.estoque,
                                       produto.descricao,
                                       produto.especificacoes,
                                       produto.categoria,
                                       produto.marca,
                                       produto.usado,
                                       produto.peso,
                                       produto.cadastro,
                                       id]);

    let linhasAfetadas = resp.affectdRows
    return linhasAfetadas;               
}