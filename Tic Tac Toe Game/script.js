 const box = document.querySelectorAll(".box");
const statusText = document.querySelector("#status");
const restartBtn = document.querySelector("#restartBtn");
const winnerConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;

//Functions started Here
initialization();

function initialization(){
    box.forEach(box => box.addEventListener("click", boxClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s Turn`;
    running = true;
}

function boxClicked(){
    const cellIndex = this.getAttribute("cellindex");
    if(options[cellIndex] !== "" || !running){
        return;
    }
    updateBox(this, cellIndex);
    checkWinner();
}

function updateBox(box, index){
    options[index] = currentPlayer;
    box.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner(){
    let roundWon = false;
    for(let i=0; i<winnerConditions.length; i++){
        const condition = winnerConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA === "" || cellB === "" || cellC === ""){
            continue;
        }
        if(cellA === cellB && cellB === cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if(!options.includes("")){
        statusText.textContent = `Draw`;
        running = false;
    } else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["","","","","","","","",""];
    box.forEach(box =>  box.textContent = "");
    statusText.textContent = `${currentPlayer}'s Turn`;
    running = true;
}
