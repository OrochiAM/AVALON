let specCharacters = JSON.parse(sessionStorage.getItem("usedCharacters"));
let characters = [];
let specGood = 0;

console.log(specCharacters);

let ukupno = sessionStorage.getItem("ukupniBroj");
let ukupnoGood = sessionStorage.getItem("goodBroj");
let ukupnoEvil = sessionStorage.getItem("evilBroj");

characters = [...characters, ...specCharacters];

for (const element of specCharacters) {
  if (element.tip == "good") {
    specGood++;
  }
}

let specEvil = specCharacters.length - specGood;

for (let i = 0; i < ukupnoGood - specGood; i++) {
  characters = [...characters, { char: `Good #${i}`, tip: "good" }];
}

for (let i = 0; i < ukupnoEvil - specEvil; i++) {
  characters = [...characters, { char: `Evil #${i}`, tip: "evil" }];
}

console.log(characters);

let charNum = characters.length;

const getRandomInt = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);

  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};

const svgCont = document.querySelector(".svg");
const selectH = document.querySelector(".selecth2");
const imgCont = document.querySelector(".img-div");

const vizuleneMagije = (char, tip) => {
  if (tip == "good") {
    selectH.innerHTML = `${char.toUpperCase()}`;
    svgCont.innerHTML =
      '<svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0834 1.60631C14.7872 -0.29585 17.4776 -0.295853 18.1815 1.6063L21.2091 9.78835C21.4304 10.3864 21.9019 10.8579 22.4999 11.0792L30.682 14.1068C32.5841 14.8107 32.5841 17.501 30.682 18.2049L22.4999 21.2325C21.9019 21.4538 21.4304 21.9253 21.2091 22.5234L18.1815 30.7054C17.4776 32.6076 14.7872 32.6076 14.0834 30.7054L11.0557 22.5234C10.8345 21.9253 10.3629 21.4538 9.76491 21.2325L1.58287 18.2049C-0.319288 17.501 -0.31929 14.8107 1.58287 14.1068L9.76491 11.0792C10.3629 10.8579 10.8345 10.3864 11.0557 9.78835L14.0834 1.60631Z" fill="#6DFFAF"/></svg>';
    imgCont.style.backgroundImage = "url(images/merlin.png)";
  } else {
    selectH.innerHTML = `${char.toUpperCase()}`;
    svgCont.innerHTML =
      '<svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.9656 2.04172C15.7181 -0.274323 18.9947 -0.274325 19.7472 2.04172L21.981 8.91652C22.3176 9.95229 23.2828 10.6536 24.3718 10.6536H31.6004C34.0357 10.6536 35.0482 13.7698 33.078 15.2012L27.23 19.45C26.3489 20.0902 25.9802 21.2248 26.3168 22.2606L28.5505 29.1354C29.3031 31.4515 26.6522 33.3774 24.6821 31.946L18.834 27.6971C17.953 27.057 16.7599 27.057 15.8788 27.6971L10.0308 31.946C8.06062 33.3774 5.4098 31.4515 6.16233 29.1354L8.39608 22.2606C8.73263 21.2249 8.36395 20.0902 7.48287 19.45L1.63482 15.2012C-0.335327 13.7698 0.677193 10.6536 3.11243 10.6536H10.341C11.4301 10.6536 12.3953 9.95229 12.7318 8.91652L14.9656 2.04172Z" fill="#FF6767"/></svg>';
    imgCont.style.backgroundImage = "url(images/evil.png)";
  }
};

//F-ja za selekciju karaktera iz niza

const charSelect = () => {
  if (charNum > 0) {
    let char = getRandomInt(0, charNum);
    let charName = characters[char].char;
    let charTip = characters[char].tip;

    console.warn(charName);
    console.log(charTip);

    vizuleneMagije(charName, charTip);

    characters.splice(char, 1);
    charNum--;
  }
};

let odabir = true;

const chooseBut = document.querySelector(".choose-but");
const nextBut = document.querySelector(".next-but");
console.log(chooseBut);

chooseBut.addEventListener("click", () => {
  if (odabir) {
    charSelect();
    odabir = false;

    chooseBut.disabled = true;
    nextBut.disabled = false;
  }
});

nextBut.addEventListener("click", () => {
  if (!odabir) {
    odabir = true;
    chooseBut.disabled = false;
    nextBut.disabled = true;
    svgCont.innerHTML = "";
    imgCont.style.backgroundImage = "none";
    selectH.innerHTML = "ODABERI";
    ukupno--;
  }
  if (!ukupno) {
    location.href = "voting.html";
  }
});
