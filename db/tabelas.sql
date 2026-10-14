-- Cria apenas as tabelas, no banco já existente (ex.: banco "railway" do Railway)

CREATE TABLE IF NOT EXISTS produtos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(250) NOT NULL,
    quantidade INT NOT NULL,
    valor_unidade DECIMAL NOT NULL,
    categoria VARCHAR (250) NOT NULL
);

CREATE TABLE IF NOT EXISTS movimentacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dt DATETIME NOT NULL,
    tipo ENUM('Entrada', 'Saída') NOT NULL,
    quantidade INT NOT NULL,
    id_produtos INT NOT NULL,
    FOREIGN KEY (id_produtos) REFERENCES produtos(id)
);
