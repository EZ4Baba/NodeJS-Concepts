// 0100 1000 0110 1001 0010 0001

const { Buffer } = require("buffer");

const buff = Buffer.alloc(3); // 8*3 = 24 bits

buff[0] = 0x48;
buff[1] = 0x69;
buff[2] = 0x21;

console.log(buff);
console.log(buff.toString("utf-8"));

const buff2 = Buffer.alloc(10);

console.log(buff2.length);
for (let i = 0; i < buff2.length; i++) {
  buff2[i] = 0x1;
}

console.log(buff2);
