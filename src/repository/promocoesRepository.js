import con from "./conexao.js";

export async function alternarPromocao(idProduto, btPromocao) {
    let sql = 
    `
        update tb_produto
           set bt_promocao      = ?
         where id_produto       = ?
    `

    let [resp] = await con.query(sql, [btPromocao, idProduto]); 

    return resp.affectedRows;
}

export async function alterarValorPromocao(idProduto, valorPromocao) {
    let sql = 
    `
        update tb_produto
           set vl_promocional       = ?
         where id_produto           = ?
    `

    let [resp] = await con.query(sql, [valorPromocao, idProduto]);

    return resp.affectedRows;
}