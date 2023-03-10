const { create } = require("domain");
const { copyFileSync } = require("fs");
const { emit } = require("process");
const { createInflate } = require("zlib");

const fs = require("fs").promises;

// (async function () {
//   let cmd_file_handler = await fs.open("./command.txt", "r"); //Returns: <Promise> Fulfills with a <FileHandle> object.

//   let res = await fs.watch("./");
//   for await (let event of res) {
//     if (event.eventType == "change") {
//       //the file is changed
//       //   let content_buffer = await fs.readFile("./command.txt"); // shortcut to just read
//       //   fs.readFile will open the file and will close it
//       //   console.log(content_buffer);

//       //   let cont = await cmd_file_handler.read("./command.txt"); // the content buffer will be very large
//       //   console.log(cont.buffer.toString());
//       //   console.log("=========================");

//       // as the content buffer is large by deafult we will create as per size of file
//       let size = (await cmd_file_handler.stat()).size;
//       // allocating buffer of size of file
//       let buff = Buffer.alloc(size);
//       // the location at which we start to fill buffer
//       let offset = 0;
//       // the position to start reading
//       let position = 0;
//       let length = buff.byteLength;
//       console.log(size);
//       let content = await cmd_file_handler.read(buff, offset, length, position);
//       console.log(content);
//     }
//   }
// })()
// as all fileHandler objects are EventEmitters, we can also do this :

async function createFile(path) {
  try {
    let existingHandler = await fs.open(path, "r"); // with r flag it will throw error if file doesnt exists
    existingHandler.close();
    console.log("file already exists");
  } catch (e) {
    //file doesnt exist, create new file
    let newHandler = await fs.open(path, "w");
    newHandler.close();
    console.log("new file created");
  }
}
async function renameFile(oldpath, newpath) {
  try {
    await fs.rename(path);
  } catch (e) {}
}

(async function () {
  let cmd_file_handler = await fs.open("./command.txt", "r");

  cmd_file_handler.on("change", async function () {
    let size = (await cmd_file_handler.stat()).size;
    let buff = Buffer.alloc(size);
    let offset = 0;
    let length = buff.byteLength;
    let position = 0;

    await cmd_file_handler.read(buff, offset, length, position);
    let cmd = buff.toString("utf-8");
    // create a file
    // create a file <path>
    if (cmd.includes("Create a file")) {
      let filepath = cmd.substring("Create a file".length + 1);
      createFile(filepath);
    }
    if (cmd.includes("rename a file")) {
      let filepath = cmd.substring("rename a file".length + 1);
      let newfile = cmd.substring(filepath.length + 1);
      renameFile(filepath, newfile);
    }
  });

  //command.txt watcher..

  let watcher = fs.watch("./command.txt"); //returns Async Iterator

  for await (let evt of watcher) {
    if (evt.eventType == "change") {
      cmd_file_handler.emit("change");
    }
  }
})();
