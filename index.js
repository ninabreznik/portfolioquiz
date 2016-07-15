// button ID, back button

/******************************************************************************
  QUIZ COMPONENT
******************************************************************************/
// REQUIRE
var yo = require('yo-yo')
var csjs = require('csjs-inject')
var minixhr = require('minixhr')
//var firebase = require('firebase'); 
//var app = firebase.initializeApp({
  //apiKey: "AIzaSyAQaeDK9YCU1YRfxMCX63uahUvJlxtYHo4",
  //authDomain: "test-ceff2.firebaseapp.com",
  //databaseURL: "https://test-ceff2.firebaseio.com",
  //storageBucket: "test-ceff2.appspot.com"
//});

// COLORS
var yellow = "#C2B97F"
var white = "#F2F7F2"
var violet = "#8E5572" 
var lightBrown = "#BCAA99"
var darkBrown = "#88665D"

// FONT 
var links = ['https://fonts.googleapis.com/css?family=Kaushan+Script']
var font = yo`<link href=${links[0]} rel='stylesheet' type='text/css'>`
document.head.appendChild(font)

// QUESTIONS

var questions = [
	`
  Statement #1:
  The next social network I build, 
  will definitely be for cats.
  `,
  `
  Statement #2:
  I believe dogs should be allowed 
  everywhere people are
  `,
  `
  Statement #3:
  My friends say, my middle name should be "Meow".
  `,
  `
  Statement #4:
  Snoop Dog is definitely one of my 
  favourite artists
  `, 
  `
  Statement #5:
  I think I could spend all day just 
  watching cat videows
  `,
  `
  Statement #6:
  I regularly stop people in the street   
  to pet their dogs.
  ` 
]  

// VARIABLES
var i = 0
var question = questions[i]
var result = "Click to see results"
var results = []

function quizComponent () {
	var css = csjs`
  	.quiz {
      background-color: ${yellow};
      text-align: center;
      font-family: 'Kaushan Script', cursive;
      padding-bottom: 200px;
      cursor: pointer;
    }   
    .welcome {
      font-size: 4em;
      padding: 50px;
      color: ${darkBrown}
    }
    .question {
      font-size: 2em;
      color: ${white};
      padding: 40px;
      margin: 0 5%;
    }
    .answers {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin: 0 5%;
    }
    .answer {
      background-color: ${violet};
      padding: 15px;
      margin: 5px;
      border: 2px solid ${white};
      border-radius: 30%;
    }
    .answer:hover {
      background-color: ${lightBrown}
    }
    .instruction {
      color: ${violet};
      font-size: 1em;
      margin: 0 15%;
      padding: 20px;
    }
    .results {
      background-color: ${violet};
      text-align: center;
      font-family: 'Kaushan Script', cursive;
      padding-bottom: 200px;
    }
  	.resultTitle{
      font-size: 4em;
      padding: 50px;
      color: ${white}
  	}
    .back {
      display: flex;
      justify-content: center;
    }
    .backImg {
      height: 30px;
      padding: 5px;
    }
    .backText {
      color: ${white};
      font-size: 25px;
    }
  `
	var html = template()
  document.body.appendChild(html) 
   
  return html
  
  function template () {
    return yo`
    <div class="${css.quiz}">
      <div class="${css.welcome}">
        Welcome to my quiz!
      </div>
      <div class="${css.question}">
        ${question} 
      </div>
      <div class="${css.answers}">
        <div class="${css.answer}" id="1" onclick=${nextQuestion}>1</div>
        <div class="${css.answer}" id="2" onclick=${nextQuestion}>2</div>
        <div class="${css.answer}" id="3" onclick=${nextQuestion}>3</div>
        <div class="${css.answer}" id="4" onclick=${nextQuestion}>4</div>
        <div class="${css.answer}" id="5" onclick=${nextQuestion}>5</div>
        <div class="${css.answer}" id="6" onclick=${nextQuestion}>6</div>
      </div>
      <div class="${css.instruction}">
        Choose how strongly do you agree with the statement<br>
        (1 - don't agree at all, 6 - completely agree) 
        .
			</div>
        <div class="${css.back}" onclick=${back}>
        	<img src="http://i.imgur.com/L6kXXEi.png" class="${css.backImg}"> 
          <div class="${css.backText}">Back</div>
        </div>
    </div> 
    ` 
  } 
  
  function nextQuestion() {
    if (i < (questions.length-1)) {
      results[i] = this.id
      i = i+1  
      question = questions[i]
      yo.update(html, template())
    } else { 
      results[i] = this.id
      sendData(results)
    	yo.update(html, seeResults())
    }
  }
  
  function seeResults() {
    return yo`
    	<div class="${css.results}">
        <div class="${css.resultTitle}">
          See how others answered
        </div>
      </div>
    `
  }
  
  function back() {
    if (i > 0) {
      i = i-1 
      question = questions[i]
      yo.update(html, template())
    }
  }
    
  function sendData(data) {
    var request  = {  
  		url          : 'http://requestb.in/ss2ioyss',
 		 	method       : 'POST', 
  		data         : JSON.stringify(data),
      headers      : {}
		}
    minixhr(request)
  }
}

quizComponent()