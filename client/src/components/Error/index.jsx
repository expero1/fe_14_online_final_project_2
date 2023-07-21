import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Alert } from '@mui/material';
import {
  clearErrors,
  removeErrorMessage,
} from '../../redux/slices/errorsSlice';

function ErrorList() {
  const dispatch = useDispatch();
  const errorList = useSelector(({ errors }) => errors.errors);
  console.log(errorList);
  const [lastError, setLastError] = useState([]);
  useEffect(() => {
    if (errorList.length) {
      setTimeout(() => dispatch(removeErrorMessage()), 5000);
    }
  }, [errorList.length]);
  return (
    <div style={{ position: 'fixed', bottom: '20px', zIndex: '10' }}>
      {errorList.map((error) => (
        <Alert
          sx={{ width: '90vw', margin: '30px', backgroundColor: 'red' }}
          variant="outlined"
          severity="error">
          {error}
        </Alert>
      ))}
    </div>
  );
}

// function Error({ error }) {
//   return error ? <div>{error}</div> : null;
// }
export default ErrorList;
