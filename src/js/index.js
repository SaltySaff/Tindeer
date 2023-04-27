import { deer as deerData } from "./data.js";
import Deer from "./Deer.js";

const getNewDeer = () => deerData.shift();
let deer = new Deer(getNewDeer());

const rejectBtn = document.querySelector(".reject-btn");
const acceptBtn = document.querySelector(".accept-btn");
const acceptStamp = document.querySelector(".like-stamp");
const rejectStamp = document.querySelector(".nope-stamp");
const avatar = document.getElementById("avatar");

const renderStamp = (choice) => {
  acceptStamp.style.display = choice ? "block" : "none";
  rejectStamp.style.display = choice ? "none" : "block";
};

const resetStamp = () => {
  acceptStamp.style.display = "none";
  rejectStamp.style.display = "none";
};

const render = () => {
  resetStamp();
  document.getElementById("bio").innerHTML = deer.getDeerHtml();
  avatar.style.backgroundImage = `url('./${deer.avatar}')`;
};

render();

const setChoice = (choice) => {
  deer.isSwiped = true;
  if (choice) {
    deer.isLiked = true;
  } else {
    deer.isLiked = false;
  }
};

const displayNoMatchesMessage = () => {
  document.querySelector(".no-matches-msg").style.display = "block";
};

const handleNoMatches = () => {
    displayNoMatchesMessage();
    avatar.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.31), rgba(0, 0, 0, 0.31)), url(${deer.avatar})`;
    rejectBtn.disabled = true;
    acceptBtn.disabled = true;
}

const handleChoice = (choice) => {
  renderStamp(choice);
  if (deerData.length === 0) {
    handleNoMatches();
    return;
  }

  setTimeout(() => {
    setChoice(choice);
    deer = new Deer(getNewDeer());
    render();
  }, 1000);
};

rejectBtn.addEventListener("click", () => handleChoice(false));
acceptBtn.addEventListener("click", () => handleChoice(true));
