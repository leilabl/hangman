var express = require('express');
var exphbs = require('express-handlebars');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const Hangman = require('./game.js'); 
let hangman;

const hbs = exphbs.create({
    helpers: {
        json: (context) => JSON.stringify(context)
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    hangman = new Hangman();
    res.redirect('/game');
});

app.get('/game', function (req, res) {
    if (!hangman) {
        res.redirect('/');
    }

    res.render('home', {
        secretWordChars: hangman.secretWordChars,
        letters: hangman.letters,
        guessesRemaining: hangman.guessesRemaining,
        won: hangman.won,
    });
});

app.post('/', function (req, res) {
    const guess = req.body.guess;
    hangman.handleGuess(guess);
    res.redirect('/game');
});

app.post('/restart', function (req, res) {
    res.redirect('/');
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
