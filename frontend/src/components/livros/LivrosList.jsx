import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../shared/Toast";

const API_URL = "http://localhost:3000";

const LivrosList = () => {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [q, setQ] = useState("");
  const [sort, setSort] = useState("titulo_asc");
  const [busyId, setBusyId] = useState(null);

  async function carregar() {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/livros`);

      const data = await res.json().catch(() => []);

      if (!res.ok) {
        throw new Error(data?.erro || "Erro ao listar livros");
      }

      setLivros(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function deletar(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esse livro?"
    );

    if (!confirmar) {
      return;
    }

    setError("");
    setBusyId(id);

    try {
      const res = await fetch(`${API_URL}/livros/${id}`, {
        method: "DELETE",
      });

      if (!res.ok && res.status !== 204) {
        const data = await res.json().catch(() => ({}));

        throw new Error(
          data?.erro || "Erro ao excluir livro"
        );
      }

      setLivros((livrosAtuais) =>
        livrosAtuais.filter((livro) => livro.id !== id)
      );
    } catch (e) {
      setError(e.message);
    } finally {
      setBusyId(null);
    }
  }

  const livrosFiltrados = useMemo(() => {
    const term = q.trim().toLowerCase();

    if (!term) {
      return livros;
    }

    return livros.filter((livro) => {
      const titulo = (livro.titulo || "").toLowerCase();
      const autor = (livro.autor || "").toLowerCase();
      const isbn = (livro.isbn || "").toLowerCase();
      const genero = (livro.genero || "").toLowerCase();

      return (
        titulo.includes(term) ||
        autor.includes(term) ||
        isbn.includes(term) ||
        genero.includes(term)
      );
    });
  }, [livros, q]);

  const livrosOrdenados = useMemo(() => {
    const arr = [...livrosFiltrados];

    const byText = (a, b, field, dir) => {
      const valorA = (a?.[field] || "").toString();
      const valorB = (b?.[field] || "").toString();

      const resultado = valorA.localeCompare(
        valorB,
        "pt-BR",
        { sensitivity: "base" }
      );

      return dir === "asc" ? resultado : -resultado;
    };

    switch (sort) {
      case "titulo_desc":
        return arr.sort((a, b) =>
          byText(a, b, "titulo", "desc")
        );

      case "autor_asc":
        return arr.sort((a, b) =>
          byText(a, b, "autor", "asc")
        );

      case "autor_desc":
        return arr.sort((a, b) =>
          byText(a, b, "autor", "desc")
        );

      case "id_asc":
        return arr.sort(
          (a, b) => (a.id ?? 0) - (b.id ?? 0)
        );

      case "id_desc":
        return arr.sort(
          (a, b) => (b.id ?? 0) - (a.id ?? 0)
        );

      case "titulo_asc":
      default:
        return arr.sort((a, b) =>
          byText(a, b, "titulo", "asc")
        );
    }
  }, [livrosFiltrados, sort]);

  if (loading) {
    return (
      <div className="alert alert-info mb-0" role="status">
        Carregando livros...
      </div>
    );
  }

  return (
    <section aria-labelledby="titulo-lista-livros">
      <h2
        id="titulo-lista-livros"
        className="visually-hidden"
      >
        Lista de livros
      </h2>

      {error && (
        <Toast
          error={error}
          setError={setError}
        />
      )}

      <div className="card mb-3">
        <div className="card-body">
          <div className="row g-2 align-items-center">

            <div className="col-12 col-lg-6">
              <label
                className="form-label mb-1"
                htmlFor="busca-livros"
              >
                Buscar
              </label>

              <input
                id="busca-livros"
                type="search"
                className="form-control"
                placeholder="Digite título, autor, ISBN ou gênero..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <div className="col-12 col-lg-4">
              <label
                className="form-label mb-1"
                htmlFor="ordenacao-livros"
              >
                Ordenar por
              </label>

              <select
                id="ordenacao-livros"
                className="form-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="titulo_asc">
                  Título (A-Z)
                </option>

                <option value="titulo_desc">
                  Título (Z-A)
                </option>

                <option value="autor_asc">
                  Autor (A-Z)
                </option>

                <option value="autor_desc">
                  Autor (Z-A)
                </option>

                <option value="id_desc">
                  Mais recentes
                </option>

                <option value="id_asc">
                  Mais antigos
                </option>
              </select>
            </div>

            <div className="col-12 col-lg-2 d-grid">
              <button
                type="button"
                className="btn btn-outline-secondary mt-lg-4"
                onClick={carregar}
              >
                Atualizar
              </button>
            </div>
          </div>

          <p className="text-muted mt-2 mb-0">
            Mostrando{" "}
            <strong>{livrosOrdenados.length}</strong>{" "}
            de <strong>{livros.length}</strong>
          </p>
        </div>
      </div>

      {livrosOrdenados.length === 0 ? (
        <div className="alert alert-secondary">
          Nenhum livro encontrado.
        </div>
      ) : (
        <div className="list-group">
          {livrosOrdenados.map((livro) => (
            <article
              key={livro.id}
              className="list-group-item"
            >
              <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">

                <div style={{ minWidth: 0 }}>
                  <h3 className="h5 fw-bold mb-1">
                    {livro.titulo}
                  </h3>

                  <p className="text-muted mb-0">
                    {livro.autor} • ISBN: {livro.isbn}
                    {livro.genero
                      ? ` • ${livro.genero}`
                      : ""}
                  </p>
                </div>

                <div className="d-flex flex-wrap gap-2">
                  <Link
                    className="btn btn-sm btn-outline-primary"
                    to={`/livros/${livro.id}`}
                  >
                    Detalhes
                  </Link>

                  <Link
                    className="btn btn-sm btn-outline-secondary"
                    to={`/livros/${livro.id}/edit`}
                  >
                    Editar
                  </Link>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deletar(livro.id)}
                    disabled={busyId === livro.id}
                  >
                    {busyId === livro.id
                      ? "Excluindo..."
                      : "Excluir"}
                  </button>
                </div>

              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default LivrosList;