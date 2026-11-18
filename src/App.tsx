import { useState } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { DeliveryAndDining } from './components/DeliveryAndDining';
import { EditorialManifesto } from './components/EditorialManifesto';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InstagramAndLocation } from './components/InstagramAndLocation';
import { MenuSection } from './components/MenuSection';
import { MobileOrderBar } from './components/MobileOrderBar';
import { ProductModal } from './components/ProductModal';
import { useCart } from './hooks/useCart';
import { MenuAddon, MenuItem } from './types/menu';

export default function App() {
  const {
    items,
    totalCount,
    subtotal,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const handleQuickAdd = (item: MenuItem) => {
    addItem(item, [], 1);
  };

  const handleConfirmCustomAdd = (
    item: MenuItem,
    addons: MenuAddon[],
    quantity: number
  ) => {
    addItem(item, addons, quantity);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0E0D0C] text-[#F5EFE6]">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[#D92B20] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#F5EFE6]"
      >
        Ir para o conteúdo principal
      </a>

      <Header cartCount={totalCount} onOpenCart={() => setIsCartOpen(true)} />

      <main id="conteudo-principal">
        <Hero />
        <EditorialManifesto />
        <MenuSection
          onQuickAdd={handleQuickAdd}
          onSelectForCustomization={(item) => setSelectedItem(item)}
        />
        <DeliveryAndDining />
        <InstagramAndLocation />
      </main>

      <Footer />

      <MobileOrderBar
        cartCount={totalCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <ProductModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onConfirmAdd={handleConfirmCustomAdd}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={items}
        subtotal={subtotal}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
      />
    </div>
  );
}
