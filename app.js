var numbers = {
  numberOne: 0,
  numberTwo: 0,
  solution: 0,
};

var scoreBoard = [{
  currentScore: 0,
  currentCombo: 0,
},
{
  bestScore: 0,
  bestCombo: 0,
  bestTime: 0,
}]

var startGame = function () {
  timerFunction();
  animationFunction();
  randomQuestion();
};

var checkAnswer = function () {
  var answer = $('.answer').val()
  console.log(answer)
  if (parseFloat(answer) === numbers.solution) {
    randomQuestion();
    $('.answer').val('');
    scoreBoard[0].currentScore++;
    $('.current-round-wins').html(scoreBoard[0].currentScore);
  }
};

var randomQuestion = function () {
  numbers.numberOne = Math.floor(Math.random() * 10)
  numbers.numberTwo = Math.floor(Math.random() * 10)
  numbers.solution = numbers.numberOne + numbers.numberTwo

  $('#equation').html(numbers.numberOne + ' + ' + numbers.numberTwo + ' = ' + numbers.solution)
}

var timerFunction = function () {
  var timeAlloted = 10;
  var timeDecrease = setInterval(function () {
    timeAlloted--;
    $('#timer').html(timeAlloted)

    if (timeAlloted === 0) {
      clearInterval(timeDecrease)
      endGame();
    }
  }, 1000)
}

var animationFunction = function () {
  $('.top-right').addClass('rotate-flame-right')
  $('.top-left').addClass('rotate-flame-left')
  $('.flames').addClass('lower-flame')
  $('#fuse').addClass('fuse-decrease-size')
}


var endGame = function () {
  $('.explosion-div').removeClass('d-none')
  $('.bomb-div').addClass('d-none')
  setTimeout( function() { $('.btn-danger').removeClass('d-none') }, 2000);
}

$('.answer').focus(function () {
  startGame();
})

$('.answer').on('input', function() {
  checkAnswer();
})
