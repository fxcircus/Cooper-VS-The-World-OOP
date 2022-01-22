//////////////////////////////
// Global Variables 
//////////////////////////////
let storyProgress = 0;
const cooperAttacks = [{name:"LICK", points:7}, {name:"Fish Breath", points:20}]
const truckAttacks = [{name:"Honk", points:25}, {name:"Dump garbage", points:30}]
const sprinklerAttacks = [{name:"Splash", points:30}, {name:"Hiss", points:40}]
const fireworksAttacks = [{name:"Big Boom", points:50}, {name:"Smoke", points:40}]
const timeOutShort = 1500
const timeOutLong = 3000

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

const enemyHpEl = document.querySelector('#enemy-hp')
const cooperHpEl = document.querySelector('#cooper-hp')

const cooperButtonsEls = document.querySelector('#cooper-buttons')
const enemyButtonsEls = document.querySelector('#enemy-turn-btn')

newGameBtnEl.addEventListener('click', (evt) => {
    newGameModalEl.removeChild(newGameBtnEl)
    mapModal.classList.add('show')
})

battleButtonEl.addEventListener('click', (evt) => {
    mapModal.classList.remove('show')
    fightModalEl.classList.add('show')
})

cooperAtkOneEl.addEventListener('click', (evt) => {
    attack (cooper, currentEnemy, cooperAttacks[0], true)
})

cooperAtkTwoEl.addEventListener('click', (evt) => {
    attack (cooper, currentEnemy, cooperAttacks[1], true)
})

enemyButtonsEls.addEventListener('click', (evt) => {
    console.log(currentEnemy)
    attack (currentEnemy, cooper, currentEnemy.attacks[Math.round(Math.random())])
})

//////////////////////////////
// Functions
//////////////////////////////

// Switch buttons during battle

const switchFightButtons = (player) => {
    if (player) {
        cooperAtkOneEl.style.display ='none'
        cooperAtkTwoEl.style.display ='none'
        cooperItemsEl.style.display ='none'
        setTimeout(() => {
            enemyButtonsEls.style.display ='grid'
        }, timeOutLong)
    } else {
        enemyButtonsEls.style.display ='none'
        setTimeout(() => {
            cooperAtkOneEl.style.display ='grid'
        }, timeOutLong)
        setTimeout(() => {
            cooperAtkTwoEl.style.display ='grid'
        }, timeOutLong)
        setTimeout(() => {
            cooperItemsEl.style.display ='grid'
        }, timeOutLong)
    }
}

// Timeout Message
const printMessage = (time, message) => {
    textAreaEl.textContent =''
    const newText = document.createTextNode(message)
    setTimeout(() => {
        textAreaEl.appendChild(newText)
    }, time)    
}

// Attack
const attack = (source, target, attack, isCooper) => {
    console.log(source)
    printMessage(0, `${source.name} USES ${attack.name}:\n`)
    if (Math.random() < source.accuracy) {
        target.hp -= attack.points
        setTimeout(() => {
            target.hpBarEl.style.width = `${target.hp}%`
        }, timeOutShort);
        printMessage(timeOutShort, `IT DOES ${attack.points} POINTS OF DAMAGE!`)
    } else {
        printMessage(timeOutShort, `MISSED!`)
    }
    
    if (isCooper) {
        switchFightButtons(true)
    } else {
        switchFightButtons(false)
    }
}

// Instantiante New Enemy
const newEnemy = (currentEnemy) => {
    enemyHpEl.style.width = '100%'
    currentEnemy.hpBarEl = enemyHpEl
}

// Item

// Update Health Bar

// Retreat

// Reload Fight Or Restart Game

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
        this.domImg = domImg
        this.attacks = attacks
        this.isEnemy = isEnemy
    }
    kill = () => {
        this.domPicture.syle.animation = 'fade-out'
    }
}

// Instantiate classes:
const cooper = new Fighter ('COOPER', 100, 0.8, cooperFighterImg, cooperAttacks)
cooper.hpBarEl = cooperHpEl
const grabageTruck = new Fighter ('GARBAGE TRUCK', 100, 0.9, trcukFighterImg, truckAttacks, true)
const sprinkler = new Fighter ('SPRINKLER', 80, 0.7, sprinklerFighterImg, sprinklerAttacks, true)
const fireworks = new Fighter ('FIREWORKS', 120, 0.6, fireworksFighterImg, fireworksAttacks, true)
let currentEnemy = grabageTruck
newEnemy (currentEnemy)
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