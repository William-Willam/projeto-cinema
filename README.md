# 🎬 Projeto Cinema

## 📌 Descrição

Este projeto foi desenvolvido com o objetivo de simular o sistema de venda de ingressos de um cinema, com foco especial na **reserva de cadeiras por sessão**, garantindo que **nenhuma cadeira seja vendida mais de uma vez**, mesmo em situações de alta demanda.

A motivação para a criação deste sistema surgiu após um **evento real ocorrido no cinema do Shopping JK**, onde duas pessoas compraram ingressos para a **mesma cadeira**, gerando **conflito e constrangimento** durante a exibição do filme. O sistema proposto aqui busca evitar esse tipo de erro com um controle mais eficiente e seguro das reservas.

---

## 🎯 Objetivos do Projeto

- Evitar conflitos de assentos duplicados.
- Garantir que cada cadeira só possa ser reservada uma única vez por sessão.
- Simular uma aplicação completa com **frontend (React)** e **backend (Node.js + MySQL)**.
- Praticar conceitos de autenticação, requisições API REST, e controle de estados no React.
- Implementar controle de sessões e disponibilidade em tempo real.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- [React.js](https://reactjs.org/)
- Vite
- Axios
- TailwindCSS (ou outro sistema de estilização)

### Backend
- [Node.js](https://nodejs.org/)
- Express
- MySQL
- Sequelize (ou outro ORM)
- JWT (para autenticação)

---

## 📂 Funcionalidades

- 🔐 Login e cadastro de usuários
- 🎟️ Listagem de filmes em cartaz
- 🕒 Escolha de sessão (data e horário)
- 💺 Seleção de cadeiras disponíveis
- ✅ Confirmação de reserva
- 🔄 Prevenção de reservas duplicadas (concorrência controlada no backend)
- 🧾 Histórico de ingressos por usuário (em desenvolvimento)

---

## ⚠️ Prevenção de Erros

A lógica do backend foi construída com **transações no banco de dados** para garantir que duas pessoas não consigam reservar a mesma cadeira ao mesmo tempo, mesmo em condições de concorrência alta (ex: vários usuários clicando na mesma cadeira simultaneamente).

---

## 📈 Futuras Melhorias

- Integração com pagamento online (ex: Stripe ou PayPal)
- Geração de QR Code para entrada no cinema
- Dashboard administrativo para gerenciamento de sessões e salas
- Notificações por e-mail ou WhatsApp

---

## 👨‍💻 Autor

Desenvolvido por **William dos Santos** como parte de um estudo prático em desenvolvimento de sistemas web, inspirado por um caso real.

---

## 📝 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usá-lo e adaptá-lo com os devidos créditos.

