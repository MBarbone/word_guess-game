var words = ['rome', 'austin', 'athens', 'sydney', 'philadelphia', 'london', 'dubai', 'tokyo', 'paris'];

var alphabetArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

// snumber of wins
var winCount = 0;

// number of losses
var lossCount = 0;

// correct guesses counter
var rightGuessCounter = 0;

// numer of user guesses remaining
var guessesRemaining = 10;

// placeholder for the chosen city
var randomCity = "";

// placeholders for letters in the chosen word
var lettersInCity = [];

// number of blanks in the word 
var numBlanks = 0;

// placeholder for blanks and letter with successful hits 
var blanksAndHits = [];

// placeholder for letters with no hits 
var wrongLetters = [];

// sound functions
function playCorrect() {
    document.getElementById('correct-answer').play();
};

function playWrong() {
    document.getElementById('wrong-answer').play();
};


// Below are functions for the one-word movie title game
function reset(){
    randomCity = words[Math.floor(Math.random() * words.length)];
    lettersInCity = randomCity.split('');     
    numBlanks = lettersInCity.length;

    letterGuessed = 0;
    rightGuessCounter = 0;
    guessesRemaining: 10;
    wrongLetters = [];
    blanksAndHits = [];
    alphabetArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    test=false;
    startGame();
};

function startGame(){
    randomCity = words[Math.floor(Math.random() * words.length)];
    lettersInCity = randomCity.split('');     
    numBlanks = lettersInCity.length;

    rightGuessCounter = 0;
    guessesRemaining = 10;
    wrongLetters = [];
    blanksAndHits = [];    
    alphabetArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    // holds the number of underscores that match a one-word movie title
	for(var i = 0; i< numBlanks; i++){
        blanksAndHits[i] = "_";    
        document.querySelector('#cityToGuess').innerText = blanksAndHits;
    }

    document.querySelector('#cityToGuess').innerText = blanksAndHits.join(' ');
    document.querySelector('#numGuessesLeft').innerText = guessesRemaining;
    document.querySelector('#numWins').innerText = winCount;
    document.querySelector('#numLosses').innerText = lossCount;
    document.querySelector('#userGuesses').innerText = wrongLetters;

    console.log(randomCity);
    console.log(lettersInCity);
    console.log(numBlanks);
    console.log(blanksAndHits);
};

// To display correct guessed letters and wrong letters in their corresponding divs and also decreases the count of remaining guesses accordingly   
function compareLetters (userKey){
    if(randomCity.indexOf(userKey) > -1){
        for(var i = 0; i < numBlanks; i++){
            if(lettersInCity[i] === userKey){
                rightGuessCounter++;
                blanksAndHits[i] = userKey;
                document.querySelector('#cityToGuess').innerText = blanksAndHits.join(' ');
            }
        }

        console.log(blanksAndHits);
    }
    else{
        wrongLetters.push(userKey);
        guessesRemaining--;
        
        document.querySelector('#numGuessesLeft').innerText = guessesRemaining;
        document.querySelector('#userGuesses').innerText = wrongLetters;
        
        console.log('Wrong letters = ' + wrongLetters);
        console.log('Guesses remaining are ' + guessesRemaining);
    }
};

// To display the counts of wins and losses
function winLose(){
    if(rightGuessCounter === numBlanks){
        winCount++;
        playCorrect();

        document.querySelector('#numWins').innerText = winCount;
        reset();
    }
    else if(guessesRemaining === 0){
        lossCount++;
        playWrong();

        document.querySelector('#numLosses').innerText = lossCount;
        reset();
    }
};

// Initiates the code
startGame();

document.onkeyup = function(event){
    test = true;
    var letterGuessed = event.key;
    for(var i = 0; i < alphabetArray.length; i++){
        if(letterGuessed === alphabetArray[i] && test === true){
            var spliceAlphabetArray = alphabetArray.splice(i,1);
            
            console.log('Double word is = ' + alphabetArray[i]);
            console.log('Splice word is = ' + spliceAlphabetArray);

            compareLetters(letterGuessed);
            winLose();
        }
    }
};