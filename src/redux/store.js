import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songsReducer from './slices/songsSlice';
import songsSaga from './sagas/songsSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    songs: songsReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(songsSaga);

export default store;
