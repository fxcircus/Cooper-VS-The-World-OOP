//////////////////////////////
// Global Variables 
//////////////////////////////
let storyProgress = 0;
const cooperAttacks = [{name:"LICK", points:40}, {name:"FISH BREATH", points:60}]
const truckAttacks = [{name:"HONK", points:25}, {name:"DUMP GARBAGE", points:30}]
const sprinklerAttacks = [{name:"SPLASH", points:30}, {name:"HISS", points:40}]
const fireworksAttacks = [{name:"BIG BOOM", points:50}, {name:"SMOKE", points:40}]
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

const reloadBattleButtonEl = document.createElement('button')
const reloadGameButtonEl = document.createElement('button')

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
        if (currentEnemy.hp <= 0){
            printMessage (timeOutLong, `${currentEnemy.name} FAINTED!`)
            currentEnemy.kill()
        } else {
            setTimeout(() => {
                enemyButtonsEls.style.display ='grid'
            }, timeOutLong)
        }
        
    } else {
        enemyButtonsEls.style.display ='none'
        if (player.hp <= 0) {
            cooper.kill()
            printMessage(timeOutLong, `COOPER FAINTED!`)
        } else {
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
    // grabageTruck.domImg.style.width='100%'
    printMessage(0, `${source.name} USES ${attack.name}:\n`)
    if (Math.random() < source.accuracy) {
        const points = Math.round((Math.random() + 0.1) * attack.points)
        target.hp -= points
        setTimeout(() => {
            if (target.hp <= 0) {target.hp = 0}
            target.hpBarEl.style.width = `${target.hp}%`
        }, timeOutShort);
        printMessage(timeOutShort, `IT DOES ${points} POINTS OF DAMAGE!`)
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
        console.log (`killing ${this.domImg}`)
        setTimeout(() => {
            this.domImg.classList.add('kill')
        }, timeOutLong);
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