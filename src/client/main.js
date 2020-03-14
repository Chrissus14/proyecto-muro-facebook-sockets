import socketHandler from './socketHandler';
import uiHandler from './uiHandler';

const socketClient = io();
const ui = uiHandler(socketClient);

window.ui = ui;

socketHandler(socketClient, ui);
