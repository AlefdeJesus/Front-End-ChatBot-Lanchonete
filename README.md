# ChatBot Lanchonete - Sistema de Gerenciamento (Front-end) 🍔

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Alef%20Santos-blue)](https://www.linkedin.com/in/alef-santos-362807203)
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-green)]()
[![Licença](https://img.shields.io/badge/Licença-MIT-purple)]()

> Interface web para gerenciamento de pedidos e produtos de lanchonete com integração WhatsApp.

## 🔗 Links Relacionados

- [Back-end do Projeto](https://github.com/AlefdeJesus/Back-end-ChatBot-Lanchonete)
- [LinkedIn do Desenvolvedor](https://www.linkedin.com/in/alef-santos-362807203)

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Recursos](#-recursos)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Telas e Funcionalidades](#-telas-e-funcionalidades)
- [Integração com API](#-integração-com-api)
- [Demonstração](#-demonstração)

## 🎯 Visão Geral

O Front-end do ChatBot Lanchonete é uma interface web moderna e responsiva que permite:

- Gerenciamento completo de produtos (CRUD)
- Acompanhamento de pedidos em tempo real
- Visualização de status de conexão do WhatsApp
- Dashboard intuitivo com sistema Kanban
- Integração perfeita com o back-end via API REST

## 🚀 Recursos

### Gestão de Produtos

- ✅ Cadastro de novos produtos
- ✅ Edição de produtos existentes
- ✅ Exclusão de produtos
- ✅ Listagem com filtros e categorização

### Gestão de Pedidos

- ✅ Sistema Kanban para acompanhamento
- ✅ Atualização em tempo real
- ✅ Histórico de pedidos
- ✅ Detalhes completos do pedido

### Integração WhatsApp

- ✅ QR Code para conexão
- ✅ Status de conexão
- ✅ Desconexão segura

## 💻 Tecnologias

- HTML5
- CSS3
- JavaScript (ES6+)
- REST API
- WebSockets (para atualizações em tempo real)

## ⚙️ Instalação

1. Clone o repositório

```bash
git clone https://github.com/[seu-usuario]/Front-End-ChatBot-Lanchonete
```

2. Configure a URL da API

```javascript
// Edite o arquivo js/API.js
const API_LINK = "http://seu-servidor:3333";
```

3. Inicie um servidor web local



## 📁 Estrutura do Projeto

```
front-end/
├── js/
│   ├── API.js          # Configuração da API
│   ├── produto.js      # Lógica de produtos
│   ├── pedido.js       # Lógica de pedidos
│   └── perfil.js       # Gestão de perfil/WhatsApp
├── style/
│   └── style.css       # Estilos da aplicação
└── index.html          # Página principal
```

## 📱 Telas e Funcionalidades

### 1. Tela de Produtos

#### Recursos:

- Formulário de cadastro/edição
- Tabela de listagem
- Ações rápidas (editar/excluir)
- Validação de campos

#### Exemplo de Uso:

```javascript
// Cadastrar novo produto
const produto = {
  nome: "X-Burger",
  preco: 15.9,
  categoria: "🍔 Lanches",
  descricao: "Hambúrguer com queijo e salada",
};
```

### 2. Tela de Pedidos (Kanban)

#### Colunas:

- Pendente
- Em Preparo
- Pronto
- Entregue

#### Funcionalidades:

- Drag & Drop entre colunas
- Atualização automática de status
- Detalhes do pedido
- Notificações

### 3. Tela de Perfil/Configurações

#### Recursos:

- Conexão WhatsApp
- QR Code dinâmico
- Status de conexão
- Opção de desconexão

## 🔌 Integração com API

### Endpoints Principais:

#### Produtos

```javascript
// Listar produtos
GET /produto

// Cadastrar produto
POST /produto
Content-Type: application/json
{
    "nome": "string",
    "preco": number,
    "categoria": "string",
    "descricao": "string"
}

// Atualizar produto
PUT /produto/:id

// Deletar produto
DELETE /produto/:id
```

#### Pedidos

```javascript
// Listar pedidos
GET /pedido

// Atualizar status do pedido
PUT /pedido/:id
{
    "status": "em preparo" | "pronto" | "entregue"
}
```

#### WhatsApp

```javascript
// Obter QR Code
GET / qrcode;

// Desconectar WhatsApp
POST / desconectar;
```

## 🎬 Demonstração

### Layout Responsivo

O sistema se adapta a diferentes tamanhos de tela:

- Desktop (≥1200px)
- Tablet (≥768px)
- Mobile (≥320px)

### Fluxo de Trabalho

1. Conexão com WhatsApp via QR Code
2. Cadastro de produtos no sistema
3. Recebimento automático de pedidos
4. Gerenciamento via Kanban
5. Notificações automáticas ao cliente

## 👨‍💻 Autor

**Alef Santos**

- LinkedIn: [@alef-santos](https://www.linkedin.com/in/alef-santos-362807203)
- GitHub: [@AlefdeJesus](https://github.com/AlefdeJesus)

## 📄 Licença

Este projeto está sob a licença MIT.

---

<p align="center">
  Desenvolvido por Alef Santos
</p>
