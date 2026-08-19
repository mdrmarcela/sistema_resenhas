import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";

const API_URL = "http://localhost:3000";

const LivrosShow = () => {
  const { id } = useParams();

  const [livro, setLivro] = useState(null);
  const [resenhas, setResenhas] = useState([]);

  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [ok, setOk] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    conteudo: "",
    nota: 5,
  });

  const carregar = async () => {
    setErro("");
    setLoading(true);

    try {
      // GET do livro
      const respostaLivro = await fetch(`${API_URL}/livros/${id}`);
      const dadosLivro = await respostaLivro.json();

      if (!respostaLivro.ok) {
        throw new Error(
          dadosLivro.erro || "Erro ao carregar livro."
        );
      }

      setLivro(dadosLivro);

      // GET das resenhas do livro
      const respostaResenhas = await fetch(
        `${API_URL}/livros/${id}/resenhas`
      );

      const dadosResenhas = await respostaResenhas.json();

      if (!respostaResenhas.ok) {
        throw new Error(
          dadosResenhas.erro || "Erro ao carregar resenhas."
        );
      }

      setResenhas(
        Array.isArray(dadosResenhas) ? dadosResenhas : []
      );
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, [id]);

  const criarResenha = async (event) => {
    event.preventDefault();

    setErro("");
    setOk("");

    if (!form.titulo.trim() || !form.conteudo.trim()) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    const nota = Number(form.nota);

    if (nota < 1 || nota > 5) {
      setErro("A nota deve estar entre 1 e 5.");
      return;
    }

    const novaResenha = {
      titulo: form.titulo.trim(),
      conteudo: form.conteudo.trim(),
      nota,
    };

    try {
      const response = await fetch(
        `${API_URL}/livros/${id}/resenhas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(novaResenha),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.erro || "Erro ao criar resenha."
        );
      }

      setForm({
        titulo: "",
        conteudo: "",
        nota: 5,
      });

      setOk("Resenha criada com sucesso.");

      await carregar();
    } catch (error) {
      setErro(error.message);
    }
  };

  const deletarResenha = async (resenhaId) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta resenha?"
    );

    if (!confirmar) {
      return;
    }

    setErro("");
    setOk("");

    try {
      const response = await fetch(
        `${API_URL}/livros/${id}/resenhas/${resenhaId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));

        throw new Error(
          data.erro || "Erro ao excluir resenha."
        );
      }

      setOk("Resenha excluída com sucesso.");

      await carregar();
    } catch (error) {
      setErro(error.message);
    }
  };

  return (
    <>
      <Navbar />

      <main className="container mt-3">
        <Link to="/livros" className="btn btn-outline-secondary">
          Voltar
        </Link>

        {erro && (
          <div className="alert alert-danger mt-3" role="alert">
            {erro}
          </div>
        )}

        {ok && (
          <div className="alert alert-success mt-3" role="status">
            {ok}
          </div>
        )}

        {loading && (
          <div className="alert alert-info mt-3" role="status">
            Carregando...
          </div>
        )}

        {!loading && livro && (
          <>
            <section
              className="mt-3"
              aria-labelledby="titulo-livro"
            >
              <div className="d-flex flex-wrap gap-3 justify-content-between align-items-start">
                <div>
                  <h1 id="titulo-livro">
                    {livro.titulo}
                  </h1>

                  <p className="text-muted">
                    {livro.autor} • ISBN: {livro.isbn}
                    {livro.genero
                      ? ` • ${livro.genero}`
                      : ""}
                  </p>
                </div>

                <Link
                  className="btn btn-outline-secondary"
                  to={`/livros/${id}/edit`}
                >
                  Editar livro
                </Link>
              </div>
            </section>

            <hr />

            <section aria-labelledby="titulo-resenhas">
              <h2 id="titulo-resenhas">
                Resenhas
              </h2>

              <div className="list-group mt-3">
                {resenhas.map((resenha) => (
                  <article
                    key={resenha.id}
                    className="list-group-item"
                  >
                    <div className="d-flex flex-wrap justify-content-between gap-2">
                      <h3 className="h5 mb-0">
                        {resenha.titulo}
                      </h3>

                      <span>
                        Nota: {resenha.nota}/5
                      </span>
                    </div>

                    <p className="mt-2 mb-0">
                      {resenha.conteudo}
                    </p>

                    <div className="d-flex gap-2 mt-3">
                      <Link
                        className="btn btn-sm btn-outline-secondary"
                        to={`/livros/${id}/resenhas/${resenha.id}/edit`}
                      >
                        Editar
                      </Link>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          deletarResenha(resenha.id)
                        }
                      >
                        Excluir
                      </button>
                    </div>
                  </article>
                ))}

                {resenhas.length === 0 && (
                  <div className="alert alert-secondary mt-3">
                    Nenhuma resenha cadastrada para este livro.
                  </div>
                )}
              </div>
            </section>

            <hr />

            <section aria-labelledby="titulo-nova-resenha">
              <h2 id="titulo-nova-resenha">
                Nova resenha
              </h2>

              <form
                onSubmit={criarResenha}
                className="mt-3"
                style={{ maxWidth: 720 }}
              >
                <div className="mb-3">
                  <label
                    htmlFor="titulo-resenha"
                    className="form-label"
                  >
                    Título *
                  </label>

                  <input
                    id="titulo-resenha"
                    type="text"
                    className="form-control"
                    value={form.titulo}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        titulo: event.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="conteudo-resenha"
                    className="form-label"
                  >
                    Conteúdo *
                  </label>

                  <textarea
                    id="conteudo-resenha"
                    className="form-control"
                    rows="5"
                    value={form.conteudo}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        conteudo: event.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="nota-resenha"
                    className="form-label"
                  >
                    Nota *
                  </label>

                  <input
                    id="nota-resenha"
                    type="number"
                    min="1"
                    max="5"
                    className="form-control"
                    value={form.nota}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        nota: event.target.value,
                      })
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success"
                >
                  Publicar resenha
                </button>
              </form>
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default LivrosShow;