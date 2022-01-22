//////////////////////////////
// DOM
//////////////////////////////
const cooperWalkingEl = document.querySelector('.cooper-walking')
const enemyPhotoEl = document.querySelector('#enemy-photo')
const newGameBtnEl = document.querySelector('.new-game-button')
const newGameModalEl = document.querySelector('#new-game-modal')
const mapModal = document.querySelector('#game-map-modal')
const fightModalEl = document.querySelector('#fight-modal')
const battleButtonEl = document.querySelector('#attack-button')
const textAreaEl = document.querySelector('#text-area')
const cooperFighterImg = document.querySelector('#cooper-back-image')
const trcukFighterImg = document.querySelector('#garbage-truck')
const cooperAtkOneEl = document.querySelector('#cooper-attack-one')
const cooperAtkTwoEl = document.querySelector('#cooper-attack-two')
const cooperItemsEl = document.querySelector('#cooper-items')
const enemyHpEl = document.querySelector('#enemy-hp')
const cooperHpEl = document.querySelector('#cooper-hp')
const cooperButtonsEls = document.querySelector('#cooper-buttons')
const enemyButtonsEls = document.querySelector('#enemy-turn-btn')
const enemyAppearsWarningEl = document.querySelector('#enemy-appears-warning')
const enemyTitleEl = document.querySelector('#enemy-title')

const reloadBattleButtonEl = document.createElement('button')
const reloadGameButtonEl = document.createElement('button')
const sprinklerFighterImg = document.createElement('img')
sprinklerFighterImg.setAttribute('src', 'images/sprinkler-cropped.png')
const fireworksFighterImg = document.createElement('img')
fireworksFighterImg.setAttribute('src', 'images/fireworks.gif')

newGameBtnEl.addEventListener('click', (evt) => {
    newGameModalEl.removeChild(newGameBtnEl)
    nextStory()
})

battleButtonEl.addEventListener('click', (evt) => {
    mapModal.classList.remove('show')
    fightModalEl.classList.add('show')
    printMessage(timeOutShort,`A WILD ${currentEnemy.name} APPEARED!`)
})

cooperAtkOneEl.addEventListener('click', (evt) => {
    attack (cooper, currentEnemy, cooperAttacks[0], true)
})

cooperAtkTwoEl.addEventListener('click', (evt) => {
    attack (cooper, currentEnemy, cooperAttacks[1], true)
})

enemyButtonsEls.addEventListener('click', (evt) => {
    // console.log(currentEnemy)
    attack (currentEnemy, cooper, currentEnemy.attacks[Math.round(Math.random())], false)
})

//////////////////////////////
// Global Variables 
//////////////////////////////
const cooperAttacks = [{name:"LICK", points:30}, {name:"FISH BREATH", points:60}]
const truckAttacks = [{name:"HONK", points:25}, {name:"DUMP GARBAGE", points:30}]
const sprinklerAttacks = [{name:"SPLASH", points:30}, {name:"HISS", points:40}]
const fireworksAttacks = [{name:"BIG BOOM", points:50}, {name:"SMOKE", points:40}]
const timeOutShort = 1500
const timeOutLong = 3000
const timeOutLast = 5000
const storiesArr =['part-1', 'part-2', 'part-3']
//////////////////////////////
// Functions
//////////////////////////////

// Next Story, Or End Credits:
const nextStory = () => {
    const currentStoryAnimation = storiesArr[0]
    console.log(`current animation is ${currentStoryAnimation}`)
    if (storiesArr.length === 3) {
        cooperWalkingEl.classList.add(currentStoryAnimation)
        mapModal.classList.add('show')
        console.log('im here 1')
        storiesArr.shift()
        // console.log(enemyAppearsWarningEl)
    } else {
        cooperWalkingEl.classList.remove(currentStoryAnimation)
        if (storiesArr.length === 2) {
            console.log('im here 2')
            enemyAppearsWarningEl.textContent='SPRINKLER!'
            cooperWalkingEl.classList.add(currentStoryAnimation)
            cooperWalkingEl.style.gridColumn = 1
            storiesArr.shift()
        } else if (storiesArr.length === 1) {
            console.log('im here 3')
            enemyAppearsWarningEl.textContent='FIREWORKS!'
            cooperWalkingEl.classList.add(currentStoryAnimation)
            cooperWalkingEl.style.gridRow = 1
            storiesArr.shift()
        }
        mapModal.classList.add('show')
    }
    console.log (storiesArr)
}

