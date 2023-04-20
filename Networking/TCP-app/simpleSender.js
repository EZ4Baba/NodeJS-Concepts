const net = require("net");
let date = new Date();
const socket = net.createConnection({ host: "127.0.0.1", port: 3000 }, () => {
  console.log(date.getTime());
  let buf = Buffer.alloc(2);
  buf[0] = 10;
  buf[1] = 12;
  socket.write(buf);
  console.log(date.getTime());
  socket.write("Hi..heres msg from simple Sender");
  console.log(date.getTime());
});
// when server sends some response
socket.on("data", (data) => {
  console.log(data.toString());
});
