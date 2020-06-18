let users = [];
function userJoin(id, username, roomName) {
	const user = {
		id,
		username,
		roomName
	};
	users.push(user);
	return user;
}

function getCurrentRoomUsers(roomName) {
	return users.filter(user => user.roomName === roomName);
}

function setUserLeftRoom(id) {
	users = users.filter(user => user.id !== id);
}

module.exports = {
	userJoin,
	getCurrentRoomUsers,
	setUserLeftRoom
};
