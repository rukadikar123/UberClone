import { Server } from 'socket.io'; 
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


        socket.on('update-location-captain', async(data)=>{
            const {userId, location}=data

            if(!location || !location.ltd || !location.lng ){
                return socket.emit('error', {message: 'invalid location data'})
                }
            await Captain.findByIdAndUpdate(userId,{
                location:{
                    ltd:location.ltd,
                    lng:location.lng
                }
            })
        })

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

export function sendMessageToSocketId(socketId, messageObject) {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.error('Socket.io is not initialized.');
    }
}
