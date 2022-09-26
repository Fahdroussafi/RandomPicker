// let elements = [];

var tableContent = document.querySelector(".tableContent"); // get the table content from the json file

const getInput = () => {
  let fullname = document.getElementById("fullname").value;
  if (!fullname) {
    alert("Please enter a name");
  } else {
    let element = {
      id: `${Math.floor(Math.random() * 10)}${Date.now()}`,
      fullName: fullname,
      subject: "NotAdded",
      status: "notChoosed",
      date: "",
    };
    addElement(element);
  }
};

document.querySelector("#btnAdd").addEventListener("click", getInput);

//fetch elements
const fetchElements = async () => {
  const response = await fetch("http://localhost:3000/elements");
  const data = await response.json();
  await render(data);
  return data;
};

fetchElements();

//add elements to json
const addElement = async (element) => {
  const res = await fetch("http://localhost:3000/elements", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(element),
  });
  const data = await res.json();
  render(fetchElements());
};

const render = (elements) => {
  tableContent.innerHTML = ""; // clear the table
  if (elements.length) {
    // if there are elements in the array then render them
    elements.map((e, idx) => {
      var newTd = document.createElement("tr");
      newTd.classList.add("hover:bg-black"); // add class to the new td
      newTd.innerHTML = `
      <td class="text-center">${e.fullName}</td>
      <td class="text-center">${e.status}</td>
      <td class="text-center">${e.subject} </td>
      <td class="text-center">${e.date}</td>
          <td class="p-2 flex justify-center">
          <button class="p-1 rounded-full bg-red-500 text-white font-bold px-4 btnReset" id="${e.id}">Reset</button>
          </td>
          `;
      tableContent.appendChild(newTd);
    });
  }
  addEventListenerToReset();
};

const addEventListenerToReset = () => {
  const btnReset = document.querySelectorAll(".btnReset"); // get all the reset buttons from the table
  btnReset.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      resetElement(e.target.id);
    });
  });
};

//edit date from date input to json
const updateElement = async (element) => {
  const res = await fetch(`http://localhost:3000/elements/${element.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(element),
  });
  const data = await res.json();
  render(fetchElements());
};

//reset one element
const resetElement = async (idElement) => {
  let elements = await fetchElements();
  elements.map((e) => {
    if (e.id === idElement) {
      e.status = "notChoosed";
      e.date = "";
      e.subject = "NotAdded";
      updateElement(e);
    }
  });
};

const changeDate = async () => {
  let elements = await fetchElements();
  elements.map((e) => {
    var idElement = document.getElementById("spinnerWinnerId").value;
    let subject = document.getElementById("subject").value;

    console.log(idElement);
    if (e.id === idElement) {
      e.date = document.getElementById("datePickerInput").value;
      e.status = "choosed";
      e.subject = subject;
      updateElement(e);
    }
  });
};

document.querySelector("#ChooseBtn").addEventListener("click", changeDate);
