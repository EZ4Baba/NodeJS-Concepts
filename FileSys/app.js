// const fs = require("fs");
// const buf = fs.readFileSync("./text.txt");
// console.log(buf.toString("utf-8"));
// console.log("done");

//==================== FS Promise API =========================

const fsPromises = require("fs").promises;
(async () => {
  try {
    await fsPromises.copyFile("text.txt", "copied-promise.txt");
  } catch (e) {
    console.log(e);
  }
})();

//==================== FS Callback API ========================
const fs = require("fs");

fs.copyFile("text.txt", "copied-callback.txt", function (err) {
  console.log(err);
});

// //===================== FS Synchromous API =================

const fs_s = require("fs");

fs_s.copyFileSync("text.txt", "copied-sync.txt");
console.log("check")
