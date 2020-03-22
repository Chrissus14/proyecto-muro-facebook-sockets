import connection from './connection';
import { matchHash, createToken } from './hasher';

export default (io, states) => socket => {
  console.log('start sockets');
  let username = 'Anonymuos';

  if (states.length > 0) io.emit('broadcastState', states);

  socket.on('doLogin', data => {
    console.log(data);

    connection.query('SELECT * FROM users WHERE userName = ?', [data.user], (err, result) => {
      if (!err) {
        if (result.length === 1) {
          if (matchHash(data.password, result[0].pass)) {
            const token = createToken({
              user: data.user
            });
            io.emit('successLogin', token);
          } else {
            io.emit('failedLogin', 'invalid credentials');
          }
        } else {
          io.emit('failedLogin', 'user not found');
        }
      } else {
        io.emit('failedLogin', err.message);
      }
    });
  });

  socket.on('sendState', data => {
    console.log(data);
    connection.query(
      'INSERT INTO states (text, userName, status) VALUES (?, ? , ?)',
      [data.stateText, username, data.status],
      (err, result) => {
        if (!err) {
          const datos = {
            text: data.stateText,
            id: socket.id,
            username,
            likes: 0
          };
          states.push(datos);
          io.emit('broadcastState', states);
        }
      }
    );
  });

  socket.on('change_username', data => {
    // console.log(data.username);
    username = data.username;
  });

  socket.on('sendLike', like => {
    const currentText = states.find(item => item.text === like.message);
    currentText.likes += 1;
    io.emit('broadcastState', states);
  });

  socket.on('deleteMsg', msg => {
    const currentText = states.find(item => item.text === msg.text);
    if (socket.id === currentText.id) {
      states = states.filter(item => item.text !== msg.text);
      io.emit('broadcastState', states);
    }
  });
};
