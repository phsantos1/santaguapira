import { ExternalLink, ShoppingBag } from 'lucide-react';
import { SANTA_GUAPIRA } from '../data/establishment';

interface MobileOrderBarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export function MobileOrderBar({ cartCount, onOpenCart }: MobileOrderBarProps) {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-30 border-t border-[#25211E] bg-[#0E0D0C]/95 px-3 py-2 backdrop-blur-md md:hidden">
      <div className="mx-auto flex h-10 max-w-md items-center gap-2">
        <a
          href={SANTA_GUAPIRA.links.ifood}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-[#D92B20] px-4 text-xs font-bold uppercase tracking-wider text-[#F5EFE6] whitespace-nowrap"
        >
          <span>Pedir no iFood</span>
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>

        <button
          type="button"
          onClick={onOpenCart}
          aria-label={`Abrir sacola (${cartCount} itens)`}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md border border-[#352F2A] bg-[#181512] px-4 text-xs font-bold uppercase tracking-wider text-[#F5EFE6] whitespace-nowrap shrink-0"
        >
          <ShoppingBag className="h-3.5 w-3.5 text-[#D92B20]" aria-hidden="true" />
          <span className="tabular-nums">({cartCount})</span>
        </button>
      </div>
    </div>
  );
}
