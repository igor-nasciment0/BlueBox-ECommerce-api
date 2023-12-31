import con from "./conexao.js";

export async function consultaProduto(nome, filtro, ordem) {
    nome = `%${nome}%`;

    switch (ordem) {
        case "alfabetico":
            ordem = "nm_produto";
            break;
        case "preco_desc":
            ordem = "vl_preco DESC";
            break;
        case "preco_asc":
            ordem = "vl_preco";
            break;
        case "data":
            ordem = "dt_cadastro DESC";
            break;
        case "promoData":
            ordem = "bt_promocao DESC, dt_cadastro DESC"
            break;
        default:
            ordem = "id_produto";
    }

    switch (filtro) {
        case "promocao":
            filtro = 'and bt_promocao = true'
            break;
        default:
            filtro = '';
    }

    let sql =
        `
        select id_produto           id,
               nm_produto           nome,
               qtd_estoque          estoque,
               bt_usado             usado,
               vl_preco             preco,
               bt_promocao          promocao,
               vl_promocional       valorPromocional,
               ds_produto           descricao,
               ds_especificacoes    especificacoes,
               p.id_categoria       idCategoria,
               p.id_marca           idMarca,
               ds_categoria         categoria,
               ds_marca             marca,
               vl_peso              peso,
               dt_cadastro          dataCadastro
          from tb_produto           as p
    inner join tb_categoria         on p.id_categoria = tb_categoria.id_categoria
    inner join tb_marca             on p.id_marca = tb_marca.id_marca
         where (nm_produto          like ?
            or ds_marca             like ?
            or ds_categoria         like ?) ${filtro}
      order by                      ${ordem} 
    `

    let [resp] = await con.query(sql, [nome, nome, nome])

    return resp;
}

export async function consultaProdutoPagina(nome, categoria, filtro, ordem, pagina) {
    nome = `%${nome}%`;

    switch (ordem) {
        case "maior_preco":
            ordem = "vl_preco desc";
            break;
        case "menor_preco":
            ordem = "vl_preco";
            break;
        case "promoData":
            ordem = "bt_promocao DESC, dt_cadastro DESC"
            break;
        default:
            ordem = "id_produto";
    }

    switch (filtro) {
        case "usado":
            filtro = 'and bt_usado = true'
            break;
        case "novo":
            filtro = 'and bt_usado = false'
            break;
        default:
            filtro = '';
    }

    switch (categoria) {
        case "Playstation":
            categoria = "and p.id_categoria = 1"
            break;
        case "Xbox":
            categoria = "and p.id_categoria = 2"
            break;
        case "Nintendo":
            categoria = "and p.id_categoria = 3"
            break;
        case "Consoles":
            categoria = "and p.id_categoria = 4"
            break;
        case "Acessórios":
            categoria = "and p.id_categoria = 5"
            break;
        case "Raridades":
            categoria = "and p.id_categoria = 6"
            break;
        default:
            categoria = '';
    }

    let offset = (Number(pagina) - 1) * 20

    let sql =
        `
        select id_produto           id,
               nm_produto           nome,
               qtd_estoque          estoque,
               bt_usado             usado,
               vl_preco             preco,
               bt_promocao          promocao,
               vl_promocional       valorPromocional,
               ds_produto           descricao,
               ds_especificacoes    especificacoes,
               p.id_categoria       idCategoria,
               p.id_marca           idMarca,
               ds_categoria         categoria,
               ds_marca             marca,
               vl_peso              peso,
               dt_cadastro          dataCadastro
          from tb_produto           as p
    inner join tb_categoria         on p.id_categoria = tb_categoria.id_categoria
    inner join tb_marca             on p.id_marca = tb_marca.id_marca
         where nm_produto           like ? ${filtro} ${categoria}
      order by                      ${ordem} 
         limit 20 offset ?               
    `

    let [resp] = await con.query(sql, [nome, offset])

    return resp;
}

export async function consultaProdutoPorid(id) {
    let sql = `
        select id_produto           id,
               nm_produto           nome,
               qtd_estoque          estoque,
               bt_usado             usado,
               vl_preco             preco,
               bt_promocao          promocao,
               vl_promocional       valorPromocional,
               ds_produto           descricao,
               ds_especificacoes    especificacoes,
               p.id_categoria       idCategoria,
               p.id_marca           idMarca,
               ds_categoria         categoria,
               ds_marca             marca,
               vl_peso              peso,
               dt_cadastro          dataCadastro
          from tb_produto           as p
    inner join tb_categoria         on p.id_categoria = tb_categoria.id_categoria
    inner join tb_marca             on p.id_marca = tb_marca.id_marca 
         where id_produto           = ?
    `

    let [produto] = await con.query(sql, [id])
    return produto[0];
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

export async function inserirProduto(produto) {
    let sql = `
        insert into tb_produto(nm_produto, vl_preco, bt_promocao, qtd_estoque, ds_produto, ds_especificacoes, id_categoria, id_marca, bt_usado, vl_peso, dt_cadastro)
        values(?, ?, false, ?, ?, ?, ?, ?, ?, ?, NOW())
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

    produto.id = resp.insertId;

    return produto;
}

export async function alterarProduto(id, produto) {
    let sql = `update tb_produto
                  set nm_produto = ?,
                      vl_preco = ?,
                      qtd_estoque = ?,
                      ds_produto = ?,
                      ds_especificacoes = ?,
                      id_categoria = ?,
                      id_marca = ?,
                      bt_usado = ?,
                      vl_peso = ?,
                      dt_cadastro = NOW()
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
        id]);

    let linhasAfetadas = resp.affectedRows
    return linhasAfetadas;
}

export async function buscarImagens(idProduto) {
    let sql =
        `
        select id_produto_imagem    id,
               id_produto           idProduto,
               ds_imagem_url        url,
               bt_img_primaria      primaria
          from tb_produto_imagem
         where id_produto =         ?
    `

    let [resp] = await con.query(sql, [idProduto]);

    return resp;
}

export async function inserirImagemProduto(idProduto, imagem, primaria) {
    let sql =
        `
        insert into tb_produto_imagem (id_produto, ds_imagem_url, bt_img_primaria)
                               values (?, ?, ?);
    `

    let [resp] = await con.query(sql, [idProduto, imagem, primaria]);

    return resp.affectedRows;
}

export async function deletarImagem(idImagem) {
    let sql =
        `
        delete from     tb_produto_imagem
              where     id_produto_imagem = ?
    `

    let [resp] = await con.query(sql, [idImagem]);

    return resp.affectedRows;
}

export async function listarCategorias() {
    let sql =
        `
        select id_categoria     id,
               ds_categoria     categoria
          from tb_categoria
    `

    let [resp] = await con.query(sql, []);

    return resp;
}

export async function listarMarcas() {
    let sql =
        `
        select id_marca     id,
               ds_marca     marca
          from tb_marca
    `

    let [resp] = await con.query(sql);

    return resp;
}