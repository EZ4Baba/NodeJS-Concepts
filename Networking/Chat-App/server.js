const net = require("net");

let clients = [];

const server = net.createServer();

//new connection
server.on("connection", (socket) => {
  console.log("new connection made");
  let clientID = clients.length + 1;
  clients.push({ id: `id-${clientID}`, socket: socket });
  socket.write(`id-${clientID}`);

  socket.on("data", (data) => {
    clients.forEach((s) => {
      s.socket.write(`user-${data.toString().substring(3)}`);
    });
  });
});
server.listen(3000, "127.0.0.1", () => {
  console.log("listening on ", server.address());
});
