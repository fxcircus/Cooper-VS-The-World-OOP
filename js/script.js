//////////////////////////////
// Global Variables 
//////////////////////////////
let storyProgress = 0;
const cooperAttacks = [{name:"LICK", points:7}, {name:"Fish Breath", points:20}]
const truckAttacks = [{name:"Honk", points:25}, {name:"Dump garbage", points:30}]
const sprinklerAttacks = [{name:"Splash", points:30}, {name:"Hiss", points:40}]
const fireworksAttacks = [{name:"Big Boom", points:50}, {name:"Smoke", points:40}]


//////////////////////////////
// DOM
//////////////////////////////
const newGameModalEl = document.querySelector('#new-game-modal')
const mapModal = document.querySelector('#game-map-modal')
const fightModalEl = document.querySelector('#fight-modal')
const newGameBtnEl = document.querySelector('.new-game-button')
const battleButtonEl = document.querySelector('#attack-button')
const textAreaEl = document.querySelector('#text-area')

const cooperFighterImg = document.querySelector('#cooper-back-image')
const trcukFighterImg = document.querySelector('#garbage-truck')
const sprinklerFighterImg = document.createElement('img')
const fireworksFighterImg = document.createElement('img')

const cooperAtkOneEl = document.querySelector('#cooper-attack-one')
const cooperAtkTwoEl = document.querySelector('#cooper-attack-two')
const cooperItemsEl = document.querySelector('#cooper-items')

newGameBtnEl.addEventListener('click', (evt) => {
    newGameModalEl.removeChild(newGameBtnEl)
    mapModal.classList.add('show')
})

battleButtonEl.addEventListener('click', (evt) => {
    mapModal.classList.remove('show')
    fightModalEl.classList.add('show')
})

cooperAtkOneEl.addEventListener('click', (evt) => {
    attack (cooper, currentEnemy, cooperAttacks[0])
})

cooperAtkTwoEl.addEventListener('click', (evt) => {
    attack (cooper, currentEnemy, cooperAttacks[1])
})

//////////////////////////////
// Functions
//////////////////////////////

// Timeout Message
const printMessage = (message) => {
    setTimeout(() => {
        textAreaEl.textContent = message
    }, 0);
}

// Attack
const attack = (source, target, attack) => {
    if (Math.random() < source.accuracy) {
        target.hp -= attack.points
        printMessage(`${source.name} DOES ${attack.points} POINTS!`)
    } else {
        printMessage(`${source.name} MISSED!`)
    }
}


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
class Fighter {
    constructor (name, hp, accuracy, domImg, attacks, isEnemy = false) {
        this.name = name
        this.hp = hp
        this.accuracy = accuracy
        this.domPicture = domImg
        this.isEnemy = isEnemy
    }
    kill = () => {
        this.domPicture.syle.animation = 'fade-out'
    }
}

// Instantiate classes:
const cooper = new Fighter ('COOPER', 100, 0.8, cooperFighterImg, cooperAttacks)
const grabageTruck = new Fighter ('GARBAGE TRUCK', 40, 0.9, trcukFighterImg, truckAttacks, true)
const sprinkler = new Fighter ('SPRINKLER', 80, 0.7, sprinklerFighterImg, sprinklerAttacks, true)
const fireworks = new Fighter ('FIREWORKS', 120, 0.6, fireworksFighterImg, fireworksAttacks, true)
let currentEnemy = grabageTruck
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