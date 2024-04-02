const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

const apiUrl = 'https://rickandmortyapi.com/api/character';
let currentPage = 1;
const pageSize = 10;
let characterData;

async function fetchData(page) {
  try {
    const response = await fetch(`${apiUrl}?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data from the API');
    }
    characterData = await response.json();
    if (characterData.results && characterData.results.length > 0) {
      displayCharacters(characterData.results);
      createPaginationControls(characterData.info.pages);
    } else {
      throw new Error('Empty or invalid data returned from the API');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Error fetching data');
  }
}

window.addEventListener("load", () => {
  fetchData(currentPage);
});

let searchButton = document.getElementById("buttoned");
searchButton.onclick = function() {
  search(characterData.results);
};

function search(data) {
  let inputName = document.getElementById("searchbar").value;
  let characterDisplayArea = document.querySelector(".characterDisplayArea");
  characterDisplayArea.innerHTML = '';
  for (let j = 0; j < data.length; j++) {
    if (inputName == data[j].name) {
      creation([data[j]]);
      break;
    }
  }
}

function displayCharacters(data) {
  let characterDisplayArea = document.querySelector(".characterDisplayArea");
  characterDisplayArea.innerHTML = '';
  creation(data);
}

function createPaginationControls(totalPages) {
  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.addEventListener('click', () => {
      currentPage = i;
      fetchData(currentPage);
    });
    paginationContainer.appendChild(pageButton);
  }
}

function creation(data) {
  let characterDisplayArea = document.querySelector(".characterDisplayArea");
  for (let i = 0; i < data.length; i++) {
    let characterDiv = document.createElement("div");
    let characterImage = document.createElement("img");
    let characterName = document.createElement("h2");
    let characterSpecies = document.createElement("p");
    let characterStatus = document.createElement("p");
    let characterGender = document.createElement("p");
    let characterOrigin = document.createElement("p");
    let characterLocation = document.createElement("p");

    characterImage.src = data[i].image;
    characterName.textContent = data[i].name;
    characterSpecies.textContent = `SPECIES: ${data[i].species}`;
    characterStatus.textContent = `STATUS: ${data[i].status}`;
    characterGender.textContent = `GENDER: ${data[i].gender}`;
    characterOrigin.textContent = `ORIGIN: ${data[i].origin.name}`;
    characterLocation.textContent = `LAST KNOWN LOCATION: ${data[i].location.name}`;

    characterDiv.appendChild(characterImage);
    characterDiv.appendChild(characterName);
    characterDiv.appendChild(characterSpecies);
    characterDiv.appendChild(characterStatus);
    characterDiv.appendChild(characterGender);
    characterDiv.appendChild(characterOrigin);
    characterDiv.appendChild(characterLocation);

    characterDisplayArea.appendChild(characterDiv);

    characterDiv.classList.add("characterDivTag");
    characterImage.classList.add("characterImageTag");
    characterName.classList.add("characterNameTag");
    characterSpecies.classList.add("characterPTag");
    characterStatus.classList.add("characterPTag");
    characterGender.classList.add("characterPTag");
    characterOrigin.classList.add("characterPTag");
    characterLocation.classList.add("characterPTag");
  }
}
