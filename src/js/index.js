import axios from "axios";
import "../css/style.css";

// Variables
const btn = document.querySelector("#btn");
const genre = document.querySelector("#genre-input");
const bodyTable = document.querySelector("#body-table");
const tableContainer = document.querySelector("#container");

const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");

// Read description of single book
function readDescription(description) {
  const dialogText = document.querySelector("#dialog-text");
  dialogText.innerHTML = description;
  dialog.showModal();
}
// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

btn.addEventListener("click", () => {
  genre.value = "";
  tableContainer.classList.remove("hidden");
  const titleId1 = document.querySelector("#title-id1");
  const titleId2 = document.querySelector("#title-id2");
  const titleId3 = document.querySelector("#title-id3");
  const titleId4 = document.querySelector("#title-id4");
  const titleId5 = document.querySelector("#title-id5");
  const descriptionTitle1 = document.querySelector("#description-title-1");
  const descriptionTitle2 = document.querySelector("#description-title-2");
  const descriptionTitle3 = document.querySelector("#description-title-3");
  const descriptionTitle4 = document.querySelector("#description-title-4");
  const descriptionTitle5 = document.querySelector("#description-title-5");

  let description1 = descriptionTitle1.innerHTML;
  let description2 = descriptionTitle2.innerHTML;
  let description3 = descriptionTitle3.innerHTML;
  let description4 = descriptionTitle4.innerHTML;
  let description5 = descriptionTitle5.innerHTML;

  titleId1.addEventListener("click", () => {
    readDescription(description1);
  });
  titleId2.addEventListener("click", () => {
    readDescription(description2);
  });
  titleId3.addEventListener("click", () => {
    readDescription(description3);
  });
  titleId4.addEventListener("click", () => {
    readDescription(description4);
  });
  titleId5.addEventListener("click", () => {
    readDescription(description5);
  });
});

// Event to reset
genre.addEventListener("focus", () => {
  console.log("Hello");
  tableContainer.classList.add("hidden");
});

// Search event by user
// btn.addEventListener("click", () => {
//   if (bodyTable.innerHTML === "") {
//     getTitle();
//   } else {
//     bodyTable.innerHTML = "";
//     getTitle();
//   }
// });
// genre.addEventListener("keypress", function (e) {
//   if (e.key === "Enter") {
//     if (bodyTable.innerHTML === "") {
//       e.preventDefault();
//       getTitle();
//     } else {
//       bodyTable.innerHTML = "";
//       e.preventDefault();
//       getTitle();
//     }
//   }
// });

// Event to reset
// genre.addEventListener("focus", () => {
//   bodyTable.innerHTML = "";
//   table.classList.add("hidden");
// });

// Function for display author and title
function getTitle() {
  if (genre.value === "") {
    alert("Write a valid genre, please.");
  }

  axios
    .get(
      `http://openlibrary.org/subjects/${genre.value.toLowerCase()}.json?limit=3`
    )
    .then(function (response) {
      console.log(response);

      let i = 1;
      response.data.works.forEach((element) => {
        // Create element for the table
        const tableRow = document.createElement("tr");
        const workNumber = document.createElement("td");
        const author = document.createElement("td");
        const title = document.createElement("td");

        // Assign the right element of the array
        workNumber.innerHTML = i;
        author.innerHTML = element.author;
        title.innerHTML = element.title;

        // Display the table
        bodyTable.appendChild(tableRow);
        tableRow.appendChild(workNumber);
        tableRow.appendChild(author);
        tableRow.appendChild(title);

        i++;

        title.addEventListener("click", () => {
          console.log(element.key);
          axios
            .get(`http://openlibrary.org${element.key}.json`)
            .then(function (response) {
              console.log(response.data.description.value);
              const key = "value";
              if (response.data.description[key]) {
                let a = response.data.description.value;
              } else {
                let a = response.data.description;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  genre.value = "";
}
