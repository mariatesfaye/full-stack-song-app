## Full Stack Song Manager

This project is a full-stack web application for managing a list of songs. It includes a frontend built with ReactJS and Redux Toolkit for state management, and a backend server built with Node.js and Express. The backend provides RESTful API endpoints for CRUD operations on songs.
### Features
-View a list of songs
-Add a new song
-Update an existing song
-Delete a song
### Technologies Used
-ReactJS
-Redux Toolkit
-Redux-Saga
-Emotion and Styled System (for styling)
-Node.js
-Express
-JSON Web Tokens (JWT) for authentication
-Cors, Helmet, and Express Rate Limit for security measures
## Getting Started
To get a local copy up and running, follow these steps:
1. Clone the repository:

```bash
git clone https://github.com/mariatesfaye/full-stack-song-app.git
```
2. Install dependencies for both frontend and backend:
```bash
cd full-stack-song-manager
cd frontend && npm install
cd ../backend && npm install
```
3. Start the frontend and backend servers:
```bash
# In one terminal window/tab
cd frontend && npm start

# In another terminal window/tab
cd backend && npm start
```
4. Access the application in your browser:
```bash
http://localhost:3000
```

There are also two official plugins are available, installed along with vite:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh








