drop database cinema_db;
create database cinema_db;
use cinema_db;

-- Tabela de Administradores
CREATE TABLE administrador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL -- Armazenar hash da senha
);

-- Tabela de Funcionários
CREATE TABLE funcionario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL, -- Armazenar hash da senha
    codigo_acesso VARCHAR(50) UNIQUE NOT NULL -- Código para login no balcão
);

-- Tabela de Filmes
CREATE TABLE filmes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    duracao_minutos INT,
    genero VARCHAR(100),
    idioma VARCHAR(50),
    data_lancamento DATE,
    url_capa VARCHAR(255) -- URL da imagem da capa do filme
);

-- Tabela de Sessões
CREATE TABLE sessoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filme_id INT NOT NULL,
    data_hora DATETIME NOT NULL,
    tipo_exibicao VARCHAR(50), -- Ex: "2D", "3D", "IMAX"
    idioma_audio VARCHAR(50), -- Ex: "Português", "Inglês"
    idioma_legenda VARCHAR(50), -- Ex: "Português", "Inglês", "Nenhuma"
    preco DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (filme_id) REFERENCES filmes(id) ON DELETE CASCADE
);

-- Tabela de Cadeiras
CREATE TABLE cadeiras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sessao_id INT NOT NULL,
    fila VARCHAR(10) NOT NULL,
    numero INT NOT NULL,
    status ENUM('disponivel', 'reservada', 'ocupada') DEFAULT 'disponivel',
    UNIQUE (sessao_id, fila, numero), -- Garante que a cadeira é única por sessão
    FOREIGN KEY (sessao_id) REFERENCES sessoes(id) ON DELETE CASCADE
);

-- Tabela de Ingressos
CREATE TABLE ingressos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sessao_id INT NOT NULL,
    cadeira_id INT NOT NULL,
    nome_cliente VARCHAR(100) NOT NULL,
    email_cliente VARCHAR(100),
    status ENUM('pendente_pagamento', 'pago', 'cancelado') DEFAULT 'pendente_pagamento',
    data_compra DATETIME DEFAULT CURRENT_TIMESTAMP,
    codigo_ingresso VARCHAR(50) UNIQUE NOT NULL, -- Código único para validação
    FOREIGN KEY (sessao_id) REFERENCES sessoes(id) ON DELETE CASCADE,
    FOREIGN KEY (cadeira_id) REFERENCES cadeiras(id) ON DELETE CASCADE
);

-- Tabela de Pagamentos
CREATE TABLE pagamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ingresso_id INT NOT NULL,
    funcionario_id INT, -- Opcional, para pagamentos no balcão
    valor DECIMAL(10, 2) NOT NULL,
    tipo_pagamento ENUM('credito', 'debito', 'pix', 'dinheiro') NOT NULL,
    origem ENUM('online', 'balcao') NOT NULL,
    data_pagamento DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ingresso_id) REFERENCES ingressos(id) ON DELETE CASCADE,
    FOREIGN KEY (funcionario_id) REFERENCES funcionario(id) ON DELETE SET NULL 
);