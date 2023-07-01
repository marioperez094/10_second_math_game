var currentQuestion;
var operations = [];
var timeAlloted = 10;
var currentScore = {
  score: 0,
  time: 0,
}
var bestScore = {
  score: 0,
  time: 0,
}

var startGame = function () {
  var add = $('.add').is(':checked');
  var subtract = $('.subtract').is(':checked');
  var multiply = $('.multiply').is(':checked');
  var divide = $('.divide').is(':checked');
  
  if (add === true) { operations.push(1) };
  if (subtract === true) { operations.push(2) };
  if (multiply === true) { operations.push(3) };
  if (divide === true) { operations.push(4) };

  if (operations.length < 1) { return alert ('Please select an operation.') }

  $('.answer').off('click', startGame);
  $('.signs-list').addClass('d-none');
  animationFunction('start');
  timerFunction();
  randomQuestion();
};

var randomNumber = function (multiple) {
  return Math.ceil(Math.random() * multiple);
};

var randomQuestion = function () {
  var question = {}
  var multiple = $('.number-slider').val()
  
  var num1 = randomNumber(multiple);
  var num2 = randomNumber(multiple);
  var sign = operations[randomNumber(operations.length - 1)];

  switch (sign) {
    case 1:
      question.solved = num1 + num2
      question.equation = num1 + ' + ' + num2 + ' =' 
      break;
    case 2:
      question.solved = num1 - num2
      question.equation = num1 + ' - ' + num2 + ' =' 
      if (question.solved < 0) {
        randomQuestion(operations);
        return;
      }
      break;
    case 3:
      question.solved = num1 * num2
      question.equation = num1 + ' × ' + num2 + ' =' 
      break;
    case 4:
      question.solved = num1 / num2
      question.equation = num1 + ' ÷ ' + num2 + ' ='
      if (question.solved % 1 !== 0) { 
        randomQuestion(operations)
        return; 
      }
      break;
  }

  currentQuestion = question;

  $('#equation').html(question.equation)

  return question;
};

var checkAnswer = function () {
  var answer = $('.answer').val();
  var currentAnimation = parseFloat($('.lower-flame').css('animation-duration'));

  if (parseFloat(answer) === currentQuestion.solved) {
    randomQuestion();

    timeAlloted += 1;

    $('.current-round-wins').html(++currentScore.score);

    $('.answer').val('');

    var addAnimation = currentAnimation + 2
    
    $('.lower-flame').css('animation-duration', addAnimation + 's')
    $('.fuse-decrease-size').css('animation-duration', addAnimation + 's')

  }
}

var timerFunction = function () {
  var timerDecrease = setInterval(function () {
    $('#timer').html(--timeAlloted);

    $('.current-round-time').html(currentScore.time++)

    bgChanges(timeAlloted);

    if (timeAlloted === 0) {
      clearInterval(timerDecrease);
      endGame();
    }
  }, 1000);

}

var animationFunction = function (startStop) {
  if (startStop === 'start') {
    $('.top-right').addClass('rotate-flame-right');
    $('.top-left').addClass('rotate-flame-left');
    $('.flames').addClass('lower-flame');
    $('#fuse').addClass('fuse-decrease-size');
  }
  else {
    $('.top-right').removeClass('rotate-flame-right');
    $('.top-left').removeClass('rotate-flame-left');
    $('.flames').removeClass('lower-flame');
    $('#fuse').removeClass('fuse-decrease-size');
  }
}

var bgChanges = function (currentTime) {
  if(currentTime === 5) {
    $('body').css('background-color', 'coral')
  }
  else if (currentTime === 2) {
    $('body').css('background-color', 'lightcoral')
  }
}

var endGame = function () {
  $('.answer').val('');
  $('.explosion-div').removeClass('d-none');
  $('.bomb-div').addClass('d-none');
  setTimeout( function() { $('.btn-danger').removeClass('d-none') }, 2000);

  newBest();
}

var newBest = function () {
  if (currentScore.score > bestScore.score) {
    bestScore.score = currentScore.score;
    bestScore.time = currentScore.time;
  }

  $('.best-round-wins').html(bestScore.score);
  $('.best-round-time').html(bestScore.time);
}

var resetGame = function() {
  currentScore.score = 0;
  currentScore.time =0;
  timeAlloted = 10;
  $('.current-round-wins').html(currentScore.score);
  operations = operations.slice(operations.length);

  animationFunction();

  $('body').css('background-color', 'greenyellow');
  $('.explosion-div').addClass('d-none');
  $('.signs-list').removeClass('d-none');
  $('.bomb-div').removeClass('d-none');
  $('#timer').html(timeAlloted);
  $('#equation').html('');
  $('.btn-danger').addClass('d-none');
  $('.answer').on('click', startGame);
}


$('.answer').on('click', startGame);

$('.answer').on('input', function() {
  checkAnswer();
});

$(document).on('click', '.btn-danger', function() {
  resetGame();
});

$('.number-slider').on('change', function() {
  $('.slider-text').html($('.number-slider').val())
})