const { Buffer } = require("buffer");

const buffer = Buffer.alloc(8); // buffer storage is 8 byte
buffer.write("string", "utf-8"); // each char is represented in 8 bits = 1 byte in utf-8
console.log(buffer);

console.log(buffer.toJSON());
console.log(buffer.length);
console.log(buffer[0]);

// instead of allcating and then writting we can directly do this
console.log("-----------------");

const buf1 = Buffer.from("string", "utf-8");
console.log(buf1);
console.log(buf1.toJSON());

const buf2 = Buffer.from([115, 116, 114, 105, 110, 103], "utf-8");
console.log(buf2);
console.log(buf2.toString());

console.log("------------------------");
const buf3 = Buffer.from([115], "onqown");
console.log(buf3);
