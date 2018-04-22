var inquirer = require("inquirer");
var chalk = require("chalk");
var Word = require("./Word");
var countries = require("./countries");

function Game() {
  var self = this;
  this.play = function() {
    this.gRemaining = 10;
    this.nextWord();
  };



this.nextWord = function() {
var randWord = countries[Math.floor(Math.random() * countries.length)].name;
this.currentCountry = new Word(randWord);
console.log('\n' + this.currentCountry + '\n');
this.nextGuess();
};



  this.nextGuess = function() {
  this.nextLetter().then(function() {
  if (self.gRemaining < 1) {
  console.log("You lost!!! The country was: \"" + self.currentCountry.getSolution() + "\"\n");
  self.playAgain();

  }else if (self.currentCountry.guessedCorrectly()) {
  console.log("You got it right! Next Country?");
  self.gRemaining = 10;
  self.nextWord();}
  else {
  self.nextGuess();
      }
    });
  };




  this.playAgain = function() {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "choice",
          message: "Play Again??"
        }
      ])
      .then(function(val) 
      {
        if (val.choice) {
          self.play();
        }
        else {
          self.quit();
        }
      });
  };

  this.nextLetter = function() {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "choice",
          message: "Guess a letter of the country",
          validate: function(val) {
            return /[a-z1-9]/gi.test(val);
          }
        }
      ])
      .then(function(val) {
        var correctGuess = self.currentCountry.guessLetter(val.choice);
        if (correctGuess) {
          console.log(chalk.green("\nYou guessed right!\n"));
        }
        else {
          self.gRemaining--;
          console.log(chalk.red("\nWrong!!!\n"));
          console.log(self.gRemaining + " guesses left\n");
        }
      });
  };


  
this.quit = function() {
  console.log("\nPlay Again Soon!");
  process.exit(0);
  };
}

module.exports = Game;
