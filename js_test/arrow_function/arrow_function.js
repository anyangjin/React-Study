// const foo = () => {
//   console.log("arrow function");
// };

// function foo() {
//   console.log("arrow function");
// }
// foo();

// const foo = (x) => {
//   return x;
// };
// console.log(foo("arrow"));

const foo = (x) => x;

console.log(foo("arrow"));

const foo1 = (x, y) => x + y;
console.log(foo1(1, 5));

const foo2 = (x, y) => {
  console.log("2줄 이상");
  return x + y;
};
console.log(foo2(1, 5));
