import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { commentsRequestAsync } from '../store/comments/commentsAction';

export const useCommentsData = articleID => {
  const post = useSelector(state => state.comments.post);
  const comments = useSelector(state => state.comments.comments);
  const error = useSelector(state => state.comments.error);
  const status = useSelector(state => state.comments.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(commentsRequestAsync(articleID));
  }, [articleID, dispatch]);

  return { post, comments, error, status };
};
