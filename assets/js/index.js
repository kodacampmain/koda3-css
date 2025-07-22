// localStorage
// penyimpanan dengan key
// get (mengambil)
const imgSrc = localStorage.getItem("koda3:image");
// set (menyimpan)
// localStorage.setItem()
const newImg = document.createElement("img");
newImg.src = `data:image/png;base64,${imgSrc}`;
newImg.alt = "image from localstorage"

const boxSection = document.querySelector("section.box");

boxSection.insertAdjacentElement("afterend", newImg);
