# Sistema de Livros e Resenhas — Full Stack

Aplicação Web Full Stack desenvolvida para gerenciamento de **livros e resenhas**.

O sistema permite cadastrar, visualizar, editar e excluir livros, além de registrar e gerenciar resenhas relacionadas a cada livro.

O projeto utiliza uma arquitetura separada entre **Front-End** e **Back-End**, com comunicação realizada através de uma **API REST utilizando Fetch API e JSON**.

---

## Problema

O projeto busca facilitar a organização de livros e resenhas em uma única aplicação.

Através do sistema, o usuário pode manter uma biblioteca de livros cadastrados e registrar avaliações e comentários sobre cada obra.

---

## Arquitetura

```text
React + Vite
     ↓
  Fetch API
     ↓
API REST
Node.js + Express
     ↓
Arrays e objetos JavaScript
```

Os dados são armazenados temporariamente no servidor utilizando arrays e objetos JavaScript.

Por esse motivo, ao encerrar e iniciar novamente o Back-End, os dados cadastrados durante a execução são reiniciados para os valores definidos no arquivo `store.js`.

---

## Tecnologias Utilizadas

### Front-End

* React
* Vite
* JavaScript ES6+
* React Router
* Bootstrap
* HTML semântico
* CSS responsivo
* Fetch API

### Back-End

* Node.js
* NPM
* Express.js
* Ajv
* CORS
* JavaScript
* JSON

---

## Funcionalidades

### Livros

* Cadastrar livro;
* Listar livros;
* Visualizar detalhes de um livro;
* Editar livro;
* Excluir livro;
* Buscar livros por título, autor, ISBN ou gênero;
* Ordenar a listagem de livros.

### Resenhas

* Listar resenhas de um livro;
* Criar resenha;
* Visualizar resenha;
* Editar resenha;
* Excluir resenha;
* Avaliar o livro com nota entre 1 e 5.

### Validações

A aplicação possui validações no Front-End e no Back-End.

Entre as validações implementadas estão:

* impedimento de campos obrigatórios vazios;
* validação do ISBN;
* validação da nota da resenha entre 1 e 5;
* impedimento de ISBN duplicado;
* verificação da existência do livro;
* verificação da existência da resenha;
* mensagens de erro e sucesso para o usuário;
* tratamento de erros nas requisições HTTP.

---

## API REST

### Livros

| Método   | Rota          | Função              |
| -------- | ------------- | ------------------- |
| `GET`    | `/livros`     | Listar livros       |
| `GET`    | `/livros/:id` | Buscar livro por ID |
| `POST`   | `/livros`     | Cadastrar livro     |
| `PUT`    | `/livros/:id` | Atualizar livro     |
| `DELETE` | `/livros/:id` | Excluir livro       |

### Resenhas

As resenhas são tratadas como recurso relacionado a um livro.

| Método   | Rota                             | Função                   |
| -------- | -------------------------------- | ------------------------ |
| `GET`    | `/livros/:livro_id/resenhas`     | Listar resenhas do livro |
| `GET`    | `/livros/:livro_id/resenhas/:id` | Buscar uma resenha       |
| `POST`   | `/livros/:livro_id/resenhas`     | Criar resenha            |
| `PUT`    | `/livros/:livro_id/resenhas/:id` | Atualizar resenha        |
| `DELETE` | `/livros/:livro_id/resenhas/:id` | Excluir resenha          |

---

## Estrutura do Projeto

```text
Resenhas - Full Stack/
│
├── backend/
│   ├── app/
│   │   ├── controllers/
│   │   │   ├── LivroController.js
│   │   │   └── ResenhaController.js
│   │   │
│   │   ├── data/
│   │   │   └── store.js
│   │   │
│   │   └── routes/
│   │       └── livro.routes.js
│   │
│   ├── app.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── livros/
│   │   │   ├── resenhas/
│   │   │   └── shared/
│   │   │
│   │   ├── pages/
│   │   │   ├── livros/
│   │   │   └── resenhas/
│   │   │
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

# Instalação e Execução

## Pré-requisitos

É necessário possuir o **Node.js** e o **NPM** instalados.

Para o Front-End com a versão utilizada do Vite, recomenda-se utilizar:

```text
Node.js 20.19 ou superior
```

ou uma versão atual da linha Node.js 22.

É possível verificar as versões instaladas utilizando:

```bash
node -v
npm -v
```

---

## 1. Executar o Back-End

Abra um terminal na pasta do projeto e acesse:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor ficará disponível em:

```text
http://localhost:3000
```

Para verificar se a API está funcionando, acesse:

```text
http://localhost:3000/health
```

A resposta esperada é semelhante a:

```json
{
  "ok": true,
  "mensagem": "API funcionando"
}
```

---

## 2. Executar o Front-End

Mantenha o Back-End em execução e abra **outro terminal**.

Acesse:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o Front-End:

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:5173
```

Abra esse endereço no navegador.

---

## Build do Front-End

Para verificar se o projeto pode ser compilado corretamente para produção:

```bash
cd frontend
npm run build
```

