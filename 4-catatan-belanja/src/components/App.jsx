import {useState} from "react";
import { GroceryList } from "./GroceryList";
import { Header } from "./Header";
import { Form } from "./Form";
import { Footer } from "./Footer";

const groceryItems = [
  {
    id: 1,
    name: 'Coffee Latete',
    quantity: 5,
    checked: true
  },
  {
    id: 2,
    name: 'Iced Tea',
    quantity: 2,
    checked: false
  },  {
    id: 3,
    name: 'Milk',
    quantity: 1,
    checked: false
  },
]

// App
export default function App() {
    const [items, setItems] = useState(groceryItems);

    // add item
    function handleAddItem(item) {
        // spread operation
        setItems([...items, item]);
    }

    // delete item
    function handleDeleteItem(id) {
      // buat array baru yang isinya selain array yang didelete
        setItems((items) => items.filter((item) => item.id !== id));
    }

    // checked toggle
    function handleToggleItem(id){
      setItems((items) => items.map((item) => (item.id === id ? {...item, checked: !item.checked} : item)));
    }

    // clear items
    function handleClearItems() {
      // bersihkan semua item
      // setItems([]);

      // filter items yang checked
      setItems((items) => items.filter((item) => !item.checked));
    }

    // return app
  return (
  <div className="app">
    <Header/>
    <Form onAddItem={handleAddItem} />
    <GroceryList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearItems={handleClearItems}/>
    <Footer items={items}/>
  </div>
  );
}


