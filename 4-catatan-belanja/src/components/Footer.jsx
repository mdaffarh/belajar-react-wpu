export function Footer({ items }) {
  if (items.length === 0) {
    return <footer className="stats">Tidak ada barang di daftar belanjaan</footer>;
  }

  // calculate total items, checked items, and percentage
  const totalItems = items.length;
  const totalChecked = items.filter(item => item.checked).length;
  const percentage = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;
  return <footer className="stats">Ada {totalItems} barang di daftar belanjaan, {totalChecked} barang   sudah dibeli ({percentage}%)</footer>;
}
