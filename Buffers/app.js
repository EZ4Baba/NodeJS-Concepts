const { Buffer } = require("buffer");

const memoryContainer = Buffer.alloc(4); // 4 bytes - 32 bits

memoryContainer[0] = 0xf; // 1 1 1 1 = 15
memoryContainer[1] = 0xf4; // 1 1 1 1 0 1 0 0 = 244
memoryContainer[2] = 0x3b;
memoryContainer[3] = 0xff;

console.log(memoryContainer[0]);
console.log(memoryContainer[1]);
console.log(memoryContainer[2]);
console.log(memoryContainer[3]);

console.log(memoryContainer);
console.log("hex representaion - ", memoryContainer.toString("hex"));
console.log("utf-8 representaion - ", memoryContainer.toString("utf-8"));
console.log("ascii representaion - ", memoryContainer.toString("ascii"));

console.log("--------------------------------------------");

// another way to create buffer
const buff = Buffer.from([0x48, 0x69, 0x21]);
console.log(buff.toString("utf-8"));

console.log("--------------------------------------------");

const buff2 = Buffer.from("486921", "hex");
console.log(buff2.toString("utf-8"));
