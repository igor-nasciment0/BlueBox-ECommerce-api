create database bluebox_db;

use bluebox_db;

-- TABELA ADMIN

create table tb_admin (
	id_admin 			int primary key not null auto_increment,
	ds_nome 			varchar(100) not null,
	ds_sobrenome 		varchar(100) not null,
	ds_email 			varchar(100) not null,
	ds_senha 			varchar(100) not null,
	ds_telefone 		varchar(100) not null,
	ds_cpf 				varchar(100) not null,
	img_perfil 			varchar(100) not null
);


-- TABELAS DO CLIENTE

create table tb_endereco (
	id_endereco 		int primary key not null auto_increment,
	ds_logradouro 		varchar(200) not null,
	ds_bairro 			varchar(200) not null,
	ds_cidade 			varchar(200) not null,
	ds_cep 				varchar(100) not null,
	nr_endereco 		int not null,
	ds_complemento 		varchar(20) not null
);

create table tb_cliente (
	id_cliente 			int primary key  not null auto_increment,
	ds_nome 			varchar(100) not null,
	ds_sobrenome 		varchar(100) not null,
	ds_email 			varchar(100) not null,
	ds_senha 			varchar(100) not null,
	ds_telefone 		varchar(100) not null,
	ds_cpf 				varchar(100) not null,
	id_endereco 		int,
	dt_nascimento 		date not null,
	img_perfil 			varchar(500) not null,
	dt_cadastro 		date not null,
	foreign key (id_endereco) references tb_endereco(id_endereco)
);


-- TABELAS DO PRODUTO

create table tb_categoria (
	id_categoria 		int primary key not null auto_increment,
	ds_categoria 		varchar(200) not null
);

-- A tabela categorias deve conter categorias como "Jogos para PC", "Jogos para Xbox", além de "Consoles" e "Action Figures", para evitar criar uma "tabela plataformas"

create table tb_marca (
	id_marca			int primary key not null auto_increment,
	ds_marca 			varchar(200) not null
);

create table tb_produto (
	id_produto 			int primary key not null auto_increment,
	nm_produto 			varchar(300) not null,
	vl_preco 			numeric not null,
	vl_promocional		numeric not null,
	bt_promocao 		boolean not null,
	qtd_estoque 		numeric not null,
	ds_produto 			varchar(800) not null,
	ds_especificacoes 	varchar(400) not null,
	id_categoria 		int not null,
	id_marca 			int not null,
	bt_usado 			boolean not null,
	vl_peso 			int not null,
	dt_cadastro 		date not null,
	foreign key (id_categoria) references tb_categoria(id_categoria),
	foreign key (id_marca) references tb_marca(id_marca)
);

create table tb_produto_imagem (
	id_produto_imagem 	int primary key not null auto_increment,
	id_produto 			int not null,
	ds_imagem_url 		varchar(500) not null,
	bt_img_primaria 	boolean not null,
	foreign key (id_produto) references tb_produto(id_produto)
);

create table tb_comentario (
	id_comentario 		int primary key not null auto_increment,
	id_produto 			int not null,
	id_cliente 			int not null,
	ds_comentario 		varchar(500) not null,
	ds_nota 			numeric not null,
	dt_postagem 		datetime not null,
	nr_likes 			int not null,
	foreign key (id_produto) references tb_produto(id_produto),
	foreign key (id_cliente) references tb_cliente(id_cliente)
);

create table tb_cupom (
	id_cupom 			int primary key not null auto_increment,
	ds_cupom 			varchar(30) not null,
	vl_desconto 		decimal not null,
	dt_expiracao 		date not null
);

create table tb_cupom_produto (
	id_cupom_produto 	int primary key not null auto_increment,
	id_cupom 			int not null,
	id_produto 			int not null,
	foreign key (id_cupom) references tb_cupom(id_cupom),
	foreign key (id_produto) references tb_produto(id_produto)
);


-- TABELAS DO PEDIDO

create table tb_tipo_pagamento (
	id_pagamento 		int primary key not null auto_increment,
	tp_pagamento 		int not null
);

create table tb_estado_pedido (
	id_estado_pedido	int primary key not null auto_increment,
    ds_estado_pedido 	varchar(100) not null
);

create table tb_pedido (
	id_pedido 			int primary key not null auto_increment,
	id_cliente 			int not null,
	id_produto 			int not null,
	vl_preco_total 		numeric not null,
	id_estado_pedido	int not null,
	id_tipo_pagamento 	int not null,
	dt_compra 			date not null,
	dt_aprovacao 		date not null,
	dt_saida 			date not null,
	dt_entrega			date not null,
	foreign key (id_cliente) references tb_cliente(id_cliente),
	foreign key (id_produto) references tb_produto(id_produto),
	foreign key (id_estado_pedido) references tb_estado_pedido(id_estado_pedido),
	foreign key (id_tipo_pagamento) references tb_tipo_pagamento(id_pagamento)
);