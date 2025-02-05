import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authLogout, authRequestAsync } from '../store/auth/authAction';

export const useAuth = () => {
  const auth = useSelector(state => state.auth.data);
  const error = useSelector(state => state.auth.error);
  const status = useSelector(state => state.auth.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authRequestAsync());
  }, []);

  const resetAuth = () => dispatch(authLogout());

  return { auth, error, status, resetAuth };
};
