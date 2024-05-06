// Selecting the "Get Food" button element
const getFoodButton = document.querySelector(".get-food-btn");

// Click event listener for the "Get Food" button
getFoodButton.addEventListener("click", () => {
  // Showing the "food-bank" section
  showSection("food-bank");
  // Fetching and display food items
  fetchFoodItems();
});

// Function to fetch and display food items
function fetchFoodItems() {
  // Fetch food items from the json server
  fetch("http://localhost:3000/foodItems")
    .then((response) => response.json())
    .then((data) => {
      // Get the container element for food items
      const foodItemsContainer = document.getElementById(
        "food-items-container"
      );
      // Clear existing food items
      foodItemsContainer.innerHTML = "";

      // Looping through each food item and create a card for it
      data.forEach((foodItem) => {
        // Create a div element for the food card
        const foodCard = document.createElement("div");
        foodCard.classList.add("food-card");

        // Creating an img element for the food image
        const foodImage = document.createElement("img");
        foodImage.src = foodItem.imageUrl;
        foodImage.alt = foodItem.description;

        // Creating a div element for the food content
        const foodContent = document.createElement("div");
        foodContent.classList.add("food-card-content");

        // Creating a p element for the food description
        const foodDescription = document.createElement("p");
        foodDescription.textContent = foodItem.description;

        // Creating a button element for adding to cart
        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.addEventListener("click", () => addToCart(foodItem));

        // Appending the description and "Add to Cart" button to the food content div
        foodContent.appendChild(foodDescription);
        foodContent.appendChild(addToCartButton);

        // Appending the image and content to the food card div
        foodCard.appendChild(foodImage);
        foodCard.appendChild(foodContent);

        // Appending the food card to the container
        foodItemsContainer.appendChild(foodCard);
      });
    })
    .catch((error) => console.error("Error:", error));
}

// Array to store the cart items
const cart = [];

// Function to add a food item to the cart
function addToCart(foodItem) {
  // Adding the food item to the cart array
  cart.push(foodItem);
  // Log the updated cart
  console.log("Cart:", cart);
}

//  Proceed to Checkout button element selection
const proceedToCheckoutButton = document.getElementById("proceed-to-checkout");

// Click event listener to the "Proceed to Checkout" button
proceedToCheckoutButton.addEventListener("click", () => {
  // Show the checkout form section
  showSection("checkout-form");
});

// Selecting the recipient form element
const recipientForm = document.querySelector("#checkout-form form");

// Event listener to the form's submit event
recipientForm.addEventListener("submit", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // FormData object from the form
  const formData = new FormData(event.target);

  // Extracting form data and create a recipient object
  const recipient = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    contact: formData.get("contact"),
    location: formData.get("location"),
  };

  // Sending a POST request to the server with the recipient information
  fetch("http://localhost:3000/recipients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipient),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);

      // Getting the IDs of the food items in the cart
      const foodItemIds = cart.map((item) => item.id);

      // Loop through each food item ID and delete it from the server
      foodItemIds.forEach((id) => {
        fetch(`http://localhost:3000/foodItems/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => console.log(`Deleted food item with ID: ${id}`))
          .catch((error) => console.error("Error:", error));
      });
    })
    .catch((error) => console.error("Error:", error));
});
