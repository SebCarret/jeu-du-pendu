// cibler la valeur de l'input du joueur 1
var word = document.getElementById('input1');
// cibler la valeur de l'input du joueur 2
var letterToGuess = document.getElementById('input2');
// cibler la div parente du joueur 1
var playerOne = document.getElementById('player1');
// initialiser un compteur de 10 points
var initialCount = 10;
var counter = document.getElementById('count');
counter.textContent = initialCount;
// initialiser une variable qui contiendra la valeur du mot à deviner
var newWord;
// cibler l'élément qui affichera le message de victoire/défaite à la fin du jeu
var finalMessage = document.getElementById('message');

// 1ère étape : capter le signal du clic du joueur 1 sur son bouton valider afin de capter la valeur du mot à deviner
document.getElementById('btn-1').addEventListener('click',function() {

  // transformer le mot à deviner en un tableau de lettres grâce à la méthode split
  newWord = word.value.split('');

  // faire une boucle sur ce tableau pour créer un nouvel élément comportant chacune des lettres à deviner masquées par un _
  for (e of newWord) {

    var divParent = document.getElementById('word');
    var newLetter = document.createElement('span');
    newLetter.className = 'word-span';
    var letterValue = document.createTextNode('_');
    newLetter.appendChild(letterValue);
    divParent.appendChild(newLetter)
  }

  // réinitialiser la valeur de l'input après clic sur le bouton valider
  word.value = "";
  // bonus : changer le titre h1 pour signaler au joueur 2 que c'est à son tour :)
  var h1 = document.getElementsByTagName('h1');
  h1[0].textContent = 'Joueur 2 : c\'est à toi de trouver le mot !';
  // dernière instruction : masquer le champ du joueur 1
  playerOne.style.display = 'none'

});

// 2ème étape : capter le signal du clic du joueur 2 sur son bouton valider afin de capter la valeur de la lettre
document.getElementById('btn-2').addEventListener('click', function() {

  // cibler le mot à deviner caché par des _
  var wordToGuess = document.getElementsByClassName('word-span');
  var wordToGuessArray = [];

  // boucle autour des lettres du mot à deviner
  for (var i = 0; i < newWord.length; i++) {
    // condition pour voir si la lettre tapée par le joueur 2 correspond à une des lettre du mot à deviner
    if (letterToGuess.value === newWord[i] || letterToGuess.value === newWord[i].toUpperCase()) {
      // boucle autour des lettres du mot caché par des _
      for (var j = 0; j < wordToGuess.length; j++) {
        if (i === j) {
          // si la lettre tapée figure dans le mot, remplacer le _ par la valeur de la lettre
          wordToGuess[j].textContent = newWord[i]
        }
      }
    }
  };

  // si la lettre tapée ne correspond à aucune lettre du mot à deviner, on enlève un point au compteur
  if (newWord.includes(letterToGuess.value) === false) {
    initialCount -= 1;
    counter.textContent = initialCount
  };

  // réinitialisation de la valeur de l'input du joueur 2
  letterToGuess.value = '';

  // boucle pour insérer dans un tableau la valeur des lettres trouvées et non-trouvées
  for (var i = 0; i < wordToGuess.length; i++) {
    wordToGuessArray.push(wordToGuess[i].textContent);
  }

  // affichage du mot VICTORY si le joueur 2 trouve toutes les lettres du mot avant que le compteur ne soit égal à 0 
  if (wordToGuessArray.join('') === newWord.join('')) {
    finalMessage.textContent = 'VICTORY !'
  }

  // affichage de YOU LOSE... si le joueur 2 ne trouve pas toutes les lettres du mot avant que le compteur ne soit égal à 0 
  if (initialCount === 0) {
    finalMessage.textContent = 'YOU LOSE...'
  }

});
