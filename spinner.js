var spinner = document.querySelector("#spinner");
let random;

const fetchElements = async () => {
  const response = await fetch("http://localhost:3000/elements");
  const data = await response.json();
  await render(data);
  return data;
};

const render = async (elements) => {
  spinner.innerHTML = "";
  let arr = [];
  elements.forEach((element) => {
    if (element.status === "notChoosed") {
      arr.push(element.id);
    }
  });

  //arr random
  random = arr[Math.floor(Math.random() * arr.length)]; // get random element from the array of notChoosed elements
  let randomElement = elements.find((element) => element.id === random);
  randomElement.style = "transform: scale(1.3)";
  await elements.map((e) => {
    if (e.status === "notChoosed") {
      var newSpin = document.createElement("div");
      newSpin.classList.add("scale-50");
      newSpin.classList.add("w-full");

      newSpin.innerHTML = `
            <div class=" p-3 text-2xl text-center  ${
              e.id == random
                ? "bg-red-600 rounded-3xl text-white border-2 shadow-2xl"
                : "bg-white border-2 border-black"
            } ${
        e.status != "notChoosed" ? "bg-gray-200" : " shadow-2xl"
      }" id="id_${e.id}" > 
            <h3 class="text-5xl font-semibold items-baseline whitespace-nowrap">${
              e.fullName
            }</h3>
            <p class="text-3xl m-2 items-baseline whitespace-nowrap "</p>
            </div>
            `;
      document.getElementById("spinnerWinner").innerHTML =
        randomElement.fullName;
      document.getElementById("spinnerWinnerId").value = randomElement.id;
      spinner.appendChild(newSpin);
    }
  });
  scrollToElement(randomElement.id);
};

//onclick rendomize
var elements = fetchElements();

//add event listener to randomize button
const randomizeButton = document.querySelector("#btnSpinner");
randomizeButton.addEventListener("click", fetchElements);
// autoclicker for 5 seconds everytime you click the button
randomizeButton.addEventListener("click", () => {
  let i = 0;
  let interval = setInterval(() => {
    fetchElements();
    i++;
    if (i > 25) {
      clearInterval(interval);
    }
  }, 100);
});

fetchElements();
document.querySelector("#btnAdd").addEventListener("click", fetchElements);
