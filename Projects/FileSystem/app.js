const fs = require("fs/promises");

const CREATE_FILE = "create a file";
const DELETE_FILE = "delete a file";
const RENAME_FILE = "rename a file";
const ADD_TO_FILE = "add to a file";

async function createFile(path) {
  console.log("create here---", path, " path end");
  try {
    const fileHandler = await fs.open(path, "r");
    console.log(`file Already exists at ${path}`);
    fileHandler.close();
  } catch {
    try {
      const fileHandler = await fs.open(path, "w");
      console.log("File created at ", path);
      fileHandler.close();
    } catch (e) {
      console.log("error creating file", e);
    }
  }
}

async function renameFile(oldpath, newpath) {
  try {
    console.log("renaiming ", oldpath);
    console.log("to ", newpath);
    await fs.rename(oldpath.trim(), newpath.trim());
    console.log("file renamed");
  } catch (e) {
    console.error("unable to rename", e);
  }
}

async function deleteFile(path) {
  try {
    await fs.unlink(path);
    console.log("File deleted successfully");
  } catch (e) {
    console.log("unable to delete file at ", path);
  }
}

let lastAdd = null;
async function appendToFile(path, data) {
  if (lastAdd === data) {
    return;
  }
  try {
    await fs.appendFile(path, data, "utf-8");
    lastAdd = data;
  } catch (e) {
    console.error("unable to append file ", e);
  }
}

async function startWatching() {
  const fileHandler = await fs.open("./Files/watcher.txt", "r");
  fileHandler.on("change", async () => {
    const stats = await fileHandler.stat();
    const size = stats.size;

    // create buffer of filesize to put content into
    const buffer = Buffer.alloc(size);

    // read config to set location to fill our buffer
    const offset = 0; // always start from 0
    const position = 0; // always start from 0
    const length = buffer.byteLength;

    const content = await fileHandler.read(buffer, offset, length, position);
    // content will have{ buffer and bytesread},  although as we have the buffer declared on top
    // which is in being filled, we can directly check buffer instead of content.buffer
    const userInput = content.buffer.toString("utf-8");

    //
    if (userInput.includes(CREATE_FILE)) {
      const filePath = userInput.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    if (userInput.includes(DELETE_FILE)) {
      const filepath = userInput.substring(DELETE_FILE.length + 1);
      deleteFile(filepath);
    }

    // rename a file <path> to <path>
    if (userInput.includes(RENAME_FILE)) {
      const idx = userInput.indexOf(" to ");
      const oldpath = userInput.substring(RENAME_FILE.length + 1, idx);
      const newpath = userInput.substring(idx + 4);
      renameFile(oldpath, newpath);
    }

    if (userInput.includes(ADD_TO_FILE)) {
      const idx = userInput.indexOf(" : ");
      const path = userInput.substring(ADD_TO_FILE.length + 1, idx);
      const data = userInput.substring(idx);
      appendToFile(path, data);
    }
  });
  const watcher = fs.watch("./Files/watcher.txt");

  // watcher ...
  for await (const event of watcher) {
    if (event.eventType === "change") {
      fileHandler.emit("change");
    }
  }
}
startWatching();
