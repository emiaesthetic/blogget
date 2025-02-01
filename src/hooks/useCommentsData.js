import { useState, useEffect, useContext } from 'react';
import { tokenContext } from '../context/tokenContext.jsx';
import { URL_API } from '../api/constants';

export const useCommentsData = articleID => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(tokenContext);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`${URL_API}/comments/${articleID}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error(`Ошибка ${response.status}`);

        const json = await response.json();
        const {
          title,
          author,
          selftext: markdown,
        } = json[0].data.children[0].data;
        const comments = json[1].data.children;
        setData({ title, author, markdown, comments });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [articleID, token]);

  return { data, loading, error };
};
