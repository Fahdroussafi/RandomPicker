var tableContent = document.querySelector(".tableContent");

const log = (ele) => {
  console.log(ele);
};

let elements = [];

const getInput = () => {
  let fullname = document.getElementById("fullname").value;
  // let subject = document.getElementById("subject").value;
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
  // console.log(data);
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
  // console.log(data);
  render(fetchElements());
};

// delete all elements function from json file when you click on clear button
// const deleteAllElements = async () => {
//   let res = await fetch("http://localhost:3000/elements", {
//     method: "DELETE",
//   });
//   let data = await res.json();
//   console.log(data);
//   render(fetchElements());
// };

// document
//   .querySelector("#btnEmpty")
//   .addEventListener("click", deleteAllElements);

const render = (elements) => {
  tableContent.innerHTML = "";
  if (elements.length) {
    elements.map((e, idx) => {
      var newTd = document.createElement("tr");
      newTd.classList.add("hover:bg-blue-100");
      newTd.innerHTML = `
      <td class="text-center">${e.fullName}</td>
      <td class="text-center">${e.status}</td>
      <td class="text-center">${e.subject} </td>
      <td class="text-center">${e.date}</td>
          <td class="p-2 flex justify-center">
          <button class="p-1  rounded-md bg-red-500 text-white px-3 focus:scale-95 btnReset" id="${e.id}">Reset</button>
          </td>
          `;
      tableContent.appendChild(newTd);
    });
  }
  addEventListenerToReset();
};

const addEventListenerToReset = () => {
  const btnReset = document.querySelectorAll(".btnReset");
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
