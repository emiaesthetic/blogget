import { useState, useEffect, useContext } from 'react';
import { tokenContext } from '../context/tokenContext.jsx';
import { URL_API } from '../api/constants';

export const useFetch = endpoint => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(tokenContext);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`${URL_API}${endpoint}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error(`Ошибка ${response.status}`);

        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, token]);

  return { data, loading, error };
};
