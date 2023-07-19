import { AppError } from '../errors/errors';
import { userInfoEP } from './constants';
import fetchApi from './fetchApi';
// import useToken from './useToken';
// import useToken from './useToken';
// import store from '../redux/store';

const getUser = ({ token }) => {
  try {
    return fetchApi(userInfoEP, { headers: { Authorization: token } });
  } catch (error) {
    if (error instanceof AppError) {
      if (error.context.status === 401)
        throw new AppError('Not Authorized', error);
    }
    throw error;
  }
};
export default getUser;
