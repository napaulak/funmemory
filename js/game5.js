const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

const bichos =[
    'cola',
    'regua',
    'borracha',
    'globo',
    'grampo',
    'tesoura',
    'pasta',
    'estojo',
    'apontador',
    'livro',
];

const sons = {
   'globo': 'globe.mp3',
   'livro': 'book.mp3',
   'borracha': 'eraser.mp3',
   'pasta': 'folder.mp3',
   'cola': 'glue.mp3',
   'estojo': 'pencilcase.mp3',
   'regua': 'ruler.mp3',
   'tesoura': 'scissors.mp3',
   'apontador': 'sharpener.mp3',
   'grampo': 'stapler.mp3',
 };

const createElement = (tag, className) => {

    const element = document.createElement(tag)
    element.className = className
    return element
}


let firstCard = '';
let secondCard = '';

const playSound = (bicho) => {
    const audio = new Audio(`../audios/material/${sons[bicho]}`);
    audio.play();
}

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length == 2) {
        clearInterval(this.loop);
        
        const playerName = spanPlayer.innerHTML;
        const timeTaken = timer.innerHTML;

        document.getElementById('popupMessage').innerText = `${playerName} Seu tempo foi de: ${timeTaken}. Jogue mais uma vez!`;
        document.getElementById('popup').style.display = 'flex';

    }
}

const checkCards = () => {
   const firstBicho = firstCard.getAttribute('data-bicho')
   const secondBicho = secondCard.getAttribute('data-bicho')

if(firstBicho == secondBicho){

     firstCard.firstChild.classList.add('disabled-card')
     secondCard.firstChild.classList.add('disabled-card')

        firstCard = ''
        secondCard = ''

        checkEndGame();

}else{
    
    setTimeout( ()=> {

        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');

        firstCard = ''
        secondCard = ''
    }, 500)
       
}
}

const revealCard = ({target}) =>{

    if(target.parentNode.className.includes('reveal-card')){
        return;
    }
        
   if(firstCard == ''){
    target.parentNode.classList.add('reveal-card')
    firstCard = target.parentNode
    const bicho = firstCard.getAttribute('data-bicho');
    playSound(bicho);
}else if(secondCard == ''){
    target.parentNode.classList.add('reveal-card')
    secondCard = target.parentNode
    const bicho = secondCard.getAttribute('data-bicho');
    playSound(bicho);
    checkCards();
}
    
}

const createCard = (bicho) => {
    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url('../images/${bicho}.png')`;
    
    card.appendChild(front);
    card.appendChild(back);
    
    card.addEventListener('click', revealCard);
    card.setAttribute('data-bicho', bicho)
return card
}

const loadGame = () => {
    const duplicateBichos = [ ... bichos, ... bichos]

    const shuffledArray = duplicateBichos.sort( ()=> Math.random() - 0.5);

    Math.random()
    
    shuffledArray.forEach((bicho) => {
     const card = createCard(bicho);
      grid.appendChild(card);
    });
}

const startTimer = () => {

     this.loop =  setInterval(() => {

      const currentTime = +timer.innerHTML
      timer.innerHTML = currentTime + 1 
    }, 1000)
}

window.onload = () => {
    
   spanPlayer.innerHTML = localStorage.getItem('player')
   startTimer()
    loadGame();
}

document.getElementById('closePopup').onclick = function() {
    document.getElementById('popup').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === document.getElementById('popup')) {
        document.getElementById('popup').style.display = 'none';
    }
}