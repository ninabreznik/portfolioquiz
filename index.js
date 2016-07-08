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
      padding: 70px;
      color: ${darkBrown}
    }
    .question {
      font-size: 2em;
      color: ${white};
      padding: 30px;
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
  `
  document.body.appendChild(template()) 
  
  var html = template()
  return html
  
  function template () {
    return yo`
    <div class="${css.quiz}">
      <div class="${css.welcome}">
        Welcome to my quiz!
      </div>
      <div class="${css.question}">
        Statement #1: If I had to choose, I would choose a cat over a dog.
      </div>
      <div class="${css.answers}">
        <div class="${css.answer}">1</div>
        <div class="${css.answer}">2</div>
        <div class="${css.answer}">3</div>
        <div class="${css.answer}">4</div>
        <div class="${css.answer}">5</div>
        <div class="${css.answer}">6</div>
      </div>
    </div>
    `
  }                  
}

quizComponent()