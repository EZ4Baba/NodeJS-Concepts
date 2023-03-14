const fs = require("fs").promises;

(async function () {
  let fileHandleRead = await fs.open("source-gigantic.txt", "r");
  let fileHandleWrite = await fs.open("des.txt", "w");

  let streamRead = fileHandleRead.createReadStream();
  let streamWrite = fileHandleWrite.createWriteStream();

  let split = "";
  streamRead.on("data", function (chunk) {
    // 65536 default highwatermark  --  64Kb

    let numbers = chunk.toString("utf-8");
    var nums = numbers.split("  "); //will split them by " " into array

    if (Number(nums[0]) + 1 !== Number(nums[1])) {
      //nums[0] = (Number(nums[1]) - 1).toString();
      nums[0] = split + nums[0];
    }

    if (Number(nums[nums.length - 2] + 1 !== Number(nums[nums.length - 1]))) {
      split = nums.pop();
    }

    // for (let n of nums) {
    //   if (n % 2) {
    //     // writting only odds
    //     let buf = Buffer.from(`${n} `);
    //     if (!streamWrite.write(buf)) streamRead.pause();
    //   }
    // }
    console.log(nums);
    if (!streamWrite.write(chunk)) {
      console.log(streamWrite.writableNeedDrain);
      streamRead.pause(); // pause the readstream to drain the writestream
    }
  });
  streamWrite.on("drain", function () {
    streamRead.resume();
  });
})();
console.log("check")
