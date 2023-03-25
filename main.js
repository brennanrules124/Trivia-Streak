let questions = [];
let score = 0;
let correctAnswer;
let answerButtons = [
	document.getElementById("ans1"),
	document.getElementById("ans2"),
	document.getElementById("ans3"),
	document.getElementById("ans4")
];

function fetchTriviaData() {
	return fetch('https://opentdb.com/api.php?amount=1&type=multiple')
		.then(response => response.json())
		.then(data => {
			const questions = data.results;
			return questions;
		})
		.catch(error => console.error(error));
}

fetchTriviaData()
	.then(data => {
		DisplayQuestion(data[0]);
	})
	.catch(error => console.error(error));


function DisplayQuestion(questionData) {
	document.getElementById("question").innerHTML = questionData.question;
	document.getElementById("category").innerHTML = questionData.category;
	document.getElementById("score").innerHTML = score;
	document.getElementById("youScored").innerHTML = "You Scored: " + score;

	//Multiple Choice Question Data
	let usedNumber;
	let totalIncorrectAnswers = 0;

	let random = Random(0, 4);

	answerButtons[random].innerHTML = questionData.correct_answer;
	usedNumber = random;
	correctAnswer = random;

	for (var i = 0; i < questionData.incorrect_answers.length + 1; i++) {
		if (usedNumber != i) {
			answerButtons[i].innerHTML = questionData.incorrect_answers[totalIncorrectAnswers];
			totalIncorrectAnswers++;
		}
	}

	//console.log(questionData);
}

function AnswerSelected(choice) {
	if (choice == correctAnswer) {
		score++;

		fetchTriviaData()
		.then(data => {
			DisplayQuestion(data[0]);
		})
		.catch(error => console.error(error));
	}
	else {
		OpenFailMenu();
	}

	/*
	fetchTriviaData()
		.then(data => {
			DisplayQuestion(data[0]);
		})
		.catch(error => console.error(error));
	*/
}

function OpenFailMenu(){
	document.getElementById("failMenu").style.width = "100%";
	score = 0;
}

function CloseFailMenu(){
	document.getElementById("failMenu").style.width = "0%";

	fetchTriviaData()
		.then(data => {
			DisplayQuestion(data[0]);
		})
		.catch(error => console.error(error));
}

function Random(min, max) { //Inclusive, Exclusive
	return (Math.floor((Math.random() * (max - min))) + min);
}