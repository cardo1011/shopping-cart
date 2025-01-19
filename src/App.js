import { useState } from "react";
import "./App.css";

let itemsForSale = [
  {
    id: crypto.randomUUID(),
    icon: "📱",
    name: "Iphone",
    price: "$99",
    quantity: 0,
  },
  {
    id: crypto.randomUUID(),
    icon: "💻",
    name: "Laptop",
    price: "$1999",
    quantity: 0,
  },
  {
    id: crypto.randomUUID(),
    icon: "📷",
    name: "Camera",
    price: "$699",
    quantity: 0,
  },
];

export default function App() {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  function addToCart(curItem) {
    // Check if the item already exists in the cart
    const itemFound = itemsInCart.find((item) => item.id === curItem.id);

    if (itemFound) {
      // If the item exists, create a new array with a copy of the item and updated item's quantity
      const updatedItemsInCart = itemsInCart.map(
        (item) =>
          item.id === curItem.id
            ? { ...item, quantity: item.quantity + 1 } // Create a new object with updated quantity
            : item // Leave other items unchanged
      );
      setItemsInCart(updatedItemsInCart); // Update the state with the new array
    } else {
      // If the item doesn't exist, add it to the cart
      setItemsInCart((itemsInCart) => [
        ...itemsInCart,
        { ...curItem, quantity: 1 },
      ]);
    }
  }

  function deductItemQuantity(curItem) {}

  return (
    <div className="main">
      <Merchandise
        onAddToCart={addToCart}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <Cart
        onAddToCart={addToCart}
        itemsInCart={itemsInCart}
        onDeductItemQuantity={deductItemQuantity}
      />
    </div>
  );
}

function Merchandise({ onAddToCart, quantity, setQuantity }) {
  const items = itemsForSale;
  const itemsQuantity = itemsForSale.length;
  return (
    <main className="merch">
      <h1>Ricardo's Shop</h1>

      {itemsQuantity > 0 ? (
        <ul>
          {items.map((item) => (
            <Item
              itemObj={item}
              key={item.id}
              onAddToCart={onAddToCart}
              context="merchandise"
              quantity={quantity}
              setQuantity={setQuantity}
            />
          ))}
        </ul>
      ) : (
        <p>We're fresh out of inventory. Please visit back</p>
      )}
    </main>
  );
}

function Item({
  itemObj,
  onAddToCart,
  context,
  setQuantity,
  onDeductItemQuantity,
}) {
  return (
    <div className="item">
      {context === "merchandise" ? (
        <li>
          <p>{itemObj.icon}</p>
          <p>{itemObj.name}</p>
          <p>{itemObj.price}</p>
          <Button onClick={() => onAddToCart(itemObj)}>Add to Cart</Button>
        </li>
      ) : (
        <li id="in-cart-items">
          <p>{itemObj.icon}</p>
          <p>{itemObj.name}</p>
          <p>{itemObj.price}</p>
          {/* remove the item if quantity === 0 */}
          <div id="inline">
            <Button>-</Button>
            <input
              type="Number"
              value={itemObj.quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Button>+</Button>
          </div>
        </li>
      )}
    </div>
  );
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

// function ShoppingPage() {}

function Cart({ itemsInCart, onAddToCart, onDeductItemQuantity }) {
  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {itemsInCart.map((item) => (
          <Item
            itemObj={item}
            key={item.id}
            onAddToCart={onAddToCart}
            context="cart"
            onDeductItemQuantity={onDeductItemQuantity}
          />
        ))}
      </ul>
    </div>
  );
}
