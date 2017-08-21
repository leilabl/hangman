'use strict';
const _ = require('lodash');

module.exports = {
  game: game,
  pickLetter: pickLetter,
};

const Hangman = require('../../game.js'); 
let hangman = new Hangman();

function game(req, res) {
    /*
    if (hangman) {
        console.log('empty')
        hangman = new Hangman();
    }
    */

    res.json({
        secretWordChars: hangman.secretWordChars,
        letters: hangman.letters,
        guessesRemaining: hangman.guessesRemaining,
        won: hangman.won,
    });
}

function pickLetter(req, res) {
    console.log(req)
    const guess = req.body.guess;
    console.log(guess)
    hangman.handleGuess(guess);
    res.redirect('/');
}
