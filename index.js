import express from 'express';
import socketio from 'socket.io';
import socketHandler from './src/server/socketHandler';

const app = express();

app.use(express.static('dist'));
app.set('views', './src/server/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home');
});

const server = app.listen(3000, (req, res) => {
  console.log('server on port 3000');
});

const io = socketio(server);

io.set('transports', ['websockets', 'polling']);
io.on('connection', socketHandler(io));
