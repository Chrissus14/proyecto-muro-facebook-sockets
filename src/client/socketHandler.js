export default (socketClient, ui) => {
  socketClient.on('broadcastState', states => {
    ui.states.innerHTML = '';
    states.forEach(item => {
      ui.states.innerHTML += `
        <div>
          <p>${item.username} - ${item.text}</p>
          <p>likes ${item.likes}</p>
          <button onClick="window.ui.sendLike('${item.text}')">Like</button>
           <button onClick="window.ui.sendDelete('${item.id}', '${item.text}')">Delete</button>
        </div>
      `;
    });
  });

  socketClient.on('successLogin', token => {
    ui.updateClientData(token);
    ui.loginForm.style.display = 'none';
    ui.wall.style.display = 'block';
  });
};
