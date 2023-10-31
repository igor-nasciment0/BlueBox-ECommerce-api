create database bluebox_db;

use bluebox_db;

-- TABELA ADMIN

create table tb_admin (
	id_admin 			int primary key not null auto_increment,
	ds_nome 			varchar(100) not null,
	ds_sobrenome 		varchar(100) not null,
	ds_email 			varchar(200) not null unique,
	ds_senha 			varchar(100) not null,
	ds_telefone 		varchar(100) not null,
	ds_cpf 				varchar(100) not null unique,
	img_perfil 			varchar(500)
);


-- TABELAS DO CLIENTE

create table tb_endereco (
	id_endereco 		int primary key not null auto_increment,
	ds_logradouro 		varchar(200) not null,
	ds_bairro 			varchar(200) not null,
	ds_cidade 			varchar(200) not null,
	ds_cep 				varchar(100) not null,
	nr_endereco 		int not null,
	ds_complemento 		varchar(20)
);

create table tb_cliente (
	id_cliente 			int primary key  not null auto_increment,
	ds_nome 			varchar(100) not null,
	ds_sobrenome 		varchar(100) not null,
	ds_email 			varchar(200) not null unique,
	ds_senha 			varchar(100) not null,
	ds_telefone 		varchar(100) not null,
	ds_cpf 				varchar(100) not null unique,
	id_endereco 		int,
	dt_nascimento 		date not null,
	img_perfil 			varchar(500),
	dt_cadastro 		datetime not null,
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
	vl_preco 			decimal(10, 2) not null,
	vl_promocional		decimal(10, 2),
	bt_promocao 		boolean not null,
	qtd_estoque 		int not null,
	ds_produto 			varchar(2500) not null,
	ds_especificacoes 	varchar(700) not null,
	id_categoria 		int not null,
	id_marca 			int not null,
	bt_usado 			boolean not null,
	vl_peso 			int not null,
	dt_cadastro 		datetime not null,
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

create table tb_avaliacao (
	id_avaliacao 		int primary key not null auto_increment,
	id_produto 			int not null,
	id_cliente 			int not null,
	ds_comentario 		varchar(500) not null,
	ds_nota 			int not null,
	dt_postagem 		datetime not null,
	foreign key (id_produto) references tb_produto(id_produto),
	foreign key (id_cliente) references tb_cliente(id_cliente)
);

create table tb_avaliacao_like(
	id_avaliacao_like	int primary key not null auto_increment,
	id_avaliacao		int not null,
	id_cliente			int not null,
	foreign key (id_avaliacao) references tb_avaliacao(id_avaliacao),
	foreign key (id_cliente) references tb_cliente(id_cliente)
);

create table tb_cupom (
	id_cupom 			int primary key not null auto_increment,
	ds_cupom 			varchar(30) not null,
	vl_desconto 		decimal(3, 2) not null,
	dt_expiracao 		datetime not null
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
	vl_preco_total 		decimal(10, 2) not null,
	vl_frete			decimal(10, 2) not null,
	id_estado_pedido	int not null,
	id_tipo_pagamento 	int not null,
	dt_compra 			datetime not null,
	dt_aprovacao 		datetime,
	dt_saida 			datetime,
	dt_entrega			datetime,
	foreign key (id_cliente) references tb_cliente(id_cliente),
	foreign key (id_produto) references tb_produto(id_produto),
	foreign key (id_estado_pedido) references tb_estado_pedido(id_estado_pedido),
	foreign key (id_tipo_pagamento) references tb_tipo_pagamento(id_pagamento)
);

create table tb_pedido_produto(
	id_pedido		int,
	id_produto		int,
	vl_produto		decimal(10, 2) not null,
	foreign key 	(id_produto) references tb_produto(id_produto),
	foreign key 	(id_pedido) references tb_pedido(id_pedido),
)


-- testes com dados aleatórios
       
       
insert into tb_categoria(ds_categoria)
	 values ('Console'),
	 		('Action Figure'),
			('Jogo para PC'),
			('Jogo para Xbox'),
			('Jogo para Playstation'),
			('Jogo para Nintendo');

insert into tb_marca(ds_marca)
	 values ('Microsoft'),
	 		('Sony'),
			('Nintendo'),
			('Bandai Namco');

		
insert into tb_produto(nm_produto, vl_preco, vl_promocional, bt_promocao, qtd_estoque, ds_produto, ds_especificacoes, id_categoria, id_marca, bt_usado, vl_peso, dt_cadastro)
     			values('The Legend of Zelda: Breath of the Wild', '50.50', '37.45', 1, '50', 'Explore horas de diversão com \"The Legend of Zelda: Breath of the Wild\", uma experiência emocionante para jogadores de todas as idades. Este jogo de ação e aventura oferece uma jogabilidade envolvente, gráficos deslumbrantes e uma narrativa cativante que o manterá imerso do início ao fim.\n\nEste jogo \"The Legend of Zelda: Breath of the Wild\" é um tesouro para qualquer fã da série Zelda ou jogador de Nintendo Switch. Aproveite a oportunidade de explorar o vasto mundo de Hyrule, resolver quebra-cabeças desafiadores e enfrentar inimigos formidáveis. Nossos jogos usados passam por uma rigorosa verificação de qualidade para garantir uma experiência de jogo excepcional.\n\nDescubra a diversão e a emoção de \"The Legend of Zelda: Breath of the Wild\" com a qualidade confiável da BlueBox. Encomende agora e desfrute de uma jornada épica pelo reino de Hyrule!', 'Plataforma: Nintendo Switch\nCondição: Usado - Excelente\nAno de Lançamento: 2017\nIdioma: Inglês (também disponível em outros idiomas)\nClassificação Etária: 10+\nConteúdo Incluso: Cartucho do jogo, caixa original e manual de instruções', 6, 3, 1, 250, '2023-10-19 21:51:40');

insert into tb_produto_imagem(id_produto, ds_imagem_url, bt_img_primaria)
	 				   values (1, 'storage\\imagens-produtos\\475a5e896c0523636f10925249d8cb60', 1),
					   		  (1, 'storage\\imagens-produtos\\9c689f57633a3009f0efd35289562d01', 0);

insert into tb_cliente(ds_nome, ds_sobrenome, ds_email, ds_senha, ds_telefone, ds_cpf, id_endereco, dt_nascimento, img_perfil, dt_cadastro)
				values('Igor', 'Nascimento', 'nascimentoigor1311@gmail.com', 'igor5432', '+55 (11) 99856-4237', '523.177.748-00', NULL, '2005-11-13', NULL, '2023-10-19 22:00:50');

insert into tb_admin (ds_nome, ds_sobrenome, ds_email, ds_senha, ds_telefone, ds_cpf)
			  values ('igao', 'o maioral', 'igaoreidelas@gmail.com', 'igaokingofhers', '11999', '999');