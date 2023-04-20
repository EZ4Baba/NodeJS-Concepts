const pr = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, 1000);
  });
};

const simple = async () => {
  console.log("start");
  pr().then(() => {
    console.log("pmde");
  });
  console.log("end");
};
simple();
