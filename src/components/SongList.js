import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from '../redux/slices/songsSlice';

const SongList = () => {
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  return (
    <div>
      <h1>Song List</h1>
      <ul>
        {songs.map(song => (
          <li key={song.id}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
