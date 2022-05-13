// API Base URL
const BASE_URL = `https://deckofcardsapi.com/api/deck/new/draw`;

//Make a valid search function
const searchResult = () => {
  const userInput = document.getElementById("search-input");
  const errorId = document.getElementById("error");
  const inputValue = parseInt(userInput.value);

  // Error handling
  if (isNaN(inputValue) || inputValue === "") {
    errorId.innerText = "Please give a number!";
  } else if (inputValue <= 0 || inputValue > 52) {
    errorId.innerText = "Please give a number between 1 to 52!";
  } else {
    // clear errorId
    errorId.textContent = "";

    // Get the deck card api
    fetch(`${BASE_URL}/?count=${inputValue}`)
      .then((response) => response.json())
      .then((data) => displayData(data.cards));
  }

  // Clear card container
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = '';

  // Clean input filled
  userInput.value = "";
};

const displayData = (cards) => {
  const cardContainer = document.getElementById("card-container");
  cards.forEach((card) => {
    const div = document.createElement("div");
    div.classList.add("col-lg-4");
    div.classList.add("mb-5");
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img src="${card.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${card.suit} ${card.code}</h5>
        <p class="card-text">${card.value}</p>
        <a href="#" class="btn btn-primary">Details</a>
      </div>
    </div>
    `;
    cardContainer.appendChild(div);
  });
};
