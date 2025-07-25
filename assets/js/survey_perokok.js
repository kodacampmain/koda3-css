const form = document.querySelector("form");
const nameInput = form.querySelector("input#name");
const ageInput = form.querySelector("input#age");

nameInput.addEventListener("change", (e) => {
  //   console.log(e.target.value);
  const name = e.target.value;
  const re = /\d+/g;
  if (re.test(name)) {
    const p = document.createElement("p");
    p.textContent = "Nama tidak boleh mengandung angka";
    p.style.cssText = "font-size: 0.75rem; margin: 2px; color: red";
    nameInput.insertAdjacentElement("afterend", p);
  } else {
    const errorMsg = form.querySelector("input#name ~ p");
    if (errorMsg) {
      errorMsg.style.display = "none";
    }
  }
});
ageInput.addEventListener("change", (e) => {
  //   console.log(e.target.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputData = new FormData();
  // const inputData = {};
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.type === "checkbox") {
      // let choices = [];
      // // if (Object.keys(inputData).includes(input.name)) {
      // for (const key of inputData.keys()) {
      //   if (key === input.name) {
      //     // choices = inputData[input.name];
      //     choices = JSON.parse(inputData.get(input.name));
      //     break;
      //   }
      // }
      if (input.checked) {
        if (input.value === "other") {
          const otherBrand = form.querySelector("input#other-brands");
          inputData.append(input.name, otherBrand.value);
          // choices.push(otherBrand.value);
        } else {
          inputData.append(input.name, input.value);
          // choices.push(input.value);
        }
      }
      // if (inputData.has(input.name)) {
      //   inputData.set(input.name, JSON.stringify(choices));
      //   return;
      // }
      // inputData.append(input.name, JSON.stringify(choices));
      // Object.assign(inputData, {
      //   [input.name]: choices,
      // });
      return;
    }
    if (input.name === "other-brands") {
      return;
    }
    if (inputData.has(input.name)) {
      inputData.set(input.name, e.target[input.name].value);
      return;
    }
    inputData.append(input.name, e.target[input.name].value);
    // Object.assign(inputData, {
    //   [input.name]: e.target[input.name].value,
    // });
  });
  const selects = form.querySelectorAll("select");
  selects.forEach((select) => {
    if (select.name === "smoker") {
      let isSmoker = false;
      if (e.target[select.name].value === "y") {
        isSmoker = true;
      }
      if (!isSmoker) {
        inputData.append("brands", JSON.stringify([]));
        // Object.assign(inputData, {
        //   brands: [],
        // });
      }
      inputData.append(select.name, isSmoker);
      // Object.assign(inputData, {
      //   [select.name]: isSmoker,
      // });
      return;
    }
    inputData.append(select.name, e.target[select.name].value);
    // Object.assign(inputData, {
    //   [select.name]: e.target[select.name].value,
    // });
  });
  inputData.forEach((val, key) => {
    console.log(key, val);
  });
  fetch("http://localhost:8080", {
    body: inputData,
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
