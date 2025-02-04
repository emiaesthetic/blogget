import { useState, useEffect } from 'react';
import { URL_API } from '../api/constants.js';
import { useSelector } from 'react-redux';

export const usePostsData = endpoint => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.token.token);

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
