// DOM Events
// Mouse Events
//click
const boxOne = document.querySelector("#box1");
function alertBtn() {
  alert("You clicked Box 1.");
}
// boxOne.addEventListener("click", alertBtn);
// boxOne.addEventListener("click", alertBtn);

// //dblclick
const boxTwo = document.querySelector("#box2");
function alertBtn2() {
  alert("You double clicked Box 2.");
}
boxTwo.addEventListener("dblclick", alertBtn2);

// }