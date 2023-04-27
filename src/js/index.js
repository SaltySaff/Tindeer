import { deer as deerData } from "./data.js";
import Deer from "./Deer.js";

// Get new deer from the data
const getNewDeer = () => deerData.shift();
let deer = new Deer(getNewDeer());

// DOM elements
const rejectBtn = document.querySelector(".reject-btn");
const acceptBtn = document.querySelector(".accept-btn");
const acceptStamp = document.querySelector(".like-stamp");
const rejectStamp = document.querySelector(".nope-stamp");
const avatar = document.getElementById("avatar");

// Show the appropriate stamp based on the choice
const renderStamp = (choice) => {
  acceptStamp.style.display = choice ? "block" : "none";
  rejectStamp.style.display = choice ? "none" : "block";
};

// Reset the visibility of stamps
const resetStamp = () => {
  acceptStamp.style.display = "none";
  rejectStamp.style.display = "none";
};

// Render the deer profile and reset stamps
const render = () => {
  resetStamp();
  document.getElementById("bio").innerHTML = deer.getDeerHtml();
  avatar.style.backgroundImage = `url('./${deer.avatar}')`;
};

render();

// Set the choice (like or dislike) for the current deer
const setChoice = (choice) => {
  deer.isSwiped = true;
  deer.isLiked = choice;
};

// Display the "no matches" message
const displayNoMatchesMessage = () => {
  document.querySelector(".no-matches-msg").style.display = "block";
};

// Handle the situation when there are no more matches
const handleNoMatches = () => {
  displayNoMatchesMessage();
  avatar.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.31), rgba(0, 0, 0, 0.31)), url(${deer.avatar})`;
  rejectBtn.disabled = true;
  acceptBtn.disabled = true;
};

// Handle the user's choice (like or dislike)
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
