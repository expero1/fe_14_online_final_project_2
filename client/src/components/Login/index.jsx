import * as React from 'react';
import { useState } from 'react';
import { TextField, Button, FormGroup } from '@mui/material';
import { maxWidth } from '@mui/system';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../redux/slices/loginSlice';

function Login() {
  const emailOrLogin = useState();
  const password = useState();
  const dispatch = useDispatch();
  return (
    <section>
      <form
        id="loginForm"
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(
            login({
              loginOrEmail: 'customer11@gmail.com',
              password: '11111111',
            })
          );
        }}>
        <TextField name="emailOrLogin" id="emailOrLogin" label="login" />
        <TextField label="password" name="password" type="password" />
        <TextField
          label="hidden"
          name="hiden"
          type="hidden"
          hidden
          value="hidden"
        />
        <Button type="submit">Login</Button>
        <Button
          onClick={() => {
            dispatch(logout());
          }}>
          Clear
        </Button>
      </form>
    </section>
  );
}
export default Login;
