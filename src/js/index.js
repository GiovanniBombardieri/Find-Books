import axios from "axios";
import "../css/style.css";

// Variables
const btn = document.querySelector("#btn");
const list = document.querySelector("ul");
const genre = document.querySelector("#genre-input");
const descriptionContainer = document.querySelector("#description");

// Search event by user
btn.addEventListener("click", () => {
  if (list.innerHTML === "") {
    getTitle();
  } else {
    list.innerHTML = "";
    getTitle();
  }
});
genre.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    if (list.innerHTML === "") {
      e.preventDefault();
      getTitle();
    } else {
      list.innerHTML = "";
      e.preventDefault();
      getTitle();
    }
  }
});

// Event to reset
genre.addEventListener("focus", () => {
  list.innerHTML = "";
});

// Function for display title
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
        const title = document.createElement("li");
        title.innerHTML = element.title;
        list.appendChild(title);
        i++;
        title.addEventListener("click", () => {
          console.log(element.key);
          axios
            .get(`http://openlibrary.org${element.key}.json`)
            .then(function (response) {
              console.log(response.data.description.value);
              descriptionContainer.classList.remove("hidden");
              const key = "value";
              if (response.data.description[key]) {
                descriptionContainer.innerHTML =
                  response.data.description.value;
              } else {
                descriptionContainer.innerHTML = response.data.description;
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
  descriptionContainer.innerHTML = "";
  descriptionContainer.classList.add = "hidden";
}