// Reload Fight, Restart Game:
const endFight = (result) => {
    if (result === 'won') {
        setTimeout(() => {
            fightModalEl.classList.remove('show')
            nextStory()
        }, timeOutLast);
    } else if (result === 'lost') {

    }
}

// Switch Buttons During Battle:
const switchFightButtons = (player) => {
    if (player) {
        cooperAtkOneEl.style.display ='none'
        cooperAtkTwoEl.style.display ='none'
        cooperItemsEl.style.display ='none'
        if (currentEnemy.hp <= 0){
            printMessage (timeOutLong, `${currentEnemy.name} FAINTED!`)
            currentEnemy.kill()
            endFight('won')
        } else {
            setTimeout(() => {
                enemyButtonsEls.style.display ='grid'
            }, timeOutLong)
        }
        
    } else {
        enemyButtonsEls.style.display ='none'
        if (cooper.hp <= 0) {
            cooper.kill()
            printMessage(timeOutLong, `COOPER FAINTED!`)
            endFight('lost')
        } else {
            setTimeout(() => {
                cooperAtkOneEl.style.display ='grid'
                cooperAtkTwoEl.style.display ='grid'
                cooperItemsEl.style.display ='grid'
            }, timeOutLong)
        } 
    }
}

// Print Timed-Out Message To Screen:
const printMessage = (time, message) => {
    textAreaEl.textContent =''
    const newText = document.createTextNode(message)
    setTimeout(() => {
        textAreaEl.appendChild(newText)
    }, time)    
}

// New Attack:
const attack = (source, target, attack, isCooper) => {
    // console.log(source)
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

// Instantiante New Enemy and fight modal:
const newEnemy = (currentEnemy) => {
    
    // console.log(`new enemy - ${enemiesArr[0].name}`)
    currentEnemy.hpBarEl = enemyHpEl
    setTimeout(() => {
        enemyHpEl.style.width = '100%' 
        enemyTitleEl.textContent=currentEnemy.name
        cooperAtkOneEl.style.display ='grid'
        cooperAtkTwoEl.style.display ='grid'
        cooperItemsEl.style.display ='grid'
        enemyPhotoEl.appendChild(currentEnemy.domImg)

        cooper.hp = 100
        cooper.hpBarEl.style.width = `100%`
    }, timeOutLast);
}

// Item:


// Next Story (storyProgress):


// Exit Credits Window:


//////////////////////////////
// Classes
//////////////////////////////
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
        // console.log (`killing ${this.domImg}`)
        setTimeout(() => {
            this.domImg.classList.add('kill')
            setTimeout(() => {
                enemyPhotoEl.removeChild(this.domImg)
            }, timeOutShort);

        }, timeOutLong);
        enemiesArr.shift()
        currentEnemy = enemiesArr[0]
        newEnemy (currentEnemy)
    }
}

// Instantiate Classes:
const cooper = new Fighter ('COOPER', 100, 0.8, cooperFighterImg, cooperAttacks)
cooper.hpBarEl = cooperHpEl
const grabageTruck = new Fighter ('GARBAGE TRUCK', 100, 0.9, trcukFighterImg, truckAttacks, true)
const sprinkler = new Fighter ('SPRINKLER', 80, 0.7, sprinklerFighterImg, sprinklerAttacks, true)
const fireworks = new Fighter ('FIREWORKS', 120, 0.6, fireworksFighterImg, fireworksAttacks, true)
// let currentEnemy = grabageTruck
const enemiesArr = [grabageTruck, sprinkler, fireworks]
let currentEnemy = enemiesArr[0]
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

//////////////////////////////
// Manual modal tests
//////////////////////////////
cooperAttacks[0].points=100000
// fightModalEl.classList.add('show')
newGameModalEl.style.display = 'flex'

// part-1 animation-duration: 8.8s;