Ao concluir sem erros, o Vite gera a pasta:

```text
dist/
```

---

# Como Testar o Sistema

Os testes funcionais do projeto foram realizados manualmente através da própria interface da aplicação.

## Teste do CRUD de Livros

### CREATE — Cadastrar

1. Acesse a página de livros;
2. Clique em **Criar Livro**;
3. Informe título, autor, gênero e ISBN;
4. Clique em **Salvar**;
5. Verifique se o novo livro aparece na listagem.

Operação utilizada:

```text
POST /livros
```

### READ — Consultar

Na página principal de livros, verifique se os registros cadastrados são exibidos.

Também é possível clicar em **Detalhes** para visualizar individualmente um livro.

Operações utilizadas:

```text
GET /livros
GET /livros/:id
```

### UPDATE — Editar

1. Clique em **Editar**;
2. Modifique algum campo;
3. Clique em **Salvar alterações**;
4. Verifique se os novos dados aparecem na interface.

Operação utilizada:

```text
PUT /livros/:id
```

### DELETE — Excluir

1. Clique em **Excluir**;
2. Confirme a exclusão;
3. Verifique se o livro desaparece da listagem.

Operação utilizada:

```text
DELETE /livros/:id
```

---

## Teste do CRUD de Resenhas

Abra os detalhes de um livro.

### CREATE

Preencha:

* título da resenha;
* conteúdo;
* nota entre 1 e 5.

Clique em **Publicar resenha**.

```text
POST /livros/:livro_id/resenhas
```

### READ

As resenhas do livro são carregadas automaticamente.

```text
GET /livros/:livro_id/resenhas
```

### UPDATE

Clique em **Editar**, altere os dados e salve.

```text
PUT /livros/:livro_id/resenhas/:id
```

### DELETE

Clique em **Excluir** e confirme.

```text
DELETE /livros/:livro_id/resenhas/:id
```

---

# Testes de Validação

Também foram realizados testes com dados inválidos.

Exemplos:

* tentativa de cadastrar livro sem título;
* tentativa de cadastrar livro sem autor;
* ISBN menor que o tamanho permitido;
* ISBN já cadastrado;
* criação de resenha sem título;
* criação de resenha sem conteúdo;
* nota menor que 1;
* nota maior que 5;
* tentativa de excluir um livro que ainda possui resenhas relacionadas.

A aplicação apresenta mensagens adequadas quando uma operação não pode ser concluída.

---

# Responsividade

A interface utiliza recursos responsivos do Bootstrap e regras próprias de CSS através de **media queries**.

Foram realizados testes utilizando o modo de dispositivos do **Chrome DevTools**, verificando a aplicação em diferentes larguras de tela, incluindo:

* desktop;
* tablet;
* smartphone.

Foram observados principalmente:

* adaptação dos formulários;
* quebra adequada dos botões;
* adaptação da barra de navegação;
* legibilidade dos textos;
* ausência de rolagem horizontal indevida;
* adaptação das listas e cards.

---

# Acessibilidade e Usabilidade

A aplicação foi desenvolvida considerando princípios básicos de acessibilidade e diretrizes WCAG.

Entre as práticas adotadas estão:

* uso de HTML semântico;
* utilização de `header`, `nav`, `main`, `section`, `article` e `form`;
* hierarquia adequada de títulos;
* associação de `label` aos campos de formulário;
* identificação adequada dos campos;
* possibilidade de navegação por teclado;
* mensagens com `role="alert"` e `role="status"`;
* contraste adequado entre texto e fundo;
* possibilidade de ampliação da página através do zoom do navegador;
* adaptação da interface para telas menores.

## Ferramentas utilizadas para avaliação

A acessibilidade foi avaliada utilizando o **Lighthouse do Google Chrome**.

Nos testes realizados nas principais páginas da aplicação, foi obtida pontuação de aproximadamente:

```text
Accessibility: 95
Best Practices: 100
```

Durante os primeiros testes, o Lighthouse identificou problemas relacionados ao contraste e à configuração de zoom da página.

Após os ajustes no `viewport` e nas cores dos textos secundários, a pontuação de acessibilidade foi melhorada.

Também foram realizados testes manuais utilizando:

* navegação com `Tab`;
* navegação com `Shift + Tab`;
* utilização dos links e botões pelo teclado;
* zoom do navegador em até 200%;
* modo responsivo do Chrome DevTools.

---

# Armazenamento dos Dados

O projeto não utiliza banco de dados.

Os dados são armazenados temporariamente em arrays e objetos JavaScript dentro do Back-End.

Arquivo responsável:

```text
backend/app/data/store.js
```

Ao reiniciar o servidor, os dados retornam ao estado inicial definido nesse arquivo.

---

# Fluxo da Aplicação

```text
Usuário
   ↓
Interface React
   ↓
Evento / Formulário
   ↓
Fetch API
   ↓
JSON
   ↓
API REST
   ↓
Express
   ↓
Controller
   ↓
Arrays JavaScript
   ↓
Resposta JSON
   ↓
Atualização da interface
```

---

