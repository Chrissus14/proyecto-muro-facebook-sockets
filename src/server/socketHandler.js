export default io => socket => {
  console.log('start sockets');

  socket.on('sendState', text => {
    console.log(text);
    const data = {
      text,
      id: socket.id
    };
    io.emit('broadcastState', data);
  });
};
