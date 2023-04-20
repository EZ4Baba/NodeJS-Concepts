const net = require("net");
let date = new Date();

const server = net.createServer((socket) => {
  // socket is duplex stream
  console.log("time 1 = ", date.getTime());
  socket.on("data", (data) => {
    console.log("time 2 = ", date.getTime());
    console.log(data);
  });
  socket.write("res is here");
  console.log("time 3 = ", date.getTime());
});
setTimeout(() => {
  console.log("time 4 = ", date.getTime());
}, 5000);
server.listen(3000, "127.0.0.1", () => {
  console.log("server listening on ", server.address());
});
