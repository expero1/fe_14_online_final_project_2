import { ordersEP } from './constants';
import fetchApi from './fetchApi';

const getOrders = ({ token }) => {
  fetchApi(ordersEP, { headers: { Authorization: token } });
};
export default getOrders;
