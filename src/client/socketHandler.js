export default (socketClient, ui) => {
  socketClient.on('broadcastState', data => {
    console.log('broadcastState', data);
    ui.states.innerHTML += `
      <div>
        <p>${data.text}</p>
        <button onClick="window.ui.sendLike('${data.id}')">Like</button>
      </div>
    `;
  });
};
