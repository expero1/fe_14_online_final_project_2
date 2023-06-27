import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import Basket from './pages/Basket';
import MainContent from './pages/Main';
import Header from './components/Header';
import ProductDescription from './components/ProductDescription';
import PageNotFound from './components/NFP';
import store from './redux/store';

function App() {
  // const id = useSelector() id товара
  const id = 123;
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<MainContent />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="basket" element={<Basket />} />
            <Route
              path={`home/product/:${id}`}
              element={<ProductDescription />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
