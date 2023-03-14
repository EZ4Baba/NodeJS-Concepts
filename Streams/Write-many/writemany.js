// const { Hmac } = require("crypto");

// const fs = require("fs").promises;

// // promise version

// // Execution time: ~50s
// // CPU           : >100% (1 core at full strength)
// // mermory usage : 0.6%

// (async function () {
//   console.time("start");
//   let handler = await fs.open("test.txt", "w");
//   for (let i = 0; i < 1000000; i++) {
//     await handler.write(`${i} `);
//   }
//   console.timeEnd("start");
//   await handler.close();
// })();

// Callback version(very fast)

// execution time : ~ 6s
// cpu usage : >200% ( 2 cores)
// mermory usage: very high aroung 15%

// const fs = require("fs");

// fs.open("test.txt", "w", (err, fileDescriptor) => {
//   console.time("writemany");
//   for (let i = 0; i < 1000000; i++) {
//     //---way 1 -------
//     //fs.writeSync(fileDescriptor, `${i} `); // Exe : 8 sec mem : 0.7
//     //---way 2--------
//     //fs.write(fileDescriptor, `${i} `, () => {}); // Exe :6 sec mem: 15%
//     //----way 3-----
//     let buff = Buffer.from(`${i} `); // // Exe 9 sec mem: 0.7
//     fs.writeSync(fileDescriptor, buff);
//   }
//   console.timeEnd("writemany");
// });

//---------Streams-------

//---------------------bad way of using stream--------------------(point 2)
// Exec : 0.7 sec
// memory : ~8%
// const fs = require("fs").promises;

// (async function () {
//   let handler = await fs.open("test.txt", "w");
//   console.time("start");
//   let stream = handler.createWriteStream();

//   for (let i = 0; i < 1; i++) {
//     stream.write(`${i} `); //1 - node js will convert string to buffer and push it into internal buffer
//     //of writableStream. when internal buffer size reaches highWaterMark stream will wrtie the datainto
//     // file - internal buffer default size = 16384 bytes(16kb)
//     // 2 -  as in following line of code we are wiritting into internal buffer and not waiting for it to
//     // be empty, the extra data will be buffered into ram and cause high memory consumption
//   }
//   console.timeEnd("start");
// })();

// const fs = require("fs").promises;
// (async function () {
//   let handler = await fs.open("test.txt", "w");
//   let stream = handler.createWriteStream();

//   //console.log(stream.writableHighWaterMark);
//   //const buff = Buffer.alloc(16383, "a");

//   stream.write(Buffer.alloc(16384, "a"));
//   //   setTimeout(function () {
//   //     stream.write(Buffer.alloc(1, "b"));
//   //     console.log(stream.writableLength);
//   //   }, 1000);
//   //   stream.write(Buffer.alloc(1, "a"));
//   console.log(stream.writableLength);
//   stream.on("drain", function () {
//     console.log("we are safe to write now as we have drained the buffer");
//   });

//   for (let i = 0; i < 2; i++) {}
// })();

const fs = require("fs").promises;

(async function () {
  let i = 0;
  console.time("start");
  let handler = await fs.open("test.txt", "w");
  let stream = handler.createWriteStream();

  const numberofwrites = 10000000;
  function writemany() {
    while (i < numberofwrites) {
      let buf = Buffer.from(`${i} `);
      if (i === numberofwrites - 1) {
        stream.end(buf); // end the stream with last buf
        break;
      }

      //internal buffer is full, stream.write will retrun false
      //   if (stream.writableNeedDrain) { // this is also an option
      //     break;
      //   }
      //   stream.write(`${i} `);

      if (!stream.write(buf)) break;
      i++;
    }
  }

  stream.on("finish", function () {
    // will fire on end
    console.timeEnd("start");
    handler.close();
  });
  stream.on("drain", function () {
    writemany();
  });
  writemany();
})();
console.log("check")
