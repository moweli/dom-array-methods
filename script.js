const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMilBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const wealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// function to fetch data

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Double money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Sort by the richest
function sortByRichest() {
  data = data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// Fliter only millionaires
function showMil() {
  data = data.filter((item) => item.money >= 1000000);
  updateDOM();
}

// Format number as money
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// total wealth
function totalWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>$${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// update DOM
function updateDOM(providedData = data) {
  // clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((person) => {
    const el = document.createElement("div");
    el.classList.add("person");
    el.innerHTML = `<strong>${person.name}</strong> $${formatMoney(
      person.money
    )}`;
    main.appendChild(el);
  });
}

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMilBtn.addEventListener("click", showMil);
wealthBtn.addEventListener("click", totalWealth);
