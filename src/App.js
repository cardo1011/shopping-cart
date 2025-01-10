import "./App.css";

let itemsForSale = [
  { id: crypto.randomUUID(), icon: "📱", name: "Iphone", price: "$99" },
  { id: crypto.randomUUID(), icon: "💻", name: "Laptop", price: "$1999" },
  { id: crypto.randomUUID(), icon: "📷", name: "Camera", price: "$699" },
];

export default function App() {
  return (
    <div>
      <Merchandise />
    </div>
  );
}

function Merchandise() {
  const items = itemsForSale;
  const itemsQuantity = itemsForSale.length;
  return (
    <main className="merch">
      <h1>Ricardo's Shop</h1>

      {itemsQuantity > 0 ? (
        <ul>
          {items.map((item) => (
            <Item itemObj={item} key={item.id} />
          ))}
        </ul>
      ) : (
        <p>We're fresh out of inventory. Please visit back</p>
      )}
    </main>
  );
}

function Item({ itemObj }) {
  return (
    <div className="item">
      <li>
        <p>{itemObj.icon}</p>
        <p>{itemObj.name}</p>
        <p>{itemObj.price}</p>
      </li>
    </div>
  );
}

function Button({ children }) {
  <button>{children}</button>;
}

// function ShoppingPage() {}

// function Cart(itemCount) {}
