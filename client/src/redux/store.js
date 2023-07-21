import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsSlice from './slices/productsSlice';
import categoriesSlice from './slices/categoriesSlice';
import errorsSlice from './slices/errorsSlice';
import modalSlice from './slices/modalSlice';
import formSlice from './slices/formSlice';
// eslint-disable-next-line import/no-named-as-default
import productSlice from './slices/productSlice';
// eslint-disable-next-line import/no-named-as-default
import allProductSlice from './slices/allProdsSlice';
import filtersSlice from './slices/filtersSlice';
import basketSlice from './slices/basketSlice';
import searchSlice from './slices/searchSlice';
import searchResultsSlice from './slices/searchResultsSlice';
import orderSlice from './slices/orderSlice';
import headerSlice from './slices/headerSlice';
import allProdsHomeSlice from './slices/allProdsHomeSlice';

const rootReducer = combineReducers({
  products: productsSlice,
  categories: categoriesSlice,
  errors: errorsSlice,
  modal: modalSlice,
  form: formSlice,
  product: productSlice,
  allProducts: allProductSlice,
  filters: filtersSlice,
  basket: basketSlice,
  search: searchSlice,
  searchList: searchResultsSlice,
  order: orderSlice,
  burgerMenu: headerSlice,
  allProdsHomePage: allProdsHomeSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['basket'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export default store;
