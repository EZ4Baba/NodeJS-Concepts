const dns = require("node:dns/promises");

(async function () {
  let result = await dns.lookup("google.com", 4);
  console.log(result);
})();
