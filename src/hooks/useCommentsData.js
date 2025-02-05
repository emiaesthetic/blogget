import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { commentsRequestAsync } from '../store/comments/commentsAction';

export const useCommentsData = articleID => {
  const data = useSelector(state => state.comments.data);
  const loading = useSelector(state => state.comments.loading);
  const error = useSelector(state => state.comments.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(commentsRequestAsync(articleID));
  }, [articleID, dispatch]);

  return { data, loading, error };
};
