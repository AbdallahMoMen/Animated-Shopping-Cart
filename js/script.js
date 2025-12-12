// Cart items variables
const cart = document.querySelector(".cart");
const closeCart = document.querySelector(".close-cart");
const openCart = document.querySelector(".open-cart");
const cartTotal = document.querySelector(".cart-total");

const addToCart = document.querySelectorAll(".add-btn");
const itemsCounter = document.querySelector(".items-count");

// LocalStorage functions
function saveCartToStorage() {
  const cartItems = [];
  document.querySelectorAll(".cart-item").forEach((item) => {
    const name = item.querySelector(".item-info p").textContent;
    const price = item.querySelector(".item-price").textContent;
    const count = item.querySelector(".item-count").textContent;
    const img = item.querySelector("img").src;
    cartItems.push({ name, price, count, img });
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("itemsCount", itemsCounter.innerHTML);
}

function loadCartFromStorage() {
  const savedItems = localStorage.getItem("cartItems");
  const savedCount = localStorage.getItem("itemsCount");

  if (savedItems) {
    const cartItems = JSON.parse(savedItems);
    cartItems.forEach((item) => {
      const targetItem = [...document.querySelectorAll(".item")].find(
        (el) => el.querySelector("h4").textContent === item.name
      );

      if (targetItem) {
        targetItem.setAttribute("item-added", "true");
        createCartItem(targetItem, item.count);
      }
    });

    if (savedCount) {
      itemsCounter.innerHTML = savedCount;
    }
    calcCartTotal();
  }
}

// Calculate Cart Total
function calcCartTotal() {
  const allPrices = document.querySelectorAll(".cart .cart-item .item-price");
  const allCounts = document.querySelectorAll(".cart .cart-item .item-count");
  let theTotal = 0.0;
  for (let count = 0; count < allPrices.length; count++) {
    theTotal += +allPrices[count].textContent.slice(1) * +allCounts[count].innerHTML;
  }
  cartTotal.innerHTML = theTotal;
  saveCartToStorage();
}

// Opening & Closing The Cart
[openCart, closeCart].forEach((ele) => {
  ele.addEventListener("click", () => {
    cart.classList.toggle("open");
  });
});

// Create cart item function
function createCartItem(targetItem, initialCount = 1) {
  itemsCounter.innerHTML = +itemsCounter.innerHTML + 1;
  const cartItem = document.createElement("div");
  // Item Image
  const eleImg = document.createElement("img");
  eleImg.src = targetItem.querySelector("img").src;
  eleImg.classList.add("img-fluid", "rounded-circle");
  // Item Info Container
  const eleInfo = document.createElement("div");
  eleInfo.classList.add("item-info");
  // item Name
  const eleNameText = document.createTextNode(targetItem.querySelector("h4").textContent);
  const eleName = document.createElement("p");
  eleName.classList.add("w-100", "m-0");
  eleName.appendChild(eleNameText);
  // Item Price And Count In The Cart
  const eleCount = document.createElement("div");
  eleCount.classList.add("how-many", "text-black-50", "fw-semibold");
  const elePrice = document.createElement("span");
  elePrice.appendChild(document.createTextNode(targetItem.querySelector(".price span").textContent));
  elePrice.classList.add("item-price");
  const eleMulti = document.createElement("span");
  eleMulti.appendChild(document.createTextNode("x"));
  const cartItemCount = document.createElement("span");
  cartItemCount.appendChild(document.createTextNode(initialCount.toString()));
  cartItemCount.classList.add("item-count");
  eleCount.appendChild(elePrice);
  eleCount.appendChild(eleMulti);
  eleCount.appendChild(cartItemCount);
  targetItem.setAttribute("item-added", "true");
  // Cart Item Control
  const itemControl = document.createElement("div");
  itemControl.classList.add("item-control", "ms-auto");
  const firstCont = document.createElement("span");
  firstCont.setAttribute("role", "button");
  firstCont.classList.add("rounded-1", "px-2", "py-1", "bg-light");
  firstCont.appendChild(document.createTextNode("-"));
  const secondCont = document.createElement("span");
  secondCont.setAttribute("role", "button");
  secondCont.classList.add("rounded-1", "px-2", "py-1", "mx-1", "bg-light");
  secondCont.appendChild(document.createTextNode("+"));
  const thirdCont = document.createElement("span");
  thirdCont.setAttribute("role", "button");
  thirdCont.classList.add("rounded-1", "px-2", "py-1", "text-white");
  thirdCont.appendChild(document.createTextNode("x"));
  itemControl.appendChild(firstCont);
  itemControl.appendChild(secondCont);
  itemControl.appendChild(thirdCont);
  // Add The item To the Cart
  cartItem.classList.add("cart-item", "d-flex", "align-items-center", "gap-2", "my-2");
  eleInfo.appendChild(eleName);
  eleInfo.appendChild(eleCount);
  const itemInfo = document.createElement("div");
  itemInfo.classList.add("d-flex", "justify-content-center", "align-items-center", "gap-1");
  itemInfo.appendChild(eleImg);
  itemInfo.appendChild(eleInfo);
  cartItem.appendChild(itemInfo);
  cartItem.appendChild(itemControl);
  cart.children[1].appendChild(cartItem);
  calcCartTotal();
  // Add Event To Control Items In The Cart
  [firstCont, secondCont, thirdCont].forEach((ele) => {
    ele.addEventListener("click", () => {
      if (ele.innerHTML === "-") {
        if (cartItemCount.innerHTML > "1") {
          cartItemCount.innerHTML = +cartItemCount.innerHTML - 1;
          calcCartTotal();
        }
      } else if (ele.innerHTML === "+") {
        cartItemCount.innerHTML = +cartItemCount.innerHTML + 1;
        calcCartTotal();
      } else {
        itemsCounter.innerHTML = +itemsCounter.innerHTML - 1;
        ele.closest(".cart-item").remove();
        targetItem.setAttribute("item-added", "false");
        calcCartTotal();
      }
    });
  });
}

// Setting Add To Cart Buttons
addToCart.forEach((ele) => {
  ele.addEventListener("click", () => {
    const targetItem = ele.closest(".item");
    if (targetItem.getAttribute("item-added") == "true") {
      const allItems = document.querySelectorAll(".cart .item-info");
      for (let count = 0; count < allItems.length; count++) {
        let tarname = allItems[count].children[0].textContent;
        if (tarname == targetItem.children[1].textContent) {
          let itemCount = allItems[count].querySelector(".item-count");
          itemCount.innerHTML = +itemCount.innerHTML + 1;
          calcCartTotal();
        }
      }
    } else {
      createCartItem(targetItem);
    }
  });
});

// Load cart from storage on page load
loadCartFromStorage();
