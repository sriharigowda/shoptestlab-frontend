import { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    if (!user) { setItems([]); return; }
    setLoading(true);
    try {
      const { data } = await cartAPI.get();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return false;
    }
    try {
      await cartAPI.add({ productId, quantity });
      await refresh();
      toast.success('Added to cart');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add');
      return false;
    }
  };

  const updateQty = async (id, quantity) => {
    try {
      await cartAPI.update(id, quantity);
      await refresh();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  const removeItem = async (id) => {
    try {
      await cartAPI.remove(id);
      await refresh();
      toast.success('Removed from cart');
    } catch (err) {
      toast.error('Remove failed');
    }
  };

  const clearCart = async () => {
    try {
      await cartAPI.clear();
      setItems([]);
    } catch (err) { /* silent */ }
  };

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = items.reduce((sum, i) => sum + (i.product.price * i.quantity), 0);

  return (
    <CartContext.Provider value={{
      items, loading, cartCount, cartTotal,
      addToCart, updateQty, removeItem, clearCart, refresh
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
