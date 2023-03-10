// let b = Buffer.from([1, 2, 3]);
// console.log(b);
// let buf = Buffer.alloc(1, 257);
// console.log(buf); // 2 2 2 2 2 2 2 2 1 byte = 6 bit , max = 256

const fs = require("fs").promises;
let numbers = [1, 2, 3, 4];
(async function () {
  let handler = await fs.open("./exmpl.txt", "w");
  let stream = handler.createWriteStream();
  for (let i = 0; i < 258; i++) {
    let buf = Buffer.from(`${i} `);
    if (!stream.write(buf)) {
    }
  }
  //   console.log(stream.writableLength);
})();
