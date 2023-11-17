import con from "./conexao.js"

export async function adicionarCupom(cupom) {
    let sql = 
    `
        insert into tb_cupom(ds_cupom, vl_desconto, dt_expiracao)
                      values(?, ?, ?)
    `

    let [r] = await con.query(sql, [cupom.codigo, cupom.percentDesconto, cupom.expiracao]);

    cupom.id = r.insertId;

    return cupom;
}

export async function adicionarProdutoCupom(idCupom, idProduto) {
    let sql =
    `
        insert into tb_cupom_produto(id_cupom, id_produto)
                              values(?, ?)
    `

    let [r] = await con.query(sql, [idCupom, idProduto]);

    return r;
}

export async function buscarCupom(codigo) {
    let sql = 
    `
        select id_cupom         idCupom,
               ds_cupom         codigo,
               vl_desconto      percentDesconto,
               dt_expiracao     expiracao
          from tb_cupom
         where ds_cupom         = ?
    `

    let [r] = await con.query(sql, [codigo]);

    return r[0];
}

export async function buscarProdutoCupom(idProduto, idCupom) {
    let sql = 
    `
        select id_cupom,
               id_produto
          from tb_cupom_produto
         where id_produto       = ?
           and id_cupom         = ?
    `

    let [r] = await con.query(sql, [idProduto, idCupom]);

    return r[0];
}