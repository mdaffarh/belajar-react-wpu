import { useState } from "react";

export function Form({ onAddItem }) {
  // state and hooks
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    // guard clause
    if (!name) return;

    const newItem = {
      // if name and value variable is the same you can write it once
      name,
      quantity,
      checked: false,
      id: Date.now()
    };
    onAddItem(newItem);

    console.log(newItem);

    // reset to default
    setName('');
    setQuantity(1);
  }

  // options
  const quantityNum = [...Array(20)].map((_, i) => (
    <option value={i + 1} key={i + 1}>{i + 1}</option>
  ));

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Hari ini belanja apa kita?</h3>
      <div>
        <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
          {quantityNum}
        </select>
        <input type="text" placeholder="nama barang..." value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      {/*  disabled when no name*/}
      <button>Tambah</button>
    </form>
  );
}
