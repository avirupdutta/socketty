let io = require("socket.io");
const { userJoin, getCurrentRoomUsers, setUserLeftRoom } = require("./utils");

module.exports = function(server) {
	io = io(server);

	io.on("connection", socket => {
		socket.on("joinRoom", ({ username, roomName }) => {
			const user = userJoin(socket.id, username, roomName);
			let roomUsers = getCurrentRoomUsers(roomName);
			socket.join(user.roomName);

			console.log(`${user.username} has joined ${user.roomName}`);
			io.sockets
				.to(user.roomName)
				.emit("roomEntry", { username, roomUsers });

			// Broadcast when user sends message
			socket.on("message", data => {
				console.log(data);
				socket.broadcast.to(user.roomName).emit("message", data);
			});

			socket.on("disconnect", () => {
				console.log(`${user.username} has left ${user.roomName}`);
				setUserLeftRoom(user.id);
				roomUsers = getCurrentRoomUsers(roomName);
				socket.broadcast
					.to(user.roomName)
					.emit("roomLeave", { username, roomUsers });
			});
		});
	});

	// const pythonRoom = io.of("/python-room");
	// // on new connection
	// pythonRoom.on("connection", socket => {
	// 	console.log("new connection to python room: ", socket.id);
	// 	socket.join("python");

	// 	// receive new message
	// 	socket.on("message", data => {
	// 		// send to everyone except for the sender
	// 		console.log(data);
	// 		// io.to("python").emit("message", data);
	// 		socket.broadcast.to("python").emit("message", data);
	// 	});

	// 	socket.disconnect("disconnect", () => {
	// 		console.log(`disconnected: ${socket.id}"`);
	// 	});
	// });
};
