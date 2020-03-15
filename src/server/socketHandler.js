export default io => socket => {
  console.log('start sockets');
  let username = 'Anonymuos';

  socket.on('sendState', text => {
    console.log(text);
    const data = {
      text,
      id: socket.id,
      username
    };
    io.emit('broadcastState', data);
  });

  socket.on('change_username', data => {
    // console.log(data.username);
    username = data.username;
  });
};
