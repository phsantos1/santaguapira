export type MenuCategoryId =
  | 'hamburgueres'
  | 'combos-promocionais'
  | 'smashs'
  | 'smashs-combo'
  | 'promocao'
  | 'prime'
  | 'prime-combo'
  | 'kids'
  | 'porcoes'
  | 'extra'
  | 'bebidas';

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  description: string;
}

export interface MenuAddon {
  id: string;
  name: string;
  price: number;
  isPlaceholder: boolean;
}

export interface MenuItem {
  id: string;
  category: MenuCategoryId;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  serveNote?: string;
  imageUrl?: string;
  imageAlt: string;
  isPlaceholder: boolean;
  placeholderNote: string;
  availableAddons: string[];
}

export interface CartItem {
  cartItemId: string;
  menuItemId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  addons: MenuAddon[];
  isPlaceholder: boolean;
}

export type CatalogStatus = 'loading' | 'ready' | 'error';
