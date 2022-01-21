// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions
// var f = document.getElementById('cooper-above');
// document.addEventListener('click', function(ev){
//     f.style.transform = 'translateY('+(ev.clientY-25)+'px)';
//     f.style.transform += 'translateX('+(ev.clientX-25)+'px)';
// },false);

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