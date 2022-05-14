// API Base URL
const BASE_URL = `https://deckofcardsapi.com/api/deck/new/draw`;

// Loading Spinner
const loader = styleSpinner => {
  document.getElementById('loader').style.display = styleSpinner;
}

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

    loader('grid')

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
        <h5 class="card-title">Name: ${card.suit}</h5>
        <p class="card-text">Code: ${card.code}</p>
        <p class="card-text">Value: ${card.value}</p>
        <a href="#" class="btn btn-primary" onclick="seeDetails('${card.code}')">Details</a>
      </div>
    </div>
    `;
    cardContainer.appendChild(div);
  });
  loader('none')
};

const seeDetails = code => {
  fetch(`${BASE_URL}/?count=52`)
    .then(response => response.json())
    .then(data => {
      const allCards = data.cards;
      const singleCard = allCards.find(card => card.code === code);
      console.log(singleCard);
      const cardContainer = document.getElementById("card-container");
      // clear card container
      cardContainer.textContent = '';
      const div = document.createElement("div");
      div.classList.add("col-lg-4");
      div.classList.add("mb-5");
      div.innerHTML = `
      <div class="card" style="width: 18rem;">
        <img src="${singleCard.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Name: ${singleCard.suit}</h5>
          <p class="card-text">Code: ${singleCard.code}</p>
          <p class="card-text">Value: ${singleCard.value}</p>
        </div>
      </div>
      `;
      cardContainer.appendChild(div);
    })
}

// Keyboard Event
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById('search-button');
searchInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
})