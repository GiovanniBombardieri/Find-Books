import axios from "axios";
import "../css/style.css";

// Variables
const btn = document.querySelector("#btn");
const genre = document.querySelector("#genre-input");
const bodyTable = document.querySelector("#body-table");
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

// Search event by user
btn.addEventListener("click", () => {
  if (bodyTable.innerHTML === "") {
    getTitle();
  } else {
    bodyTable.innerHTML = "";
    getTitle();
  }
});
genre.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    if (bodyTable.innerHTML === "") {
      e.preventDefault();
      getTitle();
    } else {
      bodyTable.innerHTML = "";
      e.preventDefault();
      getTitle();
    }
  }
});

// Event to reset
genre.addEventListener("focus", () => {
  bodyTable.innerHTML = "";
  table.classList.add("hidden");
});

// Function for display author and title
function getTitle() {
  axios
    .get(
      `http://openlibrary.org/subjects/${genre.value.toLowerCase()}.json?limit=20`
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
                const description = response.data.description.value;
                readDescription(description);
              } else {
                const description = response.data.description;
                readDescription(description);
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
