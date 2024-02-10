import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSong } from '../redux/slices/songsSlice';
import SongForm from './SongForm';

const SongUpdate = ({ match }) => {
  const dispatch = useDispatch();
  const songId = match.params.id;
  const songToUpdate = useSelector((state) => state.songs.find((song) => song.id === songId));

  const handleUpdateSong = (formData) => {
    dispatch(updateSong({ id: songId, updatedSong: formData }))
      .then(() => alert('Song updated successfully'))
      .catch((error) => console.error('Error updating song:', error));
  };

  return (
    <div>
      <h2>Update Song</h2>
      {songToUpdate ? (
        <SongForm onSubmit={handleUpdateSong} initialData={songToUpdate} />
      ) : (
        <p>Song not found.</p>
      )}
    </div>
  );
};

export default SongUpdate;
