import { deer as deerData } from "./data.js";
import Deer from "./Deer.js";

const getNewDeer = () => deerData.shift();

const deer = new Deer(getNewDeer())

const render = () => {
  document.getElementById("bio").innerHTML = deer.getDeerHtml();
};

render()


