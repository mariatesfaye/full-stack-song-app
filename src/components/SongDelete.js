import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteSong } from '../redux/slices/songsSlice';

const SongDelete = ({ match, history }) => {
  const dispatch = useDispatch();
  const songId = match.params.id;

  const handleDeleteSong = () => {
    dispatch(deleteSong(songId))
      .then(() => {
        alert('Song deleted successfully');
        history.push('/');
      })
      .catch((error) => console.error('Error deleting song:', error));
  };

  return (
    <div>
      <h2>Delete Song</h2>
      <p>Are you sure you want to delete this song?</p>
      <button onClick={handleDeleteSong}>Delete</button>
    </div>
  );
};

export default SongDelete;
