const getRemoteData = function () {
  fetch("https://striveschool-api.herokuapp.com/books", {})
    .then((res) => {
      console.log(res);

      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nella chiamata");
      }
    })
    .then((data) => {
      console.log(data);
      let spinnerContainer = document.getElementById("spinner-container");
      spinnerContainer.classList.add("d-none");

      let row = document.querySelector(".row");

      data.forEach((Element) => {
        let newCol = document.createElement("div");
        newCol.classList.add("col", "col-3", "mb-5");

        newCol.innerHTML = `
            <div class="card h-100 "  style="width: 18rem;">
              <img src="${Element.img}" class="card-img-top h-75" alt="copertina libro">
              <div class="card-body h-20">
                <h5 class="card-title">${Element.title}</h5>
                <p class="card-text">${Element.price}</p>
                <button class="btn btn-primary btn-acquista">Acquista</button>
                <button class="btn btn-primary btn-scarta">Scarta</button>
              </div>
            </div>
          `;
        row.appendChild(newCol);
      });

      // Pulsante Acquista
      let btnAcquistaList = document.querySelectorAll(".btn-acquista");
      btnAcquistaList.forEach((btn) => {
        btn.addEventListener("click", addToCart);
      });

      // Pulsante Scarta
      let btnScartaList = document.querySelectorAll(".btn-scarta");
      btnScartaList.forEach((btn) => {
        btn.addEventListener("click", removeCard);
      });
    })
    .catch((err) => {
      console.log("ERRORE!", err);
    });
};

// Aggiungere un libro al carrello
const addToCart = function (event) {
  const card = event.target.closest(".card");
  const title = card.querySelector(".card-title").textContent;
  const price = card.querySelector(".card-text").textContent;

  const cartItem = document.createElement("li");
  cartItem.textContent = `${title} - ${price}`;
  document.getElementById("books-list").appendChild(cartItem);

  // Salvo i dati nel localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const newItem = {
    title: title,
    price: price,
  };
  cartItems.push(newItem);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// Rimuovere la card dalla pagina
const removeCard = function (event) {
  const card = event.target.closest(".card");
  card.remove();
};

getRemoteData();
