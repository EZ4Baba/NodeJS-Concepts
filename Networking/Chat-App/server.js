const net = require("net");

let clients = [];

const server = net.createServer();

//new connection
server.on("connection", (socket) => {
  console.log("new connection made");
  let clientID = clients.length + 1;

  //broadcasting msg to everyone
  clients.forEach(function (obj) {
    obj.socket.write(`User-${clientID} just joined the chat`);
  });

  clients.push({ id: `id-${clientID}`, socket: socket });
  socket.write(`id-${clientID}`);

  socket.on("data", (data) => {
    let dataString = data.toString();
    let closeRequest = false;
    let id = undefined;
    console.log(dataString.substring(2));
    if (dataString.substring(2) == "closed") {
      let id = dataString.substring(0, dataString.indexOf("closed"));
      closeRequest = true;
    }
    clients.forEach((s) => {
      if (closeRequest == true) {
        s.socket.write("user falana exited");
      } else s.socket.write(`user-${data.toString().substring(3)}`);
    });
  });

  socket.on("end", () => {
    clients.map((client) => {
      client.socket.write(`user ${clientID} left the room`);
    });
  });
});
server.listen(3000, "127.0.0.1", () => {
  console.log("listening on ", server.address());
});
