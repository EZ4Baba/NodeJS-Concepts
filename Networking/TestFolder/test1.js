// const pr = () => {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       res();
//     }, 1000);
//   });
// };

// const simple = async () => {
//   console.log("start");
//   pr().then(() => {
//     console.log("pmde");
//   });
//   console.log("end");
// };
// simple();

// let cards = {
//   suites: ["s1", "s2", "s3", "s4", "s5"],
//   pants: ["p1", "p2", "p3"],
//   [Symbol.iterator]: function* () {
//     for (let suit of this.suites) {
//       for (let i = 0; i <= 10; ++i) yield `suit + ${i}`;
//       for (let p of this.pants) yield `p`;
//     }
//   },
// };
// for (let c of cards) {
//   console.log(c);
// }
// console.log([...cards]);

function* InfinityandBeyond() {
  let i = 0;
  while (true) yield i++;
}
function* take(howmuch, iterable) {
  for (let i of InfinityandBeyond) {
    if (howmuch <= 0) return;
    howmuch--;
    yield i;
  }
}
