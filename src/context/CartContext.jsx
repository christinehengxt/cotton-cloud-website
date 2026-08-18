import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

function lineKey(productId, size, color) {
  return `${productId}::${size}::${color}`;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (product, size, qty = 1, color) => {
    setItems((prev) => {
      const key = lineKey(product.id, size, color);
      const existing = prev.find((i) => lineKey(i.id, i.size, i.color) === key);
      if (existing) {
        return prev.map((i) =>
          lineKey(i.id, i.size, i.color) === key ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        { id: product.id, name: product.name, icon: product.icon, price: product.price, size, color, qty },
      ];
    });
  };

  const removeItem = (id, size, color) => {
    setItems((prev) => prev.filter((i) => lineKey(i.id, i.size, i.color) !== lineKey(id, size, color)));
  };

  const clearCart = () => setItems([]);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);

  const value = { items, addItem, removeItem, clearCart, count, total };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
