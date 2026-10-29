import { useState, useEffect } from 'react';
import { useApi } from './hooks/useApi';

export default function AxiosUsers() {
  const { data, loading, error, reload } = useApi(
    'https://jsonplaceholder.typicode.com/users',
    { client: 'axios' }
  );
  const [query, setQuery] = useState('');
  const [seulementFavoris, setSeulementFavoris] = useState(false);
  const [favoris, setFavoris] = useState(() => {
    try {
      const sauvegarde = localStorage.getItem('utilisateursFavoris');
      return sauvegarde ? JSON.parse(sauvegarde) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('utilisateursFavoris', JSON.stringify(favoris));
  }, [favoris]);

  const basculerFavori = (id) => {
    setFavoris((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const users = Array.isArray(data) ? data : [];
  const filtered = users
    .filter((u) => u.name.toLowerCase().includes(query.toLowerCase()))
    .filter((u) => !seulementFavoris || favoris.includes(u.id));

  return (
    <div>
      <button onClick={reload} disabled={loading}>
        Recharger les utilisateurs
      </button>

      {loading && <p>Chargement des utilisateurs…</p>}
      {error && <p className="erreur">Erreur : {error}</p>}

      {!loading && !error && (
        <>
          <div>
            <input
              placeholder="Rechercher un utilisateur..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <label>
              <input
                type="checkbox"
                checked={seulementFavoris}
                onChange={(e) => setSeulementFavoris(e.target.checked)}
              />
              Favoris seulement
            </label>
          </div>
          <p className="compteur-favoris">
            {filtered.length} utilisateur(s) affiché(s) - {favoris.length} favori(s)
          </p>
          {filtered.length === 0 ? (
            <p>Aucun utilisateur trouvé.</p>
          ) : (
            <ul>
              {filtered.map((u) => (
                <li key={u.id}>
                  <button
                    className="favori"
                    onClick={() => basculerFavori(u.id)}
                    aria-label="Basculer le favori"
                  >
                    {favoris.includes(u.id) ? '★' : '☆'}
                  </button>
                  {u.name} – {u.email}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
