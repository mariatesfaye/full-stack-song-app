const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and set security headers
app.use(cors());
app.use(helmet());

// Use JSON body parser
app.use(bodyParser.json());

// Limit requests to prevent abuse with advanced settings
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  skip: (req) => req.isAuthenticated, // skip rate limiting for authenticated users
});
app.use(limiter);

// Sample users data for authentication
const users = [
  { id: '1', username: 'user1', password: 'password1' },
  { id: '2', username: 'user2', password: 'password2' },
];

// JWT Secret key
const JWT_SECRET_KEY = 'da9d475c9e12841355e8f6a14c43edda5cf95b5f855f9e39d07a0ac472eb251d';

// Middleware for user authentication
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

// Endpoint for user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET_KEY);
  res.json({ token });
});

// Sample songs data
let songs = [
  { id: '1', title: 'Song 1', artist: 'Artist 1' },
  { id: '2', title: 'Song 2', artist: 'Artist 2' },
];

// Endpoint to get songs (protected route)
app.get('/songs', isAuthenticated, (req, res) => {
  res.json(songs);
});

// Endpoint to create a song (protected route)
app.post('/songs', isAuthenticated, (req, res) => {
  const newSong = req.body;

  // Validate input
  if (!newSong.title || !newSong.artist) {
    return res.status(400).json({ error: 'Title and artist are required fields.' });
  }

  newSong.id = (songs.length + 1).toString();
  songs.push(newSong);
  res.json(newSong);
});

// Endpoint to update a song (protected route)
app.put('/songs/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  const updatedSong = req.body;

  // Validate input
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

// Endpoint to delete a song (protected route)
app.delete('/songs/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  const index = songs.findIndex((song) => song.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Song not found.' });
  }

  songs.splice(index, 1);
  res.json({ message: 'Song deleted successfully' });
});

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated) {
    return next();
  }

  return res.status(401).json({ error: 'Unauthorized' });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
