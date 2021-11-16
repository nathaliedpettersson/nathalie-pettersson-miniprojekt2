const btn = document.getElementById('start-game');
const options = document.querySelectorAll('.options');
let choices = document.getElementById('choices');
let pScore = 0;
let cScore = 0;

// Gör så att namnet vi skriver in visas i h2-elementet under text-inputfältet
btn.addEventListener('click', function () {
  const input = document.querySelector('input');
  const h2 = document.getElementById('your-choice');

  h2.innerText = input.value + ' spelar just nu.';
  input.value = '';
  choices.textContent = 'Du börjar!';
});

// Lägger till click-funktion på alla val och gör så att datorn slumpmässigt genererar ett av de tre
options.forEach((option) => {
  option.addEventListener("click", function () {
    const pInput = this.value;
    const cOptions = ["Sten", "Påse", "Sax"];
    const cInput = cOptions[Math.floor(Math.random() * 3)];

    compareInputs(pInput, cInput);
    updateScore();
    if (checkWinner()) {
      pScore = cScore = 0;
      updateScore();
    }
  });
});

// Om vi och datorn har valt samma så får ingen poäng
function compareInputs(pInput, cInput) {
  const currentMatch = `${pInput} mot ${cInput}`;
  if (pInput === cInput) {
    choices.textContent = `${currentMatch} är lika. Kör igen!`;
    return;
  }

  // Vi listar olika scenarior beroende på val som vi gör/som datorn genererar och bestämmer vem som vinner/förlorar beroende på val av symbol.
  if (pInput === "Sten") {
    if (cInput === "Sax") {
      choices.textContent = `${currentMatch} = Du vann den här rundan! ⭐`;
      pScore++;
    } else {
      choices.textContent = `${currentMatch} = Datorn vann den här rundan!`;
      cScore++;
    }
  }

  else if (pInput === "Påse") {
    if (cInput === "Sten") {
      choices.textContent = `${currentMatch} = Du vann den här rundan! ⭐`;
      pScore++;
    } else {
      choices.textContent = `${currentMatch} = Datorn vann den här rundan!`;
      cScore++;
    }
  }
  
  else {
    if (cInput === "Påse") {
      choices.textContent = `${currentMatch} = Du vann den här rundan! ⭐`;
      pScore++;
    } else {
      choices.textContent = `${currentMatch} = Datorn vann den här rundan!`;
      cScore++;
    }
  }
}

// Uppdaterar våra poäng i DOM:en
function updateScore() {
  document.getElementById("p-score").textContent = pScore;
  document.getElementById("c-score").textContent = cScore;
}

// Vi berättar att vi vill köra tills att en av spelarna har nått 3 poäng, då vill vi att spelet avslutas och kan startas om för ny runda
function checkWinner() {
  if (pScore === 3 || cScore === 3) {
    const winner =
      pScore === 3
        ? "Grattis! Du har vunnit! ⭐ Tryck OK och bekräfta ditt namn igen för att köra en gång till!"
        : "Du får se dig besegrad av datorn! Tryck OK och bekräfta ditt namn igen för att ta revansch!";
    alert(winner);
  restartGame()
    return true;
  }
  return false;
}

// Resettar spelets poäng
function restartGame(){
  pScore = 0;
  cScore = 0;
}
