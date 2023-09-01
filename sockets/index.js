const usersModel = require('../models').User;

/**
 * @param {import("socket.io").Server} io
 */
module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on("joinRoom", (token) => {
            let userData = usersModel.verifyToken(token);
            if (!userData) return;
            socket.join(userData.id);
        })
    })
}