import { AppError } from '../errors/errors';
import { loginEP } from './constants';
import fetchApi from './fetchApi';

const getLogin = (loginOrEmail, password) => {
  try {
    return fetchApi(loginEP, {
      method: 'POST',
      body: JSON.stringify({ loginOrEmail, password }),
    });
  } catch (error) {
    if (error instanceof AppError)
      throw AppError('Wrong Login or password', { context: error });
    throw error;
  }
};
export default getLogin;
