(async function () {
  const trafficContainer = document.querySelector(".traffic-light .container");
  const red = trafficContainer.querySelector(".red");
  const yellow = trafficContainer.querySelector(".yellow");
  const green = trafficContainer.querySelector(".green");
  await new Promise((resolve) =>
    setTimeout(() => {
      // matikan lampu merah
      red.classList.toggle("active");
      // nyalakan lampu kuning
      //   yellow.className += "active";
      yellow.classList.toggle("active");
      resolve();
    }, 3000)
  );
  await new Promise((resolve) =>
    setTimeout(() => {
      // matikan lampu kuning
      yellow.classList.toggle("active");
      // nyalakan lampu hijau
      green.classList.toggle("active");
      resolve();
    }, 2000)
  );
  await new Promise((resolve) =>
    setTimeout(() => {
      // matikan lampu hijau
      green.classList.toggle("active");
      // nyalakan lampu merah
      red.classList.toggle("active");
      resolve();
    }, 3000)
  );
});

(function () {
  const chessBoard = document.querySelector("section.chess-board");
  const chessContainer = document.createElement("div");
  chessContainer.classList.add("container");
  for (let i = 1; i <= 64; i++) {
    if (i % 2 !== 0) {
      const chessBox = document.createElement("div");
      // pengecekan baris ganjil/genap
      if (Math.ceil(i / 8) % 2 !== 0) {
        chessBox.classList.add("white");
      } else {
        chessBox.classList.add("black");
      }
      chessContainer.append(chessBox);
      continue;
    }
    const chessBox = document.createElement("div");
    // pengecekan baris ganjil/genap
    if (Math.ceil(i / 8) % 2 !== 0) {
      chessBox.classList.add("black");
    } else {
      chessBox.classList.add("white");
    }
    chessContainer.append(chessBox);
  }
  chessBoard.append(chessContainer);
})();

(function () {
  const profileData = {
    name: "John Doe",
    age: 30,
    profession: "Web Developer",
    hobbies: ["Reading", "Hiking", "Photography"],
  };
  const profileBody = document.querySelector("section.profile");
  const div = document.createElement("div");
  div.classList.add("profile-card");
  const h2 = document.createElement("h2");
  h2.textContent = profileData.name;
  const p = document.createElement("p");
  p.textContent = `Umur: ${profileData.age}, Profesi: ${profileData.profession}`;
  const ul = document.createElement("ul");
  const hobbiesElement = profileData.hobbies.map((hobby) => {
    const li = document.createElement("li");
    li.textContent = hobby;
    return li;
  });
  ul.append(...hobbiesElement);
  div.append(h2, p, ul);
  profileBody.append(div);
})();

(function () {
  const table = document.getElementById("data-table");
  const tbody = table.querySelector("tbody");
  const newRow = document.createElement("tr");
  const name = document.createElement("td");
  const score = document.createElement("td");
  name.textContent = "Charlie";
  score.textContent = 92;
  newRow.append(name, score);
  tbody.append(newRow);
  const bob = table.querySelector("tbody tr:nth-of-type(2)");
  const bobScore = bob.querySelector("td:nth-child(2)");
  bobScore.textContent = 89;
  const alice = table.querySelector("tbody tr:nth-of-type(1)");
  alice.classList.add("top-scorer");
  const tableFooter = document.createElement("tfoot");
  const footerRow = document.createElement("tr");
  const footerHead = document.createElement("th");
  footerHead.scope = "row";
  footerHead.textContent = "Average";
  footerHead.style.cssText = "background-color:black; color:white";
  const footerData = document.createElement("td");
  const scores = table.querySelectorAll("tbody tr td:nth-child(2)");
  //   const scoreAvg = Array.from(scores).reduce((sum, score, _, arr) => {
  //     return sum + parseInt(score.textContent) / arr.length;
  //   }, 0);
  let scoreAvg = 0;
  scores.forEach((score, _, arr) => {
    scoreAvg += parseInt(score.textContent) / arr.length;
  });
  footerData.textContent = scoreAvg;
  footerRow.append(footerHead, footerData);
  tableFooter.append(footerRow);
  table.append(tableFooter);
})();

const header = document.querySelector("header");
const nav = header.querySelector("nav");
const menu = header.querySelector(".hamburger-menu");
const loggedOut = header.querySelector(".logged-out");
const loggedIn = header.querySelector(".logged-in");

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("koda3:user")) {
    loggedIn.style.display = "block";
    loggedOut.style.display = "none";
  } else {
    loggedIn.style.display = "none";
    loggedOut.style.display = "block";
  }
});
const userChange = new Event("user-change");
document.addEventListener(userChange.type, function () {
  if (localStorage.getItem("koda3:user")) {
    loggedIn.style.display = "block";
    loggedOut.style.display = "none";
  } else {
    loggedIn.style.display = "none";
    loggedOut.style.display = "block";
  }
});
// loggedIn.addEventListener(userChange.type, function () {
//   if (localStorage.getItem("koda3:user")) {
//     loggedIn.style.display = "block";
//     return;
//   }
//   loggedIn.style.display = "none";
// });
// loggedOut.addEventListener(userChange.type, function () {
//   if (!localStorage.getItem("koda3:user")) {
//     loggedOut.style.display = "block";
//     return;
//   }
//   loggedOut.style.display = "none";
// });
loggedIn.addEventListener("click", function () {
  localStorage.removeItem("koda3:user");
  // loggedIn.dispatchEvent(userChange);
  // loggedOut.dispatchEvent(userChange);
  document.dispatchEvent(userChange);
});

menu.addEventListener("click", () => {
  nav.classList.toggle("active");
  menu.classList.toggle("active");
});

const form = document.querySelector("section.login form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { email, pwd } = e.target;
  // validasi
  const emailRe = /^[\w\.\-]+@[a-zA-Z]+\.(com|net|gov)$/;
  const pwdRe = /^(?=.*[a-z])+(?=.*[A-Z])+(?=.*[!@#$%^&*/><])+[a-zA-Z!@#$%^&*/><]{8,}$/;

  let error = 0;
  const errorMsg = form.querySelectorAll("p.error");
  if (errorMsg.length) {
    for (let msg of errorMsg) {
      msg.remove();
    }
  }

  if (!emailRe.test(email.value)) {
    error++;
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "Invalid Email Address";
    errorMsg.classList.add("error");
    form.querySelector("input[name=email]").insertAdjacentElement("afterend", errorMsg);
  }
  if (!pwdRe.test(pwd.value)) {
    error++;
    const errorMsg = document.createElement("p");
    errorMsg.textContent =
      "Minimum 8 characters and have at least 1 lowercase letter, 1 uppercase letter and 1 of the following special character (!@#$%^&*/><)";
    errorMsg.classList.add("error");
    form.querySelector("input[name=pwd]").insertAdjacentElement("afterend", errorMsg);
  }

  if (!error) {
    console.log(`\nEmail: ${email.value}\nPassword: ${pwd.value}`);
    localStorage.setItem(
      "koda3:user",
      JSON.stringify({
        email: email.value,
        pwd: pwd.value,
      })
    );
    // loggedIn.dispatchEvent(userChange);
    // loggedOut.dispatchEvent(userChange);
    document.dispatchEvent(userChange);
  }
});
