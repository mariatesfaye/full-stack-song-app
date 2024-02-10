import { createSlice } from '@reduxjs/toolkit';

const songsSlice = createSlice({
  name: 'songs',
  initialState: [],
  reducers: {
    setSongs: (state, action) => {
      return action.payload;
    },
    addSong: (state, action) => {
      state.push(action.payload);
    },
    updateSong: (state, action) => {
      const { id, updatedSong } = action.payload;
      const songIndex = state.findIndex(song => song.id === id);
      if (songIndex !== -1) {
        state[songIndex] = updatedSong;
      }
    },
    deleteSong: (state, action) => {
      const id = action.payload;
      return state.filter(song => song.id !== id);
    },
  },
});

export const { setSongs, addSong, updateSong, deleteSong } = songsSlice.actions;

export default songsSlice.reducer;
