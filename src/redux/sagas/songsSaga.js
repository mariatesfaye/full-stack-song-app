import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { setSongs, addSong, updateSong, deleteSong } from '../slices/songsSlice';

// Replaced 'API_URL' with my actual API endpoint
const API_URL = 'http://localhost:5000';
;

function* fetchSongs() {
  try {
    const response = yield call(axios.get, `${API_URL}/songs`);
    yield put(setSongs(response.data));
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
}

function* createSong(action) {
  try {
    const response = yield call(axios.post, `${API_URL}/songs`, action.payload);
    yield put(addSong(response.data));
  } catch (error) {
    console.error('Error creating song:', error);
  }
}

function* updateSongSaga(action) {
  try {
    const { id, updatedSong } = action.payload;
    yield call(axios.put, `${API_URL}/songs/${id}`, updatedSong);
    yield put(updateSong({ id, updatedSong }));
  } catch (error) {
    console.error('Error updating song:', error);
  }
}

function* deleteSongSaga(action) {
  try {
    const id = action.payload;
    yield call(axios.delete, `${API_URL}/songs/${id}`);
    yield put(deleteSong(id));
  } catch (error) {
    console.error('Error deleting song:', error);
  }
}

function* songsSaga() {
  yield takeEvery('songs/fetchSongs', fetchSongs);
  yield takeEvery('songs/createSong', createSong);
  yield takeEvery('songs/updateSong', updateSongSaga);
  yield takeEvery('songs/deleteSong', deleteSongSaga);
}

export default songsSaga;
