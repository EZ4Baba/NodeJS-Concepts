const { Buffer } = require("buffer");

const safebuffer = Buffer.alloc(2, 0); // put 0 at bytes
const unsafebuffer = Buffer.allocUnsafe(100); // doesnt put any value, thus faster

console.log(safebuffer);
console.log(unsafebuffer);

// for (let i = 0; i < unsafebuffer.length; i++) {
//   console.log(unsafebuffer[i].toString(2)); // 2 (base 2, binary)
// }

/*
console.log("pool size ", Buffer.poolSize);

node at starting create a pool of 8KiB (Buffer.poolSize)
it uses this memory to allocate any unsafe buffer as long as it is under 8KiB size
 
*/
