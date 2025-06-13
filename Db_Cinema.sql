-- Reiniciar banco de dados
DROP DATABASE IF EXISTS cinema_db;
CREATE DATABASE cinema_db;
USE cinema_db;

-- Tabela de administradores
CREATE TABLE admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codAdmin VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

-- Tabela de funcionários
CREATE TABLE funcionario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  codFunc VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

-- Tabela de filmes
CREATE TABLE filmes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descricao TEXT,
  duracao_min INT NOT NULL,
  cartaz_url VARCHAR(255)
);

-- Tabela de sessões
CREATE TABLE sessoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filme_id INT NOT NULL,
  data_hora DATETIME NOT NULL,
  sala VARCHAR(50) NOT NULL,
  FOREIGN KEY (filme_id) REFERENCES filmes(id) ON DELETE CASCADE
);

-- Tabela de cadeiras por sessão
CREATE TABLE cadeiras (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sessao_id INT NOT NULL,
  numero VARCHAR(10) NOT NULL,
  status ENUM('disponivel', 'processando', 'reservada') DEFAULT 'disponivel',
  FOREIGN KEY (sessao_id) REFERENCES sessoes(id) ON DELETE CASCADE
);

-- Tabela de ingressos
CREATE TABLE ingressos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sessao_id INT NOT NULL,
  cadeira_id INT NOT NULL,
  nome_cliente VARCHAR(100) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sessao_id) REFERENCES sessoes(id),
  FOREIGN KEY (cadeira_id) REFERENCES cadeiras(id)
);

-- Tabela de pagamentos
CREATE TABLE pagamento (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ingresso_id INT NOT NULL,
  tipo ENUM('pix', 'cartao', 'dinheiro') NOT NULL,
  origem ENUM('online', 'balcao') NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  pago_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  funcionario_id INT,
  FOREIGN KEY (ingresso_id) REFERENCES ingressos(id),
  FOREIGN KEY (funcionario_id) REFERENCES funcionario(id)
);


-- MODEL (Backend)
-- Inserir o primeiro admin com senha
INSERT INTO admin (codAdmin, senha)
VALUES ('ADM001', '$2a$10$J66CwA4eVvda63GmBQWnROXYTRhVD9gbJgHwXy7ZDuIXMPvUuTnRW');


