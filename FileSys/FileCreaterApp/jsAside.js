let fs = require("fs").promises;
(async function () {
  let handler;
  try {
    // if file already exists
    handler = await fs.open("./tester.txt", "r");
    handler.close();
  } catch (e) {
    // creating new file
    let newhandler = await fs.open("newtester.txt", "w");
  }
})();
// if file doesnt exists then it depends on flag

// r => it will throw error if file doesnt exists and "r" flag is there is open command
// w => it will create new file if it doest exits
