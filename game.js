module.exports = class Hangman {
    constructor() {
        this._alphabeth = 'abcdefghijklmnopqrstuvwxyz';
        this.words = ['wordone', 'wordtwo', 'wordthree'];

        this._randomWord = this.getRandomWord();
        this.distinctChars = new Set(this._randomWord);
        this.found = new Set();

        this.letters = this.generateLetters();
        this.secretWordChars = this.getSecretWord();
        this.guessesRemaining = 5;
        this.won = false;
    }

    getRandomWord() {
        const randomIndex = Math.floor(
            Math.random() * this.words.length
        );
        return this.words[randomIndex];
    }

    getSecretWord() {
        let secretWord = [];
        for (let char of this._randomWord) {
            secretWord.push({value: char, isGuessed: false});
        }
        return secretWord;
    }

    generateLetters() {
        let letters = [];
        for (let letter of this._alphabeth) {
            letters.push({value: letter, isGuessed: false});
        }
        return letters;
    }

    handleGuess(guess) {
        this.storeGuess(guess);
        this.updateSecretWord(guess);
    }

    updateSecretWord(guess) {
        const currentMatches = this.found.size;
        const charGuessed = this.letters[guess].value;
        for (let i = 0; i < this.secretWordChars.length; i++) {
            if (this.secretWordChars[i].value === charGuessed) {
                this.secretWordChars[i].isGuessed = true;
                this.found.add(this.secretWordChars[i].value);
            }
        }

        currentMatches === this.found.size ? this.guessesRemaining-- : this.checkIfWon();
    }

    storeGuess(guess) {
        this.letters[guess].isGuessed = true;
    }

    checkIfWon() {
        if (this.found.size === this.distinctChars.size) {
            this.won = true;
        }
    }
}

