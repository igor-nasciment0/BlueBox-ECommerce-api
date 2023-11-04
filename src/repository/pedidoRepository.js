import con from "./conexao.js"

export async function criarPedido(infoPedido) {
    let sql =
        `
        insert into tb_pedido(id_cliente, vl_produtos, vl_frete, id_estado_pedido, id_tipo_pagamento, dt_compra)
                       values(?, ?, ?, 1, ?, NOW());
    `

    let [r] = await con.query(sql, [infoPedido.idCliente,
                                    infoPedido.valorProdutos,
                                    infoPedido.valorFrete,
                                    infoPedido.idTipoPagamento]);  

    infoPedido.id = r.insertId;

    return infoPedido;
}

export async function adicionarProdutoPedido(idPedido, produto) {
    let sql =
    `
        insert into tb_pedido_produto(id_pedido, id_produto, vl_produto, ds_quantidade)
                                values(?, ?, ?, ?)
    `

    let [r] = await con.query(sql, [idPedido, produto.id, produto.preco, produto.quantidade]);

    return r;
}

export async function buscarPedidoPorEstado(IdEstadoPedido) {
    let sql =
        `
        select      id_pedido               id,
                    ds_nome                 nomeCliente,
                    ds_sobrenome            sobrenomeCliente,           
                    vl_produtos             valorProdutos,
                    vl_frete                valorFrete,
                    this.id_estado_pedido   idEstado,
                    ds_estado_pedido        estado,
                    tp_pagamento            tipoPagamento,
                    dt_compra               dataCompra,
                    dt_aprovacao            dataAprovacao,
                    dt_saida                dataSaida,
                    dt_entrega              dataEntrega
          from      tb_pedido               as this
    inner join      tb_cliente              on this.id_cliente = tb_cliente.id_cliente
    inner join      tb_estado_pedido        on this.id_estado_pedido = tb_estado_pedido.id_estado_pedido
    inner join      tb_tipo_pagamento       on this.id_tipo_pagamento = tb_tipo_pagamento.id_pagamento
     left join      tb_cupom                on this.id_cupom = tb_cupom.id_cupom 
         where      this.id_estado_pedido   = ?
    `

    let [r] = await con.query(sql, [IdEstadoPedido]);

    return r;
}

export async function buscarPedidoPorCliente(idCliente) {
    let sql =
        `
        select      id_pedido            id,
                    ds_nome              nomeCliente,
                    ds_sobrenome         sobrenomeCliente,           
                    vl_produtos          valorProdutos,
                    vl_frete             valorFrete,
                    ds_estado_pedido     estado,
                    tp_pagamento         tipoPagamento,
                    dt_compra            dataCompra,
                    dt_aprovacao         dataAprovacao,
                    dt_saida             dataSaida,
                    dt_entrega           dataEntrega
          from      tb_pedido
    inner join      tb_cliente           on tb_pedido.id_cliente = tb_cliente.id_cliente
    inner join      tb_estado_pedido     on tb_pedido.id_estado_pedido = tb_estado_pedido.id_estado_pedido
    inner join      tb_tipo_pagamento    on tb_pedido.id_tipo_pagamento = tb_tipo_pagamento.id_pagamento
    inner join      tb_cupom             on tb_pedido.id_cupom = tb_cupom.id_cupom 
         where      id_cliente          = ?
    `

    let [r] = await con.query(sql, [idCliente]);

    return r;
}

export async function buscarPedidoPorID(idPedido) {
    let sql =
        `
        select      id_pedido            id,
                    ds_nome              nomeCliente,
                    ds_sobrenome         sobrenomeCliente,           
                    vl_produtos          valorProdutos,
                    vl_frete             valorFrete,
                    ds_estado_pedido     estado,
                    tp_pagamento         tipoPagamento,
                    dt_compra            dataCompra,
                    dt_aprovacao         dataAprovacao,
                    dt_saida             dataSaida,
                    dt_entrega           dataEntrega
          from      tb_pedido
    inner join      tb_cliente           on tb_pedido.id_cliente = tb_cliente.id_cliente
    inner join      tb_estado_pedido     on tb_pedido.id_estado_pedido = tb_estado_pedido.id_estado_pedido
    inner join      tb_tipo_pagamento    on tb_pedido.id_tipo_pagamento = tb_tipo_pagamento.id_pagamento
    inner join      tb_cupom             on tb_pedido.id_cupom = tb_cupom.id_cupom 
         where      id_pedido           = ?
    `

    let [r] = await con.query(sql, [idPedido]);

    return r;
}

export async function buscarProdutosPedido(idPedido) {
    let sql =
        `
        select  id_pedido            idPedido,
                this.id_produto      idProduto,
                nm_produto           nomeProduto,
                vl_produto           precoProduto
          from  tb_pedido_produto    as this  
    inner join  tb_produto           on this.id_produto = tb_produto.id_produto
         where  id_pedido            = ?
    `

    let [r] = await con.query(sql, [idPedido]);

    return r;
}

export async function aprovarPagamento(idPedido) {
    let sql =
        `
        update      tb_pedido
           set      id_estado_pedido = 2,
                    dt_aprovacao      = NOW()
         where      id_pedido         = ?
    `

    let [r] = await con.query(sql, [idPedido]);

    return r;
}

export async function saiuParaEntrega(idPedido) {
    let sql =
        `
        update      tb_pedido
           set      id_estado_pedido = 3,
                    dt_saida          = NOW()
         where      id_pedido         = ?
    `

    let [r] = await con.query(sql, [idPedido]);

    return r;
}

export async function concluirPedido(idPedido) {
    let sql =
        `
        update      tb_pedido
           set      id_estado_pedido = 4,
                    dt_entrega        = NOW()
         where      id_pedido         = ?
    `

    let [r] = await con.query(sql, [idPedido]);

    return r;
}