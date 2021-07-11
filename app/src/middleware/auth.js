import { getCookie } from '../utils/cookie';

export const isAuth = () => {
  const accessToken = getCookie('accessToken');
  return accessToken;
};
