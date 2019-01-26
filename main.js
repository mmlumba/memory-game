var container = document.querySelector(".card-container");
var pairs = ["1a", "1b", "2a", "2b", "3a", "3b", "4a", "4b", "5a", "5b", "6a", "6b", "7a", "7b", "8a", "8b"]
var shuffledCards = [];
var openedCards = [];
var matchedCards = [];
var playerInput = document.getElementById("playerInput");
var startButton = document.getElementById("startButton")

function shuffle(array) {
    var cardsInDeck = array.length
    var tempValue;
    var randomIndex;

    while (cardsInDeck !== 0) {
        randomIndex = Math.floor(Math.random() * cardsInDeck);
        cardsInDeck -= 1
        tempValue = array[cardsInDeck];
        array[cardsInDeck] = array[randomIndex];
        array[randomIndex] = tempValue;
    }
    return array;
}

function numToWord(num) {
    switch (num) {
        case '1':
            return "one"
        case '2':
            return "two"
        case '3':
            return "three"
        case '4':
            return "four"
        case '5':
            return "five"
        case '6':
            return "six"
        case '7':
            return "seven"
        case '8':
            return "eight"
    }
}

function flipCard() {
    $(this).toggleClass("show");
}

function compare(){
    openedCards.push(this);
    if (openedCards.length === 2){
        if(openedCards[0].id.charAt(0) === openedCards[1].id.charAt(0)){
            isMatch();
        } else {
            isNotMatch();
        }
    }
}

function generatePairs(value) {
    var arr = [];
    for (var i = 0; i < value; i++){
        arr.push(i+1+"a");
        arr.push(i+1+"b");
    }
    return arr;
}

function makeCards(numCards) {
    var newArray = [];
    var value = Number(numCards);
    if (value <= 8) {
        newArray = generatePairs(value);
    }
    else {
        alert("You can't do that");
    }
    console.log(newArray);
    var shuffledPairs = shuffle(newArray);
    shuffledPairs.map((card) => {
        shuffledCards.push($( `<div class="card ${numToWord(card.charAt(0))}" id=${card}></div>` ).appendTo(container));
    })
}

function isMatch(){
    if (openedCards[0].id.charAt(1) !== openedCards[1].id.charAt(1)){
        openedCards.forEach(function(card){
            $(card).removeClass("show");
            $(card).addClass("match");
        })
        matchedCards.push.apply(matchedCards, openedCards);
        matchedCards.forEach((match) => $(match).addClass("disabled"));
        openedCards = [];
    }
    else {
        isNotMatch();
    }
}

function isNotMatch(){
    disableClick();
    setTimeout(function(){
        openedCards.forEach(function(card){
            $(card).removeClass("show");
        })
        enableClick();
        openedCards = [];
    },1200);
}

function disableClick() {
    $(".card").addClass("disabled")
}

function enableClick(){
    shuffledCards.forEach((card) => {
        if (!$(card).hasClass("match")){
            $(card).removeClass("disabled")
        }
    })
}

function startGame(numCardsStarted) {
    makeCards(numCardsStarted);

    shuffledCards.forEach((card) => {
        $(card).click(flipCard).click(compare)
    })
}

startButton.addEventListener("click", function(){startGame(playerInput.value)});