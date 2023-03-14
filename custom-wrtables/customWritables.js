let { Writable } = require("node:stream");
const fs = require("fs");

// pre-ES6 way of implementing

// const util = require("node:util");
// function WriteStream(options) {
//   if (!(this instanceof WriteStream)) {
//     // if we dont call WriteStream with new keyword
//     return new WriteStream(options); // then "this" will refer to Global, else WriteStream
//   }
//   Writable.call(this, options);
// }
// util.inherits(WriteStream, Writable);

// let myWriteStream = WriteStream();
// console.log(myWriteStream);

// modern recommended

class WriteStream extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null;
    this.highWaterMarkCapacity = highWaterMark;
    this.chunks = [];
    this.chunkSize = 0;
    this.numberofwrites = 0;
  }

  // this method runs after constructor and pauses other WriteSteamm method from execution untill
  // it executes the callback function passed as parameter
  _construct(callback) {
    fs.open(this.fileName, "w", (err, fd) => {
      if (err) callback(err);
      else {
        this.fd = fd;
        callback();
      }
    });
  }
  _write(chunk, encoding, callback) {
    if (this.chunkSize < this.highWaterMarkCapacity) {
      this.chunks.push(Buffer.from(chunk));
      this.chunkSize += chunk.length;
      callback();
    } else {
      fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
        if (err) {
          callback(err);
        } else {
          ++this.numberofwrites;
          this.chunkSize = 0;
          this.chunks = [];
          callback();
        }
      });
    }
  }
  _final(callback) {
    console.log("final called", this.numberofwrites);
    fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
      if (err) return callback(err);
      this.chunks = [];
      callback();
    });
  }
  _destroy() {}
}
// let ws = new WriteStream({ highWaterMark: 16384, fileName: "test.txt" });

// ws.write("hi this is first line");
// ws.end("this is last line");

// ws.on("drain", () => {
//   console.log("safe to write now");
// });

(async function () {
  let stream_w = new WriteStream({
    highWaterMark: 16384,
    fileName: "test.txt",
  });
  let i = 0;
  let upperlimit = 1000000;
  function writemany() {
    while (i < upperlimit) {
      if (i == upperlimit - 1) {
        stream_w.end(`${i} `);
        break;
      }
      if (!stream_w.write(`${i} `)) {
        break;
      }
      i++;
    }
  }
  stream_w.on("drain", function () {
    writemany();
  });
  writemany();
})();

