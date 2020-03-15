export default socketClient => {
  const stateText = document.getElementById('state-text');
  const sendState = document.getElementById('send-state');
  const states = document.getElementById('states');
  const userName = document.getElementById('username');
  const changeUserName = document.getElementById('change-username');

  sendState.addEventListener('click', () => {
    console.log('sendState', stateText.value);
    if (stateText.value.length > 0) socketClient.emit('sendState', stateText.value);
  });

  changeUserName.addEventListener('click', () => {
    console.log(userName.value);
    socketClient.emit('change_username', { username: userName.value });
  });

  const sendLike = id => {
    console.log(id);
  };

  const sendDelete = id => {
    console.log(id);
  };

  return {
    sendLike,
    sendDelete,
    states
  };
};
