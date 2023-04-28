var hello = "hello";
var hello = "hello hello";
// 변수 선언시 위험함 그래서 let,const 사용

// function sayHello() {
//   var hello = "hello hello";
//   console.log(hello); //hello hello
// }
// console.log(hello); //hello

if (true) {
  var hello = "hello hello";
}

// sayHello();
console.log(hello); //hello hello
