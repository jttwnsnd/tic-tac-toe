var whosTurn = 1; //start off on player 1's turn
var singlePlayerTurn = false;

var winners = [
['A1', 'A2', 'A3'], //row 1
['B1', 'B2', 'B3'], //row 2
['C1', 'C2', 'C3'], //row 3
['A1', 'B1', 'C1'], //column 1
['A2', 'B2', 'C2'], //column 2
['A3', 'B3', 'C3'], //column 3
['A1', 'B2', 'C3'], //diag down right
['A3', 'B2', 'C1'] //diag down left
];

var player1 = []; //Array where we will stash the squares player 1 has checked
var player2 = []; //Array where we will stash the squares player 2 has checked
var someoneWon = false;

function setSingle(){
	if(singlePlayerTurn === false){
		singlePlayerTurn = true;
		console.log('hi');
		changeFunction();
	}
}

function set2Player(){
	if(singlePlayerTurn === true){
		singlePlayerTurn = false;
		console.log('hi');
		changeFunction();
	}
}

function changeFunction(){
	if (singlePlayerTurn === true) {
		for(var i = 0; i < 10; i++){
			document.getElementsByClassName('box')[i].setAttribute("onclick", "MarkSq1(this)");
		}
	}else{
		for(var i = 0; i < 10; i++){
			document.getElementsByClassName('box')[i].setAttribute("onclick", "markSq2(this)");
			console.log('im good');
			i++
		}
	}
}

function markSq2(square){ //this tells us what object it is attached to.
	if(someoneWon){
		document.getElementById(square).setAttribute('disabled', "");
	}

	//check to see if this square is in another player's array. if so, goodbye
	else if((player1.indexOf(square.id) == -1) && (player2.indexOf(square.id) == -1)){
		if(whosTurn == 1){
			square.innerHTML = "X";
			whosTurn = 2;
			player1.push(square.id);
			checkWin(player1, whosTurn);
		}else{
			// computerMove();
			square.innerHTML = "O";
			whosTurn = 1;
			player2.push(square.id);
			checkWin(player2, whosTurn);
		}
	}else{
		console.log("Something's already there!")
	}
	checkWin();
	console.log(player1, player2)
}

function markSq1(square){ //this tells us what object it is attached to.
	if(someoneWon){
		document.getElementById(square).setAttribute('disabled', "");
	}

	//check to see if this square is in another player's array. if so, goodbye
	else if((player1.indexOf(square.id) == -1) && (player2.indexOf(square.id) == -1)){
		if(whosTurn == 1){
			square.innerHTML = "X";
			whosTurn = 2;
			player1.push(square.id);
			for(var i = 0; i < totalSpots.length; i++){
				if(totalSpots[i] === square.id){

					totalSpots.splice(i, 1)
				}
			}
			checkWin(player1, whosTurn);
			computerMove();
			player2.push(square.id);
			checkWin(player2, whosTurn);
		}
	}
}
var rowCount = 0;
function checkWin(currentCount, whoJustMarked){
	// loop through the outer array
	for(var i = 0; i < winners.length; i++){
		// loop through the inner arrays
		rowCount = 0;
		for(var j = 0; j < winners[i].length; j++){
			if(currentCount.indexOf(winners[i][j]) > -1){
			//HIT!
				rowCount++;
			}
			if(rowCount == 3){
				console.log("You won, Player " + whoJustMarked + "!")
				gameOver(whoJustMarked, winners[i]);
			}
		}
	}
}

function gameOver(whoWon, winningCombo){
	document.getElementById('message').innerHTML = "Congratulations to Player " + whoWon + ". You won with " + winningCombo.join();
	for(var i = 0; i < winningCombo.length; i++){
		document.getElementById(winningCombo[i]).className += ' winner' 
	}
	someoneWon = true;
}

var checkedSquare = 0;
var spacesLeft = 8;
function randomSpot(){
	checkedSquare = Math.floor(Math.random() * spacesLeft);
}
randomSpot();
var totalSpots = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];
var spotIndex = [];
console.log(totalSpots);
console.log(totalSpots[checkedSquare]);
console.log(spotIndex);
//use splice to remove elements from array, and keep a counter that decreases as you remove elements from array.

function computerMove(){
	randomSpot();
	for(var i = checkedSquare; i <= totalSpots.length; i = randomSpot()){
		console.log(i);
		console.log(totalSpots[i]);
		if(document.getElementById(totalSpots[i]).innerHTML !== "X"){
			document.getElementById(totalSpots[i]).innerHTML = "O";
			spacesLeft -= 1;
			totalSpots.splice(i, 1);
			whosTurn = 1;
			console.log(totalSpots);
			break;
		}else if((document.getElementById(totalSpots[i]).innerHTML === "X") || (document.getElementById(totalSpots[i]).innerHTML === "O")){
			i = randomSpot();
		}
	}
}




function reset(){
	for(var i = 0; i <= 8; i++){
		document.getElementsByClassName('box')[i].setAttribute("class", "box");
		document.getElementsByClassName('box')[i].innerHTML = "-";
		document.getElementById('message').innerHTML = "";
	}


}