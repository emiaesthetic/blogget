import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postsRequestAsync } from '../store/posts/postsAction';

export const usePostsData = () => {
  const data = useSelector(state => state.posts.data);
  const status = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);
  const after = useSelector(state => state.posts.after);
  const isLast = useSelector(state => state.posts.isLast);
  const isAutoLoadEnabled = useSelector(state => state.posts.isAutoLoadEnabled);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postsRequestAsync());
  }, []);

  return { data, error, status, after, isLast, isAutoLoadEnabled };
};
