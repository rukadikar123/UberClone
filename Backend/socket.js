import { Server } from 'socket.io'
import { User } from './Models/user.schema.js';
import { Captain } from './Models/captain.schema.js';

let io;

export function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*", // Explicitly allow your frontend origin
            methods: ["GET", "POST"],
            // credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log(`New client connected: ${socket.id}`);

        socket.on('join',async(data)=>{
            const {userId, userType}=data;

            if(userType==='user'){
                await User.findByIdAndUpdate(userId ,{socketId:socket.id})
            }else if(userType==='captain'){
                await Captain.findByIdAndUpdate(userId, {socketId:socket.id})
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

export function sendMessageToSocketId(socketId, message) {
    if (io) {
        io.to(socketId).emit('message', message);
    } else {
        console.error('Socket.io is not initialized.');
    }
}
