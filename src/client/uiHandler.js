export default socketClient => {
  const stateText = document.getElementById('state-text');
  const sendState = document.getElementById('send-state');
  const states = document.getElementById('states');
  const userName = document.getElementById('username');
  const changeUserName = document.getElementById('change-username');
  const allStates = document.getElementById('all-states');
  const loginForm = document.getElementById('login');
  const wall = document.getElementById('wall');
  const user = document.getElementById('user');
  const password = document.getElementById('password');
  const doLogin = document.getElementById('do-login');

  wall.style.display = 'none';

  const clientData = {
    token: ''
  };

  function updateClientData(token) {
    console.log(2, token);
    clientData.token = token;
  }

  sendState.addEventListener('click', () => {
    // console.log('sendState', stateText.value);
    const data = {
      stateText: stateText.value,
      status: 1
    };
    if (data.stateText.length > 0) socketClient.emit('sendState', data);
  });

  doLogin.addEventListener('click', () => {
    if (user.value.length > 0 && password.value.length > 0) {
      socketClient.emit('doLogin', {
        user: user.value,
        password: password.value
      });
    }
  });

  changeUserName.addEventListener('click', () => {
    console.log(userName.value);
    socketClient.emit('change_username', { username: userName.value });
  });

  const sendLike = text => {
    const like = { message: text };
    socketClient.emit('sendLike', like);
  };

  const sendDelete = (id, text) => {
    const msg = { id: id, text: text, status: 0 };
    // console.log(msg);
    socketClient.emit('deleteMsg', msg);
  };

  return {
    updateClientData,
    sendLike,
    sendDelete,
    states,
    allStates,
    wall,
    loginForm
  };
};
