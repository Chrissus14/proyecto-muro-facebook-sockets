export default (io, states) => socket => {
  console.log('start sockets');
  let username = 'Anonymuos';

  if (states.length > 0) io.emit('broadcastState', states);

  socket.on('sendState', text => {
    console.log(text);
    const data = {
      text,
      id: socket.id,
      username,
      likes: 0
    };
    states.push(data);
    io.emit('broadcastState', states);
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
};
