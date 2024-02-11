const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());

app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  skip: (req) => req.isAuthenticated,
});
app.use(limiter);

const users = [
  { id: '1', username: 'user1', password: 'password1' },
  { id: '2', username: 'user2', password: 'password2' },
];

const JWT_SECRET_KEY = 'da9d475c9e12841355e8f6a14c43edda5cf95b5f855f9e39d07a0ac472eb251d';

app.use((req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    req.isAuthenticated = false;
    return next();
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      req.isAuthenticated = false;
      return next();
    }

    req.isAuthenticated = true;
    req.user = user;
    next();
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET_KEY);
  res.json({ token });
});

let songs = [
  { id: '1', title: 'Song 1', artist: 'Artist 1' },
  { id: '2', title: 'Song 2', artist: 'Artist 2' },
];

app.get('/songs', isAuthenticated, (req, res) => {
  res.json(songs);
});

app.post('/songs', isAuthenticated, (req, res) => {
  const newSong = req.body;

  if (!newSong.title || !newSong.artist) {
    return res.status(400).json({ error: 'Title and artist are required fields.' });
  }

  newSong.id = (songs.length + 1).toString();
  songs.push(newSong);
  res.json(newSong);
});

app.put('/songs/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  const updatedSong = req.body;


  if (!updatedSong.title || !updatedSong.artist) {
    return res.status(400).json({ error: 'Title and artist are required fields.' });
  }

  const index = songs.findIndex((song) => song.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Song not found.' });
  }

  songs[index] = updatedSong;
  res.json(updatedSong);
});

app.delete('/songs/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  const index = songs.findIndex((song) => song.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Song not found.' });
  }

  songs.splice(index, 1);
  res.json({ message: 'Song deleted successfully' });
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated) {
    return next();
  }

  return res.status(401).json({ error: 'Unauthorized' });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
