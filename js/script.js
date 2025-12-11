// Cart items variables
const cart = document.querySelector(".cart");
const closeCart = document.querySelector(".close-cart");
const openCart = document.querySelector(".open-cart");
const cartTotal = document.querySelector(".cart-total");

const addToCart = document.querySelectorAll(".add-btn");
const itemsCounter = document.querySelector(".items-count");

// Opening & Closing The Cart
[openCart, closeCart].forEach((ele) => {
  ele.addEventListener("click", () => {
    cart.classList.toggle("open");
  });
});

// Setting Add To Cart Buttons

addToCart.forEach((ele) => {
  ele.addEventListener("click", () => {
    const targetItem = ele.closest(".item");
    const cartItems = [...document.querySelectorAll(".cart .cart-item p")].map((p) => p.innerHTML);
    if (cartItems.includes(targetItem.children[1])) {
      alert("The item already in the cart");
    } else {
      itemsCounter.innerHTML = +itemsCounter.innerHTML + 1;
      const cartItem = document.createElement("div");
      // Item Image
      const eleImg = document.createElement("img");
      eleImg.src = targetItem.querySelector("img").src;
      eleImg.classList.add("img-fluid", "rounded-circle");
      cartItem.appendChild(eleImg);
      // Item Info Container
      const eleInfo = document.createElement("div");
      eleInfo.classList.add("item-info");
      // item Name
      const eleNameText = document.createTextNode(targetItem.querySelector("h4").textContent);
      const eleName = document.createElement("p");
      eleName.classList.add("m-0");
      eleName.appendChild(eleNameText);
      // Item Price And Count In The Cart
      const eleCount = document.createElement("div");
      eleCount.classList.add("how-many", "text-black-50", "fw-semibold");
      const elePrice = document.createElement("span");
      elePrice.appendChild(document.createTextNode(targetItem.querySelector(".price span").textContent));
      const eleMulti = document.createElement("span");
      eleMulti.appendChild(document.createTextNode("x"));
      const cartItemCount = document.createElement("span");
      cartItemCount.appendChild(document.createTextNode("1"));
      cartItemCount.classList.add("item-count");
      eleCount.appendChild(elePrice);
      eleCount.appendChild(eleMulti);
      eleCount.appendChild(cartItemCount);
      // Cart Item Control
      const itemControl = document.createElement("div");
      itemControl.classList.add("item-control", "ms-auto");
      const firstCont = document.createElement("span");
      firstCont.setAttribute("role", "button");
      firstCont.classList.add("rounded-1", "px-2", "py-1", "bg-light");
      firstCont.appendChild(document.createTextNode("-"));
      const secondCont = document.createElement("span");
      secondCont.setAttribute("role", "button");
      secondCont.classList.add("rounded-1", "px-2", "py-1", "ms-2", "bg-light");
      secondCont.appendChild(document.createTextNode("+"));
      const thirdCont = document.createElement("span");
      thirdCont.setAttribute("role", "button");
      thirdCont.classList.add("rounded-1", "px-2", "py-1", "ms-2", "text-white");
      thirdCont.appendChild(document.createTextNode("x"));
      itemControl.appendChild(firstCont);
      itemControl.appendChild(secondCont);
      itemControl.appendChild(thirdCont);
      // Add The item To the Cart
      cartItem.classList.add("cart-item", "d-flex", "align-items-center", "gap-2", "my-2");
      eleInfo.appendChild(eleName);
      eleInfo.appendChild(eleCount);
      cartItem.appendChild(eleInfo);
      cartItem.appendChild(itemControl);
      cart.children[1].appendChild(cartItem);

      // Add Event To Control Items In The Cart
      [firstCont, secondCont, thirdCont].forEach((ele) => {
        ele.addEventListener("click", () => {
          if (ele.innerHTML === "-") {
            if (cartItemCount.innerHTML > "0") {
              cartItemCount.innerHTML = +cartItemCount.innerHTML - 1;
            }
          } else if (ele.innerHTML === "+") {
            cartItemCount.innerHTML = +cartItemCount.innerHTML + 1;
          } else {
            itemsCounter.innerHTML = +itemsCounter.innerHTML - 1;
            ele.closest(".cart-item").remove();
          }
        });
      });
    }
  });
});
