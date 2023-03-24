import {chat} from '../models/chat/chat'

module.exports = function(socket) {

  socket.on('eventName1', function(name) {
    console.log('eventName1 ', name)
    
  });

  socket.on('eventName2', function(name) {
    console.log('eventName2 ', name)
    
  });

};