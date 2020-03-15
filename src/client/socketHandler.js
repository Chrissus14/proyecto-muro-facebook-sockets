export default (socketClient, ui) => {
  socketClient.on('broadcastState', states => {
    // console.log('broadcastState', data);
    // ui.states.innerHTML += `
    //   <div>
    //     <p>${data.username} - ${data.text}</p>
    //     <button onClick="window.ui.sendLike('${data.id}')">Like</button>
    //     <button onClick="window.ui.sendDelete('${data.id}')">Delete</button>
    //   </div>
    // `;
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
};
