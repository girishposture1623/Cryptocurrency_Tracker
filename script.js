const Url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
const nwesurl = 'https://newsapi.org/v2/everything?q=crypto&curency=today&sortBy=publishedAt&apiKey=7ed18bf836014219a8d2e5a1b0d08960'


const table = document.getElementById("table");
const search = document.getElementById("search")

async function fetchCrypto() {
  try {
    const response = await fetch(Url);
    const data = await response.json();
    // console.log(data)
    displayData(data);
    Search(data)
  } catch (error) {
    console.error("Error", error);
  }
}

function displayData(coins) {
  table.innerHTML = "";

  coins.forEach(coin => {
    const row = document.createElement("tr");


    const nameCell = document.createElement("td");
    const img = document.createElement("img");
    img.className = 'img'
    img.src = coin.image;
    const name = document.createElement('p')
    name.innerText = coin.name
    name.className = 'nmae'
    nameCell.append(name, img);
    // nameCell.appendChild(img);

    const priceCell = document.createElement("td");
    priceCell.textContent = `$ ${coin.current_price.toLocaleString()}`;

    const marketCapCell = document.createElement("td");
    marketCapCell.textContent = `${coin.market_cap.toLocaleString()}`;

    const changeCell = document.createElement("td");

    const change = coin.price_change_percentage_24h;
    // console.log(change)
    changeCell.textContent = `${change.toFixed(2)}%`;
    changeCell.classList.add(change >= 0 ? "positive" : "negative");

    row.append(nameCell, priceCell, changeCell);
    row.addEventListener("click", () => show(coin));

    table.appendChild(row);

  });
}


function show(coin) {

  const di = document.getElementById('popup')
  const closeIcon = document.querySelector('.close-icon');
  const popup = document.querySelector('.popup');
  const popupContainer = document.querySelector('.popup-container');
  di.innerHTML = '';

  const image = document.createElement('img');
  image.src = coin.image;
  image.className = 'image'

  const name = document.createElement('p');
  name.innerText = coin.name;

  const price = document.createElement('p');
  price.innerText = `Current price: $${coin.current_price.toLocaleString()}`;

  const market = document.createElement('p');
  market.innerText = `Market cap: $${coin.market_cap.toLocaleString()}`;

  const change = document.createElement('p');
  change.innerText = `Price change (24h): ${coin.price_change_percentage_24h.toFixed(2)}%`;
  const lastUpdat = document.createElement('p')
  lastUpdat.innerText = `lastUpdat: ${coin.last_updated}`;
  di.append(image, name, price, market, change, lastUpdat)

  popupContainer.classList.add('popup-open');

  closeIcon.onclick = () => popupContainer.classList.remove('popup-open');
  popupContainer.onclick = () => popupContainer.classList.remove('popup-open');
  popup.onclick = (e) => e.stopPropagation();
}


function Search(data) {
  search.addEventListener("input", e => {
    const query = e.target.value.toLowerCase();
    const filtered = data.filter(coin =>
      coin.name.toLowerCase().includes(query)
    );
    displayData(filtered);
  });
}

fetchCrypto();


async function news() {
  try {
    const response = await fetch(nwesurl)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()

    if (!data.articles) {
      console.error('No articles found:', data)
      return
    }

    showNews(data.articles)
  } catch (err) {
    console.error('Fetch error:', err)
  }
}
news()



function showNews(data) {
  data.map((e) => {
    const show = document.getElementById('main2')
    const title = document.createElement('h4')
    const hr = document.createElement('hr')
    const storeimag = document.getElementById('images')
    const image = document.createElement('img')
    image.src = e.urlToImage
    const imageurl = e.url
    image.className = 'imag'
    title.innerText = e.title
    title.className = 'title'

    image.addEventListener('click', (e) => {
      // console.log(imageurl)
      if (imageurl) {
        open(imageurl)
      }
    })
    show.append(title,image)
  })

}


