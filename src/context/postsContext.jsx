import React from 'react';
import PropTypes from 'prop-types';
import { useFetch } from '../hooks/useFetch';

export const postsContext = React.createContext({});

export const PostsContextProvider = ({ children }) => {
  const { data: responseData, loading, error } = useFetch('/best');
  const posts = responseData?.data.children;

  return (
    <postsContext.Provider value={{ posts, loading, error }}>
      {children}
    </postsContext.Provider>
  );
};

PostsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
