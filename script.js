let xp = 0;
let health = 100;
let gold = 50;

let fighting;
let monsterHealth;
let inventory = ["stick"];

let currentWeapon = 0;

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

//Here "weapons" is an array consisting of objects in it;
const weapons = [
  {
    name: "stick",
    power: 5
  },
  {
    name: "dagger",
    power: 30
  },
  {
    name: "claw hammer",
    power: 50
  },
  {
    name: "sword",
    power: 100
  }
];

// (can fill later)
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
];

//similarly, locations is also an array of objects, where, objects have strings of name and texts and stuff like that;
const locations = [
  {
    name: "town square",
    "button functions": [goStore, goCave, fightDragon],
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    text: "You are in the town square. You see a sign that says store"
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square"
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store"
  },
  {
    name: "cave",
    "button text": ["fight slime", "fight fanged beast", "go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "you enter the store."
  },
  {
    name: "fight",
    "button text": ["Attack", "dodge", "goTown"],
    "button functions": [attack, dodge, run],
    text: "you are fighting a monster"
  },
  {
    name: "kill monster",
    "button text": [
      "go to town square",
      "go to town square",
      "Go to town square"
    ],
    "button functions": [goTown, goTown, goTown],
    text: "The monster screams, 'Arg!' as it dies. You gain experience gold"
  },
  {
    name: "lose",
    "button text": ["Replay??", "Replay", "Replay"],
    "button functions": [restart, restart, restart],
    text: "You die"
  },
  {
    name: "win",
    "button text": ["Replay??", "Replay", "Replay"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon and win the game"
  }
];

//functions of buttons initially;

button1.onclick = goStore; //name of functions
button2.onclick = goCave;
button3.onclick = fightDragon;

//what actually this function is doing?? it takes a parameter of location. then it referes to the part of the object of the locations array above defined. then, it refers to the part of the array and then index of that part of the array;
function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];

  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];

  text.innerText = location.text;
}

// navigation
function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  console.log("Going to cave.");
}

function fightDragon() {
  console.log("Fighting dragon.");
}

// store actions
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;

    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold";
  }
}

//function to buy a weapon according to the availability and pushing back to the inventory;

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;

      let newWeapon = weapons[currentWeapon].name;

      goldText.innerText = gold;

      inventory.push(newWeapon);
      text.innerText =
        "You now have a " + newWeapon + ". Inventory: " + inventory.join(", ");
    } else {
      text.innerText = "You do not have enough gold to buy a weapon";
    }
  } else {
    text.innerText = "You already have the most powerful weapon";
  }
}

//A function to sell the weapon depending on the situation;

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;

    let soldWeapon = inventory.shift();
    text.innerText = "You sold a " + soldWeapon;
  } else {
    text.innerText = "Don't sell your only weapon";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;

  //time to change the display of the monsterStats from none to block (css file);
  monsterStats.style.display = "block";

  //displying the name of the mosnters fighting;

  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "the " + monsters[fighting].name + " attacks";
  text.innerText += "You attack with your " + weapons[currentWeapon].name + ".";
  health -= monsters[fighting].level;
  monsterHealth -=
    weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;

  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;

  if (health <= 0) lose();
  else if (monsterHealth <= 0) {
    if (fighting === 2) winGame();
    else defeatMonster();
  }
}

function dodge() {
  text.innerText =
    "You dodge the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level + 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;

  update(locations[4]);
}

function run() {}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}
