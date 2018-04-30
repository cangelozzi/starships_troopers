// Javascript Document
console.log('Starship Troopers Store!');

// SVG SignIn icon animation
(() => {
  let signIn = document.getElementById("signIn_icon");

  function moveArrow() {
    let arrow = document.getElementById("arrow");
    arrow.classList.add("move");
    console.log("Arrow moved!");
    setTimeout(() => arrow.classList.remove("move"), 600);
  }
  signIn.addEventListener("click", moveArrow);
})();
