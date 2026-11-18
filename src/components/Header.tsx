import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { SANTA_GUAPIRA } from '../data/establishment';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_ITEMS = [
  { href: '#cardapio', label: 'Cardápio' },
  { href: '#delivery', label: 'Delivery' },
  { href: '#salao', label: 'Salão' },
  { href: '#instagram', label: 'Instagram' },
  { href: '#localizacao', label: 'Localização' },
];

export function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#25211E] bg-[#0E0D0C]/95 text-[#F5EFE6] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 md:h-16 lg:px-10">
        <a
          href="#topo"
          className="font-display text-2xl font-extrabold uppercase tracking-tight text-[#F5EFE6] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D92B20]"
        >
          {SANTA_GUAPIRA.shortName}
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#CFC6B9]"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#F5EFE6] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D92B20]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Abrir sacola (${cartCount} itens)`}
            className="inline-flex min-h-[38px] items-center gap-2 rounded-md bg-[#D92B20] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#F5EFE6] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#B92017] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5EFE6] sm:min-h-[40px] sm:text-sm"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span>Sacola</span>
            <span className="tabular-nums">({cartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-md border border-[#2D2824] text-[#F5EFE6] md:hidden hover:bg-[#1B1815] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D92B20]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navegação móvel"
          className="border-t border-[#25211E] bg-[#0E0D0C] px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-[44px] items-center rounded-md px-3 font-display text-xl font-bold uppercase tracking-wide text-[#F5EFE6] hover:bg-[#1B1815]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
