export default socketClient => {
  const stateText = document.getElementById('state-text');
  const sendState = document.getElementById('send-state');
  const states = document.getElementById('states');
  const userName = document.getElementById('username');
  const changeUserName = document.getElementById('change-username');
  const allStates = document.getElementById('all-states');

  sendState.addEventListener('click', () => {
    console.log('sendState', stateText.value);
    if (stateText.value.length > 0) socketClient.emit('sendState', stateText.value);
  });

  changeUserName.addEventListener('click', () => {
    console.log(userName.value);
    socketClient.emit('change_username', { username: userName.value });
  });

  const sendLike = text => {
    const like = { message: text };
    socketClient.emit('sendLike', like);
  };

  const sendDelete = id => {
    console.log(id);
  };

  return {
    sendLike,
    sendDelete,
    states,
    allStates
  };
};
