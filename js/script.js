// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions
// var f = document.getElementById('cooper-above');
// document.addEventListener('click', function(ev){
//     f.style.transform = 'translateY('+(ev.clientY-25)+'px)';
//     f.style.transform += 'translateX('+(ev.clientX-25)+'px)';
// },false);

const btnAreaEl = document.querySelector('.button-area')
const mapModal = document.querySelector('#game-map-modal')
const newGameBtnEl = document.querySelector('.new-game-button')

newGameBtnEl.addEventListener('click', (evt) => {
    btnAreaEl.removeChild(newGameBtnEl)
    mapModal.classList.add('show')
})