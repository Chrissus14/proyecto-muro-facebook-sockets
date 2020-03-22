import http from 'http';
import express from 'express';
import socketio from 'socket.io';
import socketHandler from './src/server/socketHandler';
import connection from './src/server/connection';

const app = express();
const server = http.createServer(app);

app.use(express.static('dist'));
app.set('views', './src/server/views');
app.set('view engine', 'pug');

const io = socketio(server);

let states = [];

io.set('transports', ['websockets', 'polling']);

connection.query('SELECT * FROM states WHERE status = 1 ORDER BY createdAt DESC', (err, result) => {
  states = result.map(item => {
    return {
      text: item.text,
      username: item.userName,
      status: item.status,
      currentDate: item.createdAt,
      likes: item.likes
    };
  });
  io.on('connection', socketHandler(io, states, connection));
});

// io.on('connection', socketHandler(io, states));

app.get('/', (req, res) => {
  res.render('home');
});

server.listen(3000, (req, res) => {
  console.log('server on port 3000');
});
