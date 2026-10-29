import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

export function useApi(url, options = { client: 'fetch' }) {
  const client = options.client;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const derniereRequete = useRef(0);

  const fetchData = useCallback(() => {
    derniereRequete.current += 1;
    const numero = derniereRequete.current;
    const estActuelle = () => numero === derniereRequete.current;

    setLoading(true);
    setError(null);

    const requete =
      client === 'axios'
        ? axios.get(url).then((res) => res.data)
        : fetch(url).then((res) => {
            if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
            return res.json();
          });

    requete
      .then((resultat) => {
        if (estActuelle()) setData(resultat);
      })
      .catch((err) => {
        if (estActuelle()) {
          setError(err.response ? `Code ${err.response.status}` : err.message);
        }
      })
      .finally(() => {
        if (estActuelle()) setLoading(false);
      });
  }, [url, client]);

  useEffect(() => {
    fetchData();
    return () => {
      derniereRequete.current += 1;
    };
  }, [fetchData]);

  return { data, loading, error, reload: fetchData };
}
