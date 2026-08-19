const livros = [
  {
    id: 1,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    genero: "Romance",
    isbn: "978000000001",
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    genero: "Distopia",
    isbn: "978000000002",
  },
];

const resenhas = [
  {
    id: 1,
    titulo: "Um clássico brasileiro",
    conteudo: "Uma obra muito interessante e cheia de ambiguidades.",
    nota: 5,
    livro_id: 1,
  },
  {
    id: 2,
    titulo: "Distopia marcante",
    conteudo: "Uma leitura forte sobre vigilância e controle.",
    nota: 5,
    livro_id: 2,
  },
];

module.exports = {
  livros,
  resenhas,
};