const EventEmitter = require("events");

// extends event
class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

myEmitter.on("someEvent", () => {
  console.log("some event occured fn 1");
});

myEmitter.on("someEvent",()=>{
  console.log("some event occured fn 2")
})

myEmitter.on("someEvent",()=>{
  console.log("some event occured fn 3")
})


// called once but all 3 fns are executed - [fn1 fn2 fn3]
myEmitter.emit('someEvent')



// only run once
myEmitter.once("abcd", () => {
  console.log("abcd event occured: 1");
});

// only run once
myEmitter.once("abcd", () => {
  console.log("abcd event occured: 2");
});

myEmitter.emit("abcd");
myEmitter.emit("abcd");
myEmitter.emit("abcd");
myEmitter.emit("abcd");
myEmitter.emit("abcd");
