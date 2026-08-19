import Navbar from "../../components/shared/Navbar";
import { Link } from "react-router-dom";
import LivroFormCreate from "../../components/livros/LivroFormCreate";

const LivrosCreate = () => {
  return (
    <>
      <Navbar />

      <main className="container mt-3">
        <section aria-labelledby="titulo-criar-livro">
          <Link to="/livros" className="btn btn-outline-secondary">
            Voltar
          </Link>

          <h1 id="titulo-criar-livro" className="mt-3">
            Criar Livro
          </h1>

          <LivroFormCreate />
        </section>
      </main>
    </>
  );
};

export default LivrosCreate;