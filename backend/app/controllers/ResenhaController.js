// Cuida do CRUD de Resenhas e faz a validação com Ajv.

const { livros, resenhas } = require("../data/store");

const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

// Schema da Resenha
// livro_id vem pela URL:
// /livros/:livro_id/resenhas
const schemaResenha = {
  type: "object",
  required: ["titulo", "conteudo", "nota"],
  properties: {
    titulo: {
      type: "string",
      minLength: 1,
    },
    conteudo: {
      type: "string",
      minLength: 1,
    },
    nota: {
      type: "integer",
      minimum: 1,
      maximum: 5,
    },
  },
  additionalProperties: false,
};

const validateResenha = ajv.compile(schemaResenha);

const ResenhaController = {

  // GET /livros/:livro_id/resenhas
  listarPorLivro(req, res) {
    const livroId = Number(req.params.livro_id);

    const livro = livros.find(
      (livro) => livro.id === livroId
    );

    if (!livro) {
      return res.status(404).json({
        erro: "Livro não encontrado",
      });
    }

    const resenhasDoLivro = resenhas.filter(
      (resenha) => resenha.livro_id === livroId
    );

    return res.status(200).json(resenhasDoLivro);
  },


  // GET /livros/:livro_id/resenhas/:id
  buscarPorIdDoLivro(req, res) {
    const livroId = Number(req.params.livro_id);
    const id = Number(req.params.id);

    const resenha = resenhas.find(
      (resenha) =>
        resenha.id === id &&
        resenha.livro_id === livroId
    );

    if (!resenha) {
      return res.status(404).json({
        erro: "Resenha não encontrada para este livro",
      });
    }

    return res.status(200).json(resenha);
  },


  // POST /livros/:livro_id/resenhas
  criarParaLivro(req, res) {
    const valido = validateResenha(req.body);

    if (!valido) {
      return res.status(400).json({
        erro: "Dados inválidos para resenha",
        detalhes: validateResenha.errors,
      });
    }

    const livroId = Number(req.params.livro_id);

    const livro = livros.find(
      (livro) => livro.id === livroId
    );

    if (!livro) {
      return res.status(404).json({
        erro: "Livro não encontrado",
      });
    }

    const { titulo, conteudo, nota } = req.body;

    const novaResenha = {
      id:
        resenhas.length > 0
          ? Math.max(...resenhas.map((resenha) => resenha.id)) + 1
          : 1,

      titulo,
      conteudo,
      nota,
      livro_id: livroId,
    };

    resenhas.push(novaResenha);

    return res.status(201).json(novaResenha);
  },


  // PUT /livros/:livro_id/resenhas/:id
  atualizarDoLivro(req, res) {
    const valido = validateResenha(req.body);

    if (!valido) {
      return res.status(400).json({
        erro: "Dados inválidos para resenha",
        detalhes: validateResenha.errors,
      });
    }

    const livroId = Number(req.params.livro_id);
    const id = Number(req.params.id);

    const livro = livros.find(
      (livro) => livro.id === livroId
    );

    if (!livro) {
      return res.status(404).json({
        erro: "Livro não encontrado",
      });
    }

    const indice = resenhas.findIndex(
      (resenha) =>
        resenha.id === id &&
        resenha.livro_id === livroId
    );

    if (indice === -1) {
      return res.status(404).json({
        erro: "Resenha não encontrada para este livro",
      });
    }

    const { titulo, conteudo, nota } = req.body;

    resenhas[indice] = {
      id,
      titulo,
      conteudo,
      nota,
      livro_id: livroId,
    };

    return res.status(200).json(resenhas[indice]);
  },


  // DELETE /livros/:livro_id/resenhas/:id
  deletarDoLivro(req, res) {
    const livroId = Number(req.params.livro_id);
    const id = Number(req.params.id);

    const indice = resenhas.findIndex(
      (resenha) =>
        resenha.id === id &&
        resenha.livro_id === livroId
    );

    if (indice === -1) {
      return res.status(404).json({
        erro: "Resenha não encontrada para este livro",
      });
    }

    resenhas.splice(indice, 1);

    return res.status(204).send();
  },
};

module.exports = ResenhaController;