import { useCallback, useEffect, useMemo, useState } from 'react';
import { CartItem, MenuAddon, MenuItem } from '../types/menu';
import { buildCartItemKey, parseSafeCartStorage } from '../utils/format';

const CART_STORAGE_KEY = 'santa_guapira_local_cart_v1';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      return parseSafeCartStorage(window.localStorage.getItem(CART_STORAGE_KEY));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignora falhas de cota ou modo privado sem interromper o uso
    }
  }, [items]);

  const addItem = useCallback(
    (menuItem: MenuItem, selectedAddons: MenuAddon[] = [], quantity = 1) => {
      const safeQty = Math.max(1, Math.min(20, Math.floor(quantity)));
      const key = buildCartItemKey(menuItem.id, selectedAddons);

      setItems((prev) => {
        const existingIndex = prev.findIndex((i) => i.cartItemId === key);
        if (existingIndex >= 0) {
          return prev.map((item, idx) =>
            idx === existingIndex
              ? { ...item, quantity: Math.min(99, item.quantity + safeQty) }
              : item
          );
        }

        const newEntry: CartItem = {
          cartItemId: key,
          menuItemId: menuItem.id,
          name: menuItem.name,
          unitPrice: menuItem.price,
          quantity: safeQty,
          addons: selectedAddons,
          isPlaceholder: menuItem.isPlaceholder,
        };
        return [...prev, newEntry];
      });
    },
    []
  );

  const updateQuantity = useCallback((cartItemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId !== cartItemId) return item;
          const nextQty = item.quantity + delta;
          if (nextQty <= 0) return null;
          return { ...item, quantity: Math.min(99, nextQty) };
        })
        .filter((item): item is CartItem => item !== null)
    );
  }, []);

  const removeItem = useCallback((cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totals = useMemo(() => {
    let totalCount = 0;
    let subtotal = 0;
    for (const item of items) {
      const addonsUnitSum = item.addons.reduce((acc, addon) => acc + addon.price, 0);
      totalCount += item.quantity;
      subtotal += (item.unitPrice + addonsUnitSum) * item.quantity;
    }
    return { totalCount, subtotal };
  }, [items]);

  return {
    items,
    totalCount: totals.totalCount,
    subtotal: totals.subtotal,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };
}
