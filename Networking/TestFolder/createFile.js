const fs = require("fs/promises");

(async function () {
  let filehandle = await fs.open("bigfile.txt", "w");
  let stream = await filehandle.createWriteStream();
  let i = 0;
  function create() {
    while (i < 100000000) {
      if (!stream.write(`${i} `)) break;
      i++;
    }
  }
  create();
  stream.on("drain", () => {
    create();
  });
})();
