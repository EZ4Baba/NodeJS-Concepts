const net = require("net");
const fs = require("node:fs/promises");

const server = net.createServer();

let filehandle;
let writeStream;

server.on("connection", (socket) => {
  //new connection
  socket.on("data", async (data) => {
    if (!filehandle) {
      let divider = data.indexOf("------");
      let filename = data.subarray(5, divider).toString("utf-8");
      socket.pause();
      filehandle = await fs.open(`Storage/${filename}`, "w");
      writeStream = filehandle.createWriteStream();

      writeStream.write(data.subarray(divider + 7));
      socket.resume();

      writeStream.on("drain", () => {
        socket.resume();
      });
    } else {
      if (!writeStream.write(data)) {
        socket.pause();
      }
    }
  });

  socket.on("end", () => {
    // triggered when client side socket closes
    socket.end();
    filehandle.close();
    filehandle = undefined;
    console.log("connection ended");
  });
});

server.listen(3000, "127.0.0.1", () => {
  console.log("server listening on ", server.address());
});
