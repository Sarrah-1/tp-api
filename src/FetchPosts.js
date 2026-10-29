import { useState } from 'react';
import { useApi } from './hooks/useApi';

const ARTICLES_PAR_PAGE = 10;
const NB_PAGES = 10;

export default function FetchPosts() {
  const [page, setPage] = useState(1);
  const { data, loading, error, reload } = useApi(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${ARTICLES_PAR_PAGE}`,
    { client: 'fetch' }
  );

  return (
    <div>
      <button onClick={reload} disabled={loading}>
        Recharger les articles
      </button>

      {loading && <p>Chargement des articles…</p>}
      {error && <p className="erreur">Erreur : {error}</p>}
      {!loading && !error && Array.isArray(data) && (
        <ul>
          {data.map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      )}

      <div>
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1 || loading}>
          Précédent
        </button>
        <span className="page-info">
          Page {page} / {NB_PAGES}
        </span>
        <button onClick={() => setPage((p) => p + 1)} disabled={page === NB_PAGES || loading}>
          Suivant
        </button>
      </div>
    </div>
  );
}
