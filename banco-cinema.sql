-- 🔁 Reiniciar o banco
DROP DATABASE IF EXISTS cinema_db;

-- criando o banco
CREATE DATABASE cinema_db;
USE cinema_db;

-- Tabela de Administradores
CREATE TABLE administrador (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nomeAdmin VARCHAR(100) NOT NULL,
  codAdmin VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(200) NOT NULL
);

-- Tabela de Funcionários
CREATE TABLE funcionario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nomeFunc VARCHAR(100) NOT NULL,
  codFunc VARCHAR(100) NOT NULL UNIQUE,
  senhaFunc VARCHAR(200) NOT NULL
);

-- Tabela de Filmes
CREATE TABLE filmes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descricao TEXT,
  duracao_min INT NOT NULL,
  cartaz_url VARCHAR(255)
);

-- Tabela de Sessões
CREATE TABLE sessoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filme_id INT NOT NULL,
  data_hora DATETIME NOT NULL,
  sala VARCHAR(50) NOT NULL,
  FOREIGN KEY (filme_id) REFERENCES filmes(id) ON DELETE CASCADE
);

-- Tabela de Cadeiras (por sessão)
CREATE TABLE cadeiras (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sessao_id INT NOT NULL,
  numero VARCHAR(10) NOT NULL,
  status ENUM('disponivel', 'processando', 'reservada') DEFAULT 'disponivel',
  FOREIGN KEY (sessao_id) REFERENCES sessoes(id) ON DELETE CASCADE
);

-- Tabela de Ingressos
CREATE TABLE ingressos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sessao_id INT NOT NULL,
  cadeira_id INT NOT NULL,
  nome_cliente VARCHAR(100) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sessao_id) REFERENCES sessoes(id),
  FOREIGN KEY (cadeira_id) REFERENCES cadeiras(id)
);

-- Tabela de Pagamentos
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

--  Inserir administrador (senha: "Tester001")
INSERT INTO administrador (nomeAdmin, codAdmin, senha)
VALUES ("Teste testador", "Tester001", "$2b$10$uD7m08ftXNqNg6J5YIVr9eO6RMHavcGMnXAAjgtgN6KBYRjrcPSQi");

--  Inserir funcionário (senha: "TesterFunc001")
INSERT INTO funcionario (nomeFunc, codFunc, senhaFunc)
VALUES ("Teste funcionario", "TesterFunc001", "$2b$10$3AfvhlUeD9HyhHLr7grzvuTfMCk4ZcPNH39aVfFxjaSL02V4z3xxO");


SELECT * FROM administrador;
SELECT * FROM funcionario;
show tables;
