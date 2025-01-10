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

  function addToCart(curItem) {
    // taking the current item and appending it to a copy of itemsInCart to keep track of what items are in the cart
    setItemsInCart((itemsInCart) => [...itemsInCart, curItem]);
    //incremements the quantity of the item added to the cart by one
    curItem.quantity += 1;
  }

  return (
    <div className="main">
      <Merchandise onAddToCart={addToCart} />
      <Cart onAddToCart={addToCart} itemsInCart={itemsInCart} />
    </div>
  );
}

function Merchandise({ onAddToCart }) {
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
            />
          ))}
        </ul>
      ) : (
        <p>We're fresh out of inventory. Please visit back</p>
      )}
    </main>
  );
}

function Item({ itemObj, onAddToCart, context }) {
  const [quantity, setQuantity] = useState(1);
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
        <li>
          <p>{itemObj.icon}</p>
          <p>{itemObj.name}</p>
          <p>{itemObj.price}</p>
          {/* remove the item if quantity === 0 */}
          <input
            type="Number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </li>
      )}
    </div>
  );
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

// function ShoppingPage() {}

function Cart({ itemsInCart, onAddToCart }) {
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
          />
        ))}
      </ul>
    </div>
  );
}
