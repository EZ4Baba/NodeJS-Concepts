const EventEmitter = require("events");
class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    this.emit("begin");
    asyncFunc(...args, (err, data) => {
      if (err) {
        return this.emit("error", err);
      }
      this.emit("data", data);
      this.emit("end");
    });
  }
}

const withTime = new WithTime();

withTime.on("begin", () => console.log("BEGIN EMITTED: About to execute async operattion"));
withTime.on("end", () => console.log("END EMITTED: Execution Completed"));
withTime.on("data", (data) => console.log("got data ", data));

const readFile = (url, cb) => {
  fetch(url)
    .then((res) => res.json()) 
    .then(function (data) {
      cb(null, data);
    });
};

withTime.execute(readFile, "https://jsonplaceholder.typicode.com/posts/1");
withTime.execute(readFile, "https://jsonplaceholder.typicode.com/posts/1");
