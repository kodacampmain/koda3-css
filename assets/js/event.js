function toggleLight(color) {
  console.log(color);
  const trafficLight = document.querySelector(`.traffic-light .${color}`);
  trafficLight.classList.toggle("active");
}

const control = document.querySelector(".control");
const redBtn = control.querySelector("button:nth-of-type(1)");
const yellowBtn = control.querySelector("button:nth-of-type(2)");
const greenBtn = control.querySelector("button:nth-of-type(3)");

redBtn.addEventListener("click", (event) => {
  //   event.stopPropagation();
  event.stopImmediatePropagation();
  toggleLight("red");
});
redBtn.addEventListener("click", (event) => {
  toggleLight("red");
});
yellowBtn.addEventListener("click", (event) => toggleLight("yellow"));
greenBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleLight("green");
});
// capture phase
control.addEventListener(
  "click",
  (event) => {
    // event.stopPropagation();
    console.log("capture");
  },
  { capture: true }
);
// bubble phase(default behaviour)
control.addEventListener("click", () => {
  console.log("bubble");
});

const lightContainer = document.querySelector(".traffic-light .container");
const redL = lightContainer.querySelector(".red");
const yellowL = lightContainer.querySelector(".yellow");
const greenL = lightContainer.querySelector(".green");

redL.addEventListener("click", (event) => toggleLight("red"));
yellowL.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleLight("yellow");
});
greenL.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleLight("green");
});
