import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postsRequestAsync } from '../store/posts/postsAction';

export const usePostsData = endpoint => {
  const data = useSelector(state => state.posts.data);
  const loading = useSelector(state => state.posts.loading);
  const error = useSelector(state => state.posts.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postsRequestAsync(endpoint));
  }, [endpoint, dispatch]);

  return { data, loading, error };
};
