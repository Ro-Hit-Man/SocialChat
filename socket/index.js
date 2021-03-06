const io = require('socket.io')(8900,{
    cors:{
        origin:"http://localhost:3000"
    }
});

let users = [];

const addUser = (userId,socketId) => {
    if(userId !== ""){
    !users.some((user)=> user.userId === userId) &&
        users.push({userId,socketId});
    }
}

const removeUser = (socketId) => {
    users = users.filter((user)=>{user.socketId !== socketId });
}

const getUser = (userId)=>{
    return users.find(user=>user.userId === userId);
}

io.on("connection", (socket)=>{
    console.log("User Connected");

    socket.on("addUser",(userId)=>{
        addUser(userId,socket.id);
        io.emit("getUsers",users)
    });

    socket.on("sendMessage",({userId,receiverId,text})=>{
         const user = getUser(receiverId);
         io.to(user.socketId).emit("getMessage",{
             userId,
             text
         });
    });

    socket.on("disconnect",()=>{
        console.log("User Disconnected");
        removeUser(socket.id);
        io.emit("getUsers",users);
    });
});