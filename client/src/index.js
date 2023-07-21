import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// or = function myErrorHandler(errorMsg, url, lineNumber) {
//   alert('Error occured: ' + errorMsg); //or any message
//   return false;
// };
// window.addEventListener('unhandledError', function (e) {
//   alert('Error occurred: ' + e.error.message);
//   return false;
// });
// window.onerr;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
