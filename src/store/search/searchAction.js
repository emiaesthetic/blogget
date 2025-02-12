export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';

export const searchRequest = search => ({
  type: SEARCH_REQUEST,
  search,
});

export const searchSuccess = ({ children, after }) => ({
  type: SEARCH_SUCCESS,
  posts: children,
  after,
});

export const searchError = error => ({
  type: SEARCH_ERROR,
  error,
});
