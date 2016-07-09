/******************************************************************************
  QUIZ COMPONENT
******************************************************************************/
// REQUIRE
var yo = require('yo-yo')
var csjs = require('csjs-inject')

// COLORS
var yellow = "#C2B97F"
var white = "#F2F7F2"
var violet = "#8E5572"
var lightBrown = "#BCAA99"
var darkBrown = "#88665D"

// FONT
var link = 'https://fonts.googleapis.com/css?family=Kaushan+Script'
var font = yo`<link href=${link} rel='stylesheet' type='text/css'>`
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
var i = 0
var question = questions[i]
var result = "Click to see results"

function quizComponent () {
	var css = csjs`
  	.quiz {
      background-color: ${yellow};
      text-align: center;
      font-family: 'Kaushan Script', cursive;
      padding-bottom: 200px;
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
        <div class="${css.answer}" onclick=${nextQuestion}>1</div>
        <div class="${css.answer}" onclick=${nextQuestion}>2</div>
        <div class="${css.answer}" onclick=${nextQuestion}>3</div>
        <div class="${css.answer}" onclick=${nextQuestion}>4</div>
        <div class="${css.answer}" onclick=${nextQuestion}>5</div>
        <div class="${css.answer}" onclick=${nextQuestion}>6</div>
      </div>
      <div class="${css.instruction}">
        Mark how strong from 1 (not at all) to 6 (completely) 
        do you agree with the statement.
			</div>
    </div> 
    ` 
  } 
  
  function nextQuestion() {
    if (i < (questions.length-1)) {
      i = i+1  
      question = questions[i]
      yo.update(html, template())
    } else {
    	yo.update(html, seeResults())
    }
  }
  
  function seeResults() {
    return yo`
    	<div class="${css.results}">
        See how others answered
      </div>
    `
  }
}

quizComponent()