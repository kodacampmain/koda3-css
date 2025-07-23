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
  const inputData = {};
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.type === "checkbox") {
      let choices = [];
      if (Object.keys(inputData).includes(input.name)) {
        choices = inputData[input.name];
      }
      if (input.checked) {
        if (input.value === "other") {
          const otherBrand = form.querySelector("input#other-brands");
          choices.push(otherBrand.value);
        } else {
          choices.push(input.value);
        }
      }
      Object.assign(inputData, {
        [input.name]: choices,
      });
      return;
    }
    if (input.name === "other-brands") {
      return;
    }
    Object.assign(inputData, {
      [input.name]: e.target[input.name].value,
    });
  });
  const selects = form.querySelectorAll("select");
  selects.forEach((select) => {
    if (select.name === "smoker") {
      let isSmoker = false;
      if (e.target[select.name].value === "y") {
        isSmoker = true;
      }
      if (!isSmoker) {
        Object.assign(inputData, {
          brands: [],
        });
      }
      Object.assign(inputData, {
        [select.name]: isSmoker,
      });
      return;
    }
    Object.assign(inputData, {
      [select.name]: e.target[select.name].value,
    });
  });
  console.log(inputData);
});
