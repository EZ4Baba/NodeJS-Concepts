const net = require("net");
const { listenerCount } = require("process");
const readLine = require("readline/promises");

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// clear the line on terminal - utility function
const clearLine = () => {
  return new Promise((resolve, reject) => {
    //  -1 - entire to the left
    //   0 - entire line
    //   1 - entire to the right
    process.stdout.clearLine(0, () => {
      resolve();
    });
  });
};
// move the cursor - utility function

const move = () => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(0, -1, () => {
      resolve();
    });
  });
};

let id = undefined;
// create connection
const clientSocket = net.createConnection(
  { port: 3000, host: "127.0.0.1" },
  async () => {
    console.log("conencted to server");
    const ask = async () => {
      let message = await rl.question("Enter a message > ");
      if (message == "exit") {
        console.log("exiting...");
        clientSocket.write(`${id}-closed`);
        clientSocket.end();
      } else {
        await move();
        await clearLine();
        clientSocket.write(`id-${id} : ${message}`);
      }
    };
    ask();

    clientSocket.on("data", async (data) => {
      console.log();
      move();
      clearLine();
      if (data.toString().substring(0, 2) == "id") {
        id = data.toString().substring(3);
        console.log(data.toString());
        ask();
      } else {
        // move the cursor, clean the terminal and display the msg
        console.log(data.toString());
        ask();
      }
    });
  }
);

clientSocket.on("end", () => {
  console.log("server disconnected");
  rl.close();
});
