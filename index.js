// firebase REST API
/******************************************************************************
  QUIZ COMPONENT
******************************************************************************/ 
// REQUIRE
var yo = require('yo-yo') 
var csjs = require('csjs-inject')
var minixhr = require('minixhr')
var chart = require('chart.js')

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
var answerOptions = [1,2,3,4,5,6]

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
      background-color: ${lightBrown};
      cursor: pointer;
    }
    .instruction {
      color: ${violet};
      font-size: 1em;
      margin: 0 15%;
      padding: 20px;
    }
    .results {
      background-color: ${lightBrown};
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
    .showChart {
      font-size: .5em;
      color: ${violet};
      margin: 35px;
    }
    .showChart:hover {
      color: ${white};
      cursor: pointer;
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
        ${answerOptions.map(x=>yo`
        	<div class="${css.answer}" onclick=${nextQuestion(x)}>${x}</div>
        `)}
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
  
  function nextQuestion(id) {
  	return function () {
      if (i < (questions.length-1)) {
        results[i] = id
        i = i+1  
        question = questions[i]
        yo.update(html, template())
    	} else { 
        results[i] = id
        sendData(results)
        yo.update(html, seeResults(results))
    	}
    }
  }
  
  function seeResults(data) {
    var stats = getStats()
    var ctx = yo`
    	<canvas id="myChart" width="400" height="400"></canvas>
    `
    return yo`
    	<div class="${css.results}">
        <div class="${css.resultTitle}">
          Compare your answers
    <div class="${css.showChart}" onclick=${function(){createChart(ctx, data)}}>Click to see the chart
        </div>
        ${ctx}
      </div>
    ` 
  }
 
  function createChart(ctx, myData) {
    var data = {
    	labels: [
        "Statement #1", "Statement #2", "Statement #3",
        "Statement #4", "Statement #5", "Statement #6"
      ],
      datasets: [
        {
          label: "My statments",
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBackgroundColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          data: myData
        },  
        {
          label: "Others statements",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255,99,132,1)", 
   	      data: [1,2,3,4,5,6] 
        }
    	]
		}
		var myChart = new Chart(ctx, {
      type: 'radar',
      data: data,
      options: {
        scale: {
          scale: [1,2,3,4,5,6],
          ticks: {
          	beginAtZero: true
          }
      	}
      }
    })
    return ctx
  }
  
  function back() {
    if (i > 0) { 
      i = i-1 
      question = questions[i]
      yo.update(html, template())
    }
  }
    
  function sendData(results) {  
    var request  = { 
  		url          : 'https://test-ceff2.firebaseio.com/results.json',
  		method       : 'POST',
  		data         : JSON.stringify(results)
		}
    minixhr(request)
  }
  
  function getStats () {
      minixhr('https://test-ceff2.firebaseio.com/results.json', responseHandler)
    function responseHandler (data, response, xhr, header) {
      var data = JSON.parse(data)
      var keys = Object.keys(data)
      var answers = keys.map(x=>data[x])
    }
  }
  return stats
}

quizComponent()