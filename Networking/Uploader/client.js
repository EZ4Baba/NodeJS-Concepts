const net = require("net");
const path = require("path");
const fs = require("fs").promises;

let clearline = function (dir) {
  return new Promise((res, rej) => {
    process.stdout.clearLine(dir, () => {
      res();
    });
  });
};
let moveCursor = function (dx, dy) {
  return new Promise((res, rej) => {
    process.stdout.moveCursor(dx, dy, () => {
      res();
    });
  });
};
const socket = net.createConnection(
  { host: "127.0.0.1", port: 3000 },
  async () => {
    let filepath = process.argv[2];
    let filename = path.basename(filepath);
    //sending filname to server
    console.log(filename);
    socket.write(`file-${filename}------`);
    console.log("connection created successfully..uploading the file");
    const handler = await fs.open(filepath, "r");
    let stats = await fs.stat(filepath);

    let readstream = handler.createReadStream();
    let uploadedBytes = 0;
    let upload_percentage = 0;
    readstream.on("data", (data) => {
      let new_percentage = 0;
      if (!socket.write(data)) {
        readstream.pause();
      }
      uploadedBytes += data.length;
      new_percentage = Math.floor((uploadedBytes / stats.size) * 100);
      if (new_percentage % 1 == 0 && upload_percentage != new_percentage) {
        upload_percentage = new_percentage;
        moveCursor(0, -1);
        clearline(0);
        console.log(`uploading...${upload_percentage}%`);
      }
    });
    socket.on("drain", () => {
      readstream.resume();
    });
    readstream.on("end", () => {
      console.log("uploaded successfully");
      socket.end();
      handler.close();
    });
  }
);
