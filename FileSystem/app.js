const fs_promise = require("fs/promises");

// with promise
(async () => {
  try {
    await fs_promise.copyFile("./info.txt", "./Files/copied-promise.txt");
  } catch (err) {}
})();

// with callback
const fs_callback = require("fs");

fs_callback.copyFile("./info.txt", "./Files/copied-callback.txt", (err) => {
  if (err) {
    console.log("shit, theres some error ", err);
  }
});

// blocks the thread till content is copied
try {
  fs_callback.copyFileSync("./info.txt", "./Files/copied=syncronous.txt");
} catch {}
