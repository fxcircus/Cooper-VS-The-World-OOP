//////////////////////////////
// Global Variables 
//////////////////////////////
let storyProgress = 0;
//////////////////////////////
// DOM
//////////////////////////////
const newGameModalEl = document.querySelector('#new-game-modal')
const mapModal = document.querySelector('#game-map-modal')
const fightModalEl = document.querySelector('#fight-modal')
const newGameBtnEl = document.querySelector('.new-game-button')
const attackButtonEl = document.querySelector('#attack-button')

newGameBtnEl.addEventListener('click', (evt) => {
    newGameModalEl.removeChild(newGameBtnEl)
    mapModal.classList.add('show')
})

attackButtonEl.addEventListener('click', (evt) => {
    mapModal.classList.remove('show')
    fightModalEl.classList.add('show')
})

//////////////////////////////
// Functions
//////////////////////////////

// Timeout Message

// Attack (attakcer, target)

// Item

// Update Health Bar

// Retreat

// Reload fight or Restart Game

// Next Story (storyProgress)

// Exit Window

//////////////////////////////
// Classes
//////////////////////////////

// Fighter (Name, HP, Accuracy, DOM elemnts)
// Mothods: Kill

// Cooper
// [{Lick:7}, {Fish Breath: 20}]

// Grabage Truck
// [{Honk:25}, {Dump garbage: 30}]

// Sprinkler
// [{Splash:30}, {Hiss: 40}]

// Fireworks
// [{Big Boom:50}, {Smoke: 40}]

//////////////////////////////
// Fight Runtime
//////////////////////////////

/*
USER TURN
=========
IF Attack - > Call Attack (Player, Enemy)
ELSE IF Item -> Call Update Health Bar
IF Enemy is dead -> Call Next Story (storyProgress)
ELSE -> add "Player Turn botton"

ENEMY TURN
==========

Call Attack (Enemy, Player)
IF player is dead -> Call Reload fight or Restart Game
ELSE -> Add Attack & Item buttons, Remove "Player Turn Botton"

*/