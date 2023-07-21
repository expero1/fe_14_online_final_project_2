import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getUser from '../../api/getUserInformation';
import { fetchUserInfo } from '../../redux/slices/userSlice';
import { fetchOrders } from '../../redux/slices/ordersSlice';
import { setToken } from '../../api/fetchApi';

function User() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  //   console.log(token);
  useEffect(() => {
    if (token) {
      setToken(token);
      dispatch(fetchUserInfo());
      dispatch(fetchOrders());
    }
  }, [token]);
  return <div>user:{token}</div>;
}
export default User;
