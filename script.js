// variables to track scores of user and machine
let countUserScore = 0;
let countCompScore = 0;

// fetch elements to work on
const choices = document.querySelectorAll(".choice");  // choices: list of choice(rock, paper and seasor)

const msgBox = document.querySelector("#msg");   // for winer/draw game 

// for score update
const userScoreBoard = document.querySelector("#user-score");
const compScoreBoard = document.querySelector("#comp-score");

const resetGameBtn = document.querySelector(".reset-btn");


// Code Starts here : USER CHOICE- on click do something below defined
choices.forEach( (choice) => {
    choice.addEventListener("click" , () => {
        const userChoice = choice.getAttribute("id"); // from element (choice- where user clicks) give its attribute id - rock or paper or scissor
        
        // Once user clicked (choosed any choice) - playGame now (computer generated choice- called in playGame() )
        playGame(userChoice);  // call to method
    });
});


// playGame method 
const playGame = (userChoice) => {
    // Generate choice by Machine
    const compChoice = getCompChoice();

    // Now we have userChoice and compChoice : check winner condition and update score board accordingly
    if(userChoice === compChoice){
        // Game draw 
        drawGame(); // call
    }

    else{  // if not draw (must be different choice)

        // using ternary operator(we can do simply by if-else ladder to proceed)
        if(userChoice === "rock"){
            // possiblke for computer : paper , seasors
            userWin = (compChoice === "paper") ? false: true;   // if compChoice = paper , then user does not win else  (remaining "seasors") user wins (true)
        }
        else if(userChoice === "paper"){
            // compChoice : rock or seasors 
            userWin = (compChoice === "rock" )? true: false;
        }
        else{  // remaining userChoice === "scissors"
             // compChoice possible: rock or paper
             userWin = (compChoice === "paper")? true: false;
        }

        
    // pass userWin to show whinner -> Also pass userChoice and compChoice to show in msg
    showWinner(userWin, userChoice, compChoice);  // call -  method below
    } // outer else
    
}

// Computer Choice - to generate
const getCompChoice = () => {
    // computer generate randomly - rock, paper or seasors
    // step 1: make array of options 
    const arrChoice = ["rock", "paper", "scissors"];  // keep in mind that array elements be same as possible userChoice (i.e.,w.r.t id's of choice )
    // step 2: generate random index 0,1 or 2 -> (js has random() of Math class to generate any random b/w 0-1 but we can make it to retrun whole no. within defined range. Then use those whole no. generated as index to feth rock, paper or seasors from array)
    const  randIndx= Math.floor( Math.random() * 3 ); 
                 // ^^ floor() : removes decimal (gives <= z) , random() -> return b/w 0-1 ( * 3 gives b/w 0 to 2.99999 which upon using floor() gives b/w 0-2 : reqd index of array)
    
    // return choosen choice 
    return arrChoice[randIndx];
}


// when is draw - same Choice
const drawGame = () => {
    msgBox.innerHTML = "Draw! Play again";  // show in browser (msg para - HTML elment)
    // Change Background as well when game draws
    msgBox.style.backgroundColor = "#081b31";  // default color as set in css file for msg box
}

// to decide winner
const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin === true){
        countUserScore++; // count to user score board
        userScoreBoard.innerHTML = countUserScore;  // show in browser (html element)


        msgBox.innerHTML = `You won! Your ${userChoice} beats ${compChoice}`;
        // Change Background as well when user wins
        msgBox.style.backgroundColor = "green";
    }
    else{
        countCompScore++;
        compScoreBoard.innerHTML = countCompScore;  // show in broser (html element)

        msgBox.innerHTML =`You Lost. ${compChoice} beats your ${userChoice}`; 
         // Change Background as well when user loses
         msgBox.style.backgroundColor = "red";
    }
}


// for reset-btn : to reset game (erase scoreboard of user and computer AND msgBox default set text "Result Board")
resetGameBtn.addEventListener("click", () =>{
    userScoreBoard.innerHTML = 0;
    compScoreBoard.innerHTML = 0;

    msgBox.innerHTML = "Result Board";
    msgBox.style.backgroundColor = "#081b31";
});