/* Odredjivanje broja dobrih i losih */

let u = 0;
let e = 0;
let g = 0;

const select = document.querySelector("select");
const karBut = document.querySelector(".choose-kar");
const but = document.querySelector(".start-but");

//Racunica
select.addEventListener("input", () => {
  selected = select.options[select.selectedIndex];
  u = selected.text;
  g = Math.ceil(selected.value * 0.6);
  e = u - g;

  console.log(`UKUPNO: ${u}, GOOD: ${g}, EVIL: ${e}`);

  karBut.disabled = false;
  but.disabled = false;
});

const charBut = document.querySelector(".choose-kar");
const charClose = document.querySelector(".close");
const menuSelect = document.querySelector(".black");

/* Selekcija koriscenih karaktera i njihovo prosledjivanje u char select */

let closedCharSelect = true;

// Default karakteri
let usedCharacters = [];
//Pretvaranje checkboxova u objekte
const toObject = (string) => {
  let name = string.split(" ")[0];
  let type = string.split(" ")[1];

  obj = { char: name, tip: type };

  return obj;
};

//Kupljenje cehckiranih checkboxova i formiranje niza
const checkboxHandle = () => {
  let nizCheck = document.querySelectorAll("input");
  usedCharacters = [];

  for (const element of nizCheck) {
    if (element.checked) {
      usedCharacters = [...usedCharacters, toObject(element.alt)];
    }
  }

  console.log(usedCharacters);
};

checkboxHandle();
//Zatvori otvori pop up char select
charBut.addEventListener("click", () => {
  menuSelect.style.display = "flex";
  closedCharSelect = false;
});

charClose.addEventListener("click", () => {
  menuSelect.style.display = "none";
  closedCharSelect = true;

  checkboxHandle();
});

//Cuvanje globalnih podataka u session storage
but.addEventListener("click", () => {
  sessionStorage.setItem("ukupniBroj", u);
  sessionStorage.setItem("goodBroj", g);
  sessionStorage.setItem("evilBroj", e);
  sessionStorage.setItem("usedCharacters", JSON.stringify(usedCharacters));

  location.href = "chars.html";
});
