// const a = [2, 5, 8, 1, 9, 4];
// console.log(a.sort((a, b) => b - a));
// console.log(a.sort());
// const b = 'true';
// const c = 'false';
// console.log('b: ', Boolean(b));
// console.log('c: ', Boolean(c));
// if (null) {
//   console.log('!true');
// } else {
//   console.log('!false');
// }
// if (undefined) {
//   console.log('!true');
// } else {
//   console.log('!false');
// }
let startDate = new Date();
console.log(startDate);
console.log(startDate.getSeconds());
startDate.setSeconds(startDate.getSeconds() + 30);
console.log(startDate);
console.log(((new Date() - startDate) / 1000).toFixed(1));
let t = null;
if (t) {
  console.log(true);
} else {
  console.log(false);
}
t = 25;
if (t) {
  console.log(true);
} else {
  Console.log(false);
}
