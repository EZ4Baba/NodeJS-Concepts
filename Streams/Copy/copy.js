const fs = require("fs/promises");

// (async function () {
//   let readhandle = await fs.open("test.txt", "r");
//   let writehandle = await fs.open("copy-des.txt", "w");
//   console.time("copy");

//   ////--------------------this will not generate null chars----------------------
//  2m 19s

//   // let buffer = Buffer.alloc(16384);
//   // let stats = await readhandle.stat();

//   // let itrs = stats.size / 16384;

//   // for (let i = 0; i < itrs; i++) {
//   //   let data = await readhandle.read(buffer, 0, 16384, null);
//   //   writehandle.write(data.buffer);
//   // }

//   ///-----------this will generate null chars at the end as file is not filled completely
//   /// ----------so we need to clear those too

// -------------------------------3m19s
//   let bytesread = -1;
//   let i = 0;
//   while (bytesread != 0) {
//     let data = await readhandle.read(16384); //default = 16384
//     bytesread = data.bytesRead;
//     if (bytesread != 16384) {
//       writehandle.write(data.buffer);
//       // let indexOfNotFilled = data.buffer.indexOf(0);
//       // let newbuffer = Buffer.alloc(indexOfNotFilled);
//       // data.buffer.copy(newbuffer, 0, 0, indexOfNotFilled);
//       // writehandle.write(newbuffer);
//     }
//     //else writehandle.write(data.buffer);
//   }
//   console.timeEnd("copy");
// })();

//---------------------------PIPING-----------------------------

(async function () {
  console.time("copying");
  let readhandle = await fs.open("source-gig-cp.txt", "r");
  let writehandle = await fs.open("copy-des.txt", "w");

  let readStream = readhandle.createReadStream();
  let writeStream = writehandle.createWriteStream();

  readStream.pipe(writeStream);

  readStream.on("end", function () {
    console.timeEnd("copying");
  });
})();
console.log("check")
