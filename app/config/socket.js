const { Server } = require('socket.io');

const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    // Handle user disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
    
    // Example of a custom event
    socket.on('message', (data) => {
      console.log(`Message from ${socket.id}: ${data.message}`);
      
      // Broadcast message to all clients except sender
      socket.broadcast.emit('message', {
        userId: socket.id,
        message: data.message
      });
    });
  });

  return io;
};

module.exports = initSocket;