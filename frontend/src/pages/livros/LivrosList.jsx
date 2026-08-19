import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000";

const LivrosList = () => {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregarLivros = async () => {
    try {
      setCarregando(true);
      setErro("");

      const response = await fetch(`${API_URL}/livros`);

      if (!response.ok) {
        throw new Error("Não foi possível carregar os livros.");
      }

      const dados = await response.json();

      setLivros(dados);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  const excluirLivro = async (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este livro?"
    );

    if (!confirmar) return;

    try {
      setErro("");

      const response = await fetch(`${API_URL}/livros/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const dados = await response.json().catch(() => ({}));

        throw new Error(
          dados.erro || "Não foi possível excluir o livro."
        );
      }

      setLivros((livrosAtuais) =>
        livrosAtuais.filter((livro) => livro.id !== id)
      );
    } catch (error) {
      setErro(error.message);
    }
  };

  if (carregando) {
    return (
      <div className="alert alert-info" role="status">
        Carregando livros...
      </div>
    );
  }

  return (
    <section aria-labelledby="lista-livros">
      <h2 id="lista-livros" className="visually-hidden">
        Lista de livros
      </h2>

      {erro && (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      )}

      {livros.length === 0 ? (
        <div className="alert alert-secondary">
          Nenhum livro cadastrado.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Autor</th>
                <th scope="col">Gênero</th>
                <th scope="col">ISBN</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>

            <tbody>
              {livros.map((livro) => (
                <tr key={livro.id}>
                  <td>{livro.titulo}</td>
                  <td>{livro.autor}</td>
                  <td>{livro.genero || "-"}</td>
                  <td>{livro.isbn}</td>

                  <td>
                    <div className="d-flex flex-wrap gap-2">
                      <Link
                        to={`/livros/${livro.id}`}
                        className="btn btn-sm btn-primary"
                      >
                        Detalhes
                      </Link>

                      <Link
                        to={`/livros/${livro.id}/edit`}
                        className="btn btn-sm btn-warning"
                      >
                        Editar
                      </Link>

                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => excluirLivro(livro.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default LivrosList;