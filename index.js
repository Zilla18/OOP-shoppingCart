const TOTAL_CART_ITEMS = document.getElementById("total-cart-items");
const DISPLAy_CART_ITEMS = document.getElementById("display-cart-items");
const TOTAL_PRICE = document.getElementById("total-price");

// Create an object class for the product, to store the properties for id, name and price of the prodduct.
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
// ******

// Create an object class for the shopping cart item to store properties for product and its quantity.
// A sub product class
class SupProduct extends Product {
  constructor(id, name, price, quantity) {
    super(id, name, price);
    this.quantity = quantity;
  }
  calculateItemTotal() {
    return this.price * this.quantity;
  }
}
// ******

// Create another object class  for shopping cart which contains an array of ShoppingCartItems instances.
class ShoppingCartItems {
  constructor(cartItems) {
    this.cartItems = cartItems;
  }

  // get total items in cart
  getNumberOfItemsInCart() {
    TOTAL_CART_ITEMS.innerText = this.cartItems.length;
  }

  // get the total amount of everything in cart
  calculateTotalOfItemsInCart() {
    let total = 0;
    this.cartItems.forEach((item) => {
      total += item.quantity * item.price;
    });

    TOTAL_PRICE.innerText = total;
  }

  // A method for decreasing quantity
  decreaseQuantity(productId) {
    this.cartItems.forEach((item) => {
      if (item.id == productId && item.quantity > 1) {
        item.quantity -= 1;
      }

      this.displayCartItems();
      this.calculateTotalOfItemsInCart();
    });
  }

  // A method for increasing quantity
  increaseQuantity(productId) {
    this.cartItems.forEach((item) => {
      if (item.id == productId) {
        item.quantity += 1;
      }

      this.displayCartItems();
      this.calculateTotalOfItemsInCart();
    });
  }

  // A method to remove item
  removeCartItem(productId) {
    let updatedCartItem = this.cartItems.filter(
      (item) => item.id !== productId
    );
    this.cartItems = updatedCartItem;
    this.displayCartItems();
    this.getNumberOfItemsInCart();
  }

  // A method for diaplay all cart items
  displayCartItems() {
    let products = this.cartItems.map((item) => {
      return `<div class="product-card flex items-center border p-2 gap-10 justify-center">
          <h2>${item.name}</h2>
          <h3>${item.price}</h3>
          <div>
            <button id=${
              item.id
            } class="decrease-btn bg-red-500 rounded-md p-2 text-white">
              Decrease
            </button>
            <p>${item.quantity}</p>
            <button id=${
              item.id
            } class="increase-btn bg-green-500 rounded-md p-2 text-white">
              Increase
            </button>

          </div>
          <p>${item.calculateItemTotal()}</p>

           <button id=${
             item.id
           } class="delete-btn bg-purple-500 rounded-md p-2 text-white">
              Delete
            </button>
        </div>`;
    });
    DISPLAy_CART_ITEMS.innerHTML = products.join(" ");

    // get all the buttons for decresing
    const decreaseBTN = document.querySelectorAll(".decrease-btn");
    decreaseBTN.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.decreaseQuantity(parseInt(e.target.getAttribute("id")));
      });
    });

    // get all the buttons for increasing
    const increaseBTN = document.querySelectorAll(".increase-btn");
    increaseBTN.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.increaseQuantity(parseInt(e.target.getAttribute("id")));
      });
    });

    // get all the buttons for deleting
    const deleteBTN = document.querySelectorAll(".delete-btn");
    deleteBTN.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.removeCartItem(parseInt(e.target.getAttribute("id")));
      });
    });
  }
}

// our cart items
const cartItems = [
  new SupProduct(1, "Iphone", 140000, 1),
  new SupProduct(2, "Samsung", 67000, 1),
  new SupProduct(3, "Sony", 23000, 1),
];

// instance of the shopping cart
const shoppingCart = new ShoppingCartItems(cartItems);

// display all cart items
shoppingCart.displayCartItems();
shoppingCart.getNumberOfItemsInCart();
shoppingCart.calculateTotalOfItemsInCart();
