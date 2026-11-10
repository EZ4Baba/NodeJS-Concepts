const customEvent = require("./customEvents.js");
const myevent = new customEvent();

myevent.on("something", (arg, arg2) => {
  console.log("something happended", arg, arg2);
});

myevent.once("abcd", () => {
  console.log("abcd happended");
});
myevent.emit("abcd");
myevent.emit("abcd");
myevent.emit("abcd");
myevent.emit("abcd");
myevent.emit("abcd");
