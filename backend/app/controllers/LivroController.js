// Cuida das rotas de Livro (CRUD) e faz a validação com Ajv.

const { livros, resenhas } = require("../data/store");

// Validação com Ajv
const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

// Schema do Livro
const schemaLivro = {
  type: "object",
  required: ["titulo", "autor", "isbn"],
  properties: {
    titulo: { type: "string", minLength: 1 },
    autor: { type: "string", minLength: 1 },
    genero: { type: "string", minLength: 1 },
    isbn: { type: "string", minLength: 3 },
  },
  additionalProperties: false,
};

const validateLivro = ajv.compile(schemaLivro);

const LivroController = {
  // POST /livros
  criar(req, res) {
    const valido = validateLivro(req.body);

    if (!valido) {
      return res.status(400).json({
        erro: "Dados inválidos para livro",
        detalhes: validateLivro.errors,
      });
    }

    const { titulo, autor, genero, isbn } = req.body;

    // Verifica ISBN duplicado
    const isbnJaExiste = livros.some((livro) => livro.isbn === isbn);

    if (isbnJaExiste) {
      return res.status(400).json({
        erro: "ISBN já cadastrado",
      });
    }

    const novoLivro = {
      id: livros.length > 0
        ? Math.max(...livros.map((livro) => livro.id)) + 1
        : 1,
      titulo,
      autor,
      genero: genero || "",
      isbn,
    };

    livros.push(novoLivro);

    return res.status(201).json(novoLivro);
  },

  // GET /livros
  listar(req, res) {
    return res.status(200).json(livros);
  },

  // GET /livros/:id
  buscarPorId(req, res) {
    const id = Number(req.params.id);

    const livro = livros.find((livro) => livro.id === id);

    if (!livro) {
      return res.status(404).json({
        erro: "Livro não encontrado",
      });
    }

    return res.status(200).json(livro);
  },

  // PUT /livros/:id
  atualizar(req, res) {
    const valido = validateLivro(req.body);

    if (!valido) {
      return res.status(400).json({
        erro: "Dados inválidos para livro",
        detalhes: validateLivro.errors,
      });
    }

    const id = Number(req.params.id);

    const indice = livros.findIndex((livro) => livro.id === id);

    if (indice === -1) {
      return res.status(404).json({
        erro: "Livro não encontrado",
      });
    }

    const { titulo, autor, genero, isbn } = req.body;

    // Verifica se o ISBN pertence a outro livro
    const isbnJaExiste = livros.some(
      (livro) => livro.isbn === isbn && livro.id !== id
    );

    if (isbnJaExiste) {
      return res.status(400).json({
        erro: "ISBN já cadastrado",
      });
    }

    livros[indice] = {
      id,
      titulo,
      autor,
      genero: genero || "",
      isbn,
    };

    return res.status(200).json(livros[indice]);
  },

  // DELETE /livros/:id
  deletar(req, res) {
    const id = Number(req.params.id);

    const indice = livros.findIndex((livro) => livro.id === id);

    if (indice === -1) {
      return res.status(404).json({
        erro: "Livro não encontrado",
      });
    }

    // Não permite excluir livro que possui resenhas
    const possuiResenhas = resenhas.some(
      (resenha) => resenha.livro_id === id
    );

    if (possuiResenhas) {
      return res.status(409).json({
        erro: "Não é possível excluir livro com resenhas vinculadas",
      });
    }

    livros.splice(indice, 1);

    return res.status(204).send();
  },
};

module.exports = LivroController;