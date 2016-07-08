/******************************************************************************
  QUIZ COMPONENT
******************************************************************************/
// REQUIRE
var yo = require('yo-yo')
var csjs = require('csjs-inject')

function quizComponent () {
	var css = csjs`
  	.quiz {
    	background-color: red;
    }    
  `
  document.body.appendChild(template()) 
  
  var html = template()
  return html
  
  function template () {
    return yo`
    <div class="${css.quiz}">
      	This is a quiz
      </div>
    `
  }                  
}

quizComponent()