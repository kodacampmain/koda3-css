console.log("hello world");

const h1 = document.getElementById("title");
console.log(h1.innerHTML);
const list = document.getElementById("objective");
console.log(list.innerHTML);
// console.log(list.innerText);
// console.log(list.textContent);

const listItems = document.getElementsByClassName("list");
console.log(listItems);

const firstListItem = document.querySelector("#objective > li.list");
// const text = document.createTextNode("")
console.log(firstListItem instanceof Element);
console.log(firstListItem instanceof Node);
// firstListItem.innerHTML = '<a href="https://www.google.com">Google</a>';

const liItems = document.querySelectorAll(".list");
// const StaticList = Array.from(listItems);

// console.log(liItems);
// console.log(listItems);
// console.log(StaticList);

// const newLi = document.createElement("li");
// newLi.classList.add("list");
// list.append(newLi);

// console.log(liItems);
// console.log(listItems);
// console.log(StaticList);

const selector = "#objective li.list:nth-child(2)";
const secondList = document.querySelector(selector);

// setTimeout(() => {
secondList.className = "list danger";
secondList.style["font-family"] = '"My Soul", cursive';
// }, 1000);

const pwdInput = document.querySelector("form input[type=password]");

pwdInput.type = "text";

const newElement = [];
let counter = 10;
const intervalId = setInterval(
  (cb) => {
    const timer = document.querySelector(".timer");
    // if (timer.textContent === "0") {
    //   timer.textContent = "Waktu Habis";
    //   cb();
    //   return;
    // }
    // timer.textContent = parseInt(timer.textContent) - 1;

    // const lastP = timer.querySelector("p:first-of-type");
    const newP = document.createElement("p");
    if (counter === 0) {
      newP.textContent = "Waktu Habis";
      //   timer.insertAdjacentElement("afterbegin", newP);
      newElement.push(newP);
      cb(timer, newElement);
      return;
    }
    newP.textContent = counter - 1;
    // timer.insertAdjacentElement("afterbegin", newP);
    newElement.push(newP);
    counter--;
  },
  1000,
  (target, data) => {
    clearInterval(intervalId);
    target.append(...data);
    console.log("interval cleared");
  }
);

/**
 * Insert Adjacent
 * 4 posisi
 * 1. beforebegin
 * 2. afterbegin => prepend
 * 3. beforeend => append
 * 4. afterend
 */
