-- COMANDOS DE CRIAÇÃO DA ESTRUTURA (DDL)

create table autores(
	id serial not null primary key,
	nome varchar(50) not null,
	nacionalidade varchar(20),
	criado_em timestamp 
);

alter table autores
alter column criado_em
set default now()

create table livros(
	id serial not null primary key,
	nome varchar(50) not null unique,
	isbn varchar(13) not null unique,
	autor_id integer not null,
	criado_em timestamp default now(),
	constraint autores_livros
	foreign key(autor_id) references autores(id)
);

alter table livros
add column Esta_Disponivel boolean default true;

create table clientes(
	id serial not null primary key,
	nome varchar(50) not null,
	cpf varchar(11) not null unique,
	telefone varchar(11) not null unique,
	criado_em timestamp default now()
);

create table emprestimos(
	id serial not null primary key,
	data_emprestimo date default now(),
	data_devolucao_prevista date,
	data_devolucao_real date,
	
	cliente_id integer not null,
	constraint clientes_emprestimos
	foreign key(cliente_id) references clientes(id),

	livro_id integer not null,
	constraint livros_emprestimos
	foreign key(livro_id) references livros(id)
)

alter table emprestimos
alter column data_devolucao_prevista
set not null;

--COMANDOS DE POPULAÇÃO DAS TABELAS (DML).

insert into autores(nome, nacionalidade)
values
	('JRR Tolkien', 'Inglês'),
	('JK Rowling', 'Inglês'),
	('GRR Martin', 'Americano'),
	('Fiódor Dostoiévski', 'Russo'),
	('George Orwell','Inglês')

insert into livros(nome, isbn, autor_id)
values
	('O Senhor dos Anéis: A Sociedade do Anel', '9788595084759', 1),
	('O Silmarillion', '9786560050020', 1),
	('Contos Inacabados', '9788595085701', 1),
	('Harry Potter e a Pedra Filosofal', '9788532530783', 2),
	('Harry Potter e a Câmara Secreta', '9788532530554', 2),
	('A Guerra dos Tronos', '9788556510785', 3),
	('Noites Brancas', '9788573263350', 4),
	('Crime e Castigo', '9788573266467', 4),
	('Gente Pobre', '9788573264333', 4),
	('1984', '9788535932966', 5)

insert into clientes(nome, cpf, telefone)
values
	('Matheus','12345678911','912345678'),
	('Milene','12345678912','912345679'),
	('Joaquina','12345678913','9123456787')

insert into emprestimos(data_devolucao_prevista, cliente_id, livro_id)
values
	('2026-10-30', 1, 1),
	('2026-10-30', 1, 2),
	('2026-10-30', 1, 3),
	('2026-10-30', 2, 4),
	('2026-10-30', 2, 5),
	('2026-10-30', 3, 6),
	('2026-10-30', 3, 7),
	('2026-10-30', 3, 8),
	('2026-10-30', 3, 10)

--Exemplo de DELETE.
delete from emprestimos where id=1;

--Exemplo de UPDATE.
update emprestimos
set data_devolucao_real = CURRENT_DATE
where id=2

--Exemplo de agregações para consultas envolvendo mais de uma tabela.

--Consulta que retorna os livros disponíveis para empréstimo.
select l.* from livros l
left join emprestimos e
    on e.livro_id = l.id
    and e.data_devolucao_real is null
where e.id is null;

--Consulta que retorna os livros emprestados no momento
select l.* from livros l
join emprestimos e
    on e.livro_id = l.id
where e.data_devolucao_real is null;

-- Consulta que retorna a quantidade de livros cadastraos por autor.
Select a.id, a.nome, count(l.id) as quantidade_livros
from autores a
left join livros l
    on l.autor_id = a.id
group by a.id, a.nome
order by quantidade_livros desc;

--Consulta que retorna a quantidade de empréstimos por livro
select l.id,l.nome, count(e.id) as quantidade_emprestimos
from livros l
left join emprestimos e
    on e.livro_id = l.id
group by l.id, l.nome
order by quantidade_emprestimos desc;

--Consulta que retorna clientes com empréstimos ativos;
select distinct c.*
from clientes c
join emprestimos e
    on e.cliente_id = c.id
where e.data_devolucao_real is null;

--Consulta que retorna o autor mais consumido no momento.
select a.id, a.nome, count(e.id) as quantidade_emprestados
from autores a
inner join livros l
    on l.autor_id = a.id
inner join emprestimos e
    on e.livro_id = l.id
where e.data_devolucao_real is null
group by a.id, a.nome
order by quantidade_emprestados desc
limit 1;

--consulta que retorna o autor com mais livros cadastrados.
select a.id, a.nome, count(l.id) as quantidade_livros
from autores a
inner join livros l
    on l.autor_id = a.id
group by a.id, a.nome
order by quantidade_livros desc
limit 1;


--Consultas para conferir o estado atual das tabelas.
select * from autores;
select * from livros;
select * from clientes;
select * from emprestimos;