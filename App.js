let gameBoard = document.querySelector(".gameBoard");
let displayInfo = document.querySelector("p");
let cells = document.querySelectorAll(".square");
let turn = prompt("Type either \"circle\" or \"cross\"");

function addChoice(event) {
   if(turn === "circle" || turn === "cross"){
     let cell = event.target;
     let choice;
     let fade = document.querySelector("h1");
     let fade2 = document.querySelector("h3");
     let move1 = document.querySelector(".flex");
     let move2 = document.querySelector(".left");
     let move3 = document.querySelector(".right");
     move1.classList.add("mov");
     move2.classList.add("mov");
     move3.classList.add("mov");
     fade.classList.add("rem");
     fade2.classList.add("rem");
     choice = document.createElement("div");   
     choice.setAttribute("class", turn);
     cell.appendChild(choice);
     turn = turn === "circle" ? "cross" : "circle";
     displayInfo.innerHTML = `It is ${turn}\'s turn`
     cell.removeEventListener("click", addChoice);
     let isDraw = checkDraw();
     if (isDraw){
       let all = document.querySelector(".overlay");
       all.classList.add("active");
       let popup = document.querySelector(".popup");
       let alert = document.querySelector(".alert");        
       alert.innerHTML = "Its a tie 🪢";
       popup.classList.add("active");
       displayInfo.innerHTML = "Restart";
       displayInfo.classList.add("clicky");
       displayInfo.addEventListener("click", restart);
     }
     checkScore();
   }
   else{
      location.reload();
   }
}

for (let cell of cells) {
  cell.addEventListener("click", addChoice);
}

function checkScore() {
   let allSquares = document.querySelectorAll(".square");
   let combos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
   ];

   for (let i = 0; i < combos.length; i++) {
      let [a, b, c] = combos[i];
      if (allSquares[a].childNodes.length > 0 && allSquares[a].childNodes[0].classList.contains("circle") &&
         allSquares[b].childNodes.length > 0 && allSquares[b].childNodes[0].classList.contains("circle") &&
         allSquares[c].childNodes.length > 0 && allSquares[c].childNodes[0].classList.contains("circle"))
      {
         let popup = document.querySelector(".popup");
         let all = document.querySelector(".overlay");
         all.classList.add("active");
         let alert = document.querySelector(".alert");         
         popup.classList.add("active");
         alert.innerHTML = "Circle wins 🎊🌟💯";
         let circleScore = document.getElementById("circleScore");
         let score = parseInt(circleScore.innerHTML);
         score++; // Increment the score
         circleScore.innerHTML = score;
         displayInfo.innerHTML = "Restart";
         displayInfo.classList.add("clicky");
         popup.addEventListener("click", restart);
         for (let cell of cells) {
           cell.removeEventListener("click", addChoice);
         }
      }     
   }
   
   for (let i = 0; i < combos.length; i++) {
      let [a, b, c] = combos[i];
      if (allSquares[a].childNodes.length > 0 && allSquares[a].childNodes[0].classList.contains("cross") &&
         allSquares[b].childNodes.length > 0 && allSquares[b].childNodes[0].classList.contains("cross") &&
         allSquares[c].childNodes.length > 0 && allSquares[c].childNodes[0].classList.contains("cross"))
    {
         let popup = document.querySelector(".popup");
         let all = document.querySelector(".overlay");
         all.classList.add("active");
         let alert = document.querySelector(".alert");        
         alert.innerHTML = "Cross wins 🎊🌟💯";
         popup.classList.add("active");
         let crossScore = document.getElementById("crossScore");
         let score2 = parseInt(crossScore.innerHTML);
         score2++; // Increment the score
         crossScore.innerHTML = score2;
         displayInfo.innerHTML = "Restart";
         displayInfo.classList.add("clicky");
         displayInfo.addEventListener("click", restart);
         for (let cell of cells) {
           cell.removeEventListener("click", addChoice);
         }
      }
   }
}

function checkDraw() {
   for (let cell of cells) {
      if (cell.childElementCount <= 0) {
         return false
      }
   }
   return true
}
function restart() {
   displayInfo.innerHTML = `It is ${turn}\'s turn`;
   displayInfo.classList.remove("clicky");
   let chosen = document.querySelectorAll(".circle, .cross");
   chosen.forEach((element) => {
      element.classList.add("dis");
      element.parentNode.removeChild(element);
   });
   chosen.forEach((element) => {
      element.classList.remove("dis");
   });
   for (let cell of cells) {
     cell.addEventListener("click", addChoice);
   }
}
let again = () => {
   let popup = document.querySelector(".popup");
   popup.classList.remove("active");
   let all = document.querySelector(".overlay");
   all.classList.remove("active");
}
