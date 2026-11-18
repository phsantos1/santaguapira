import { useEffect, useState } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  Info,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { SANTA_GUAPIRA } from '../data/establishment';
import { CartItem } from '../types/menu';
import { formatBRL } from '../utils/format';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  subtotal: number;
  onClose: () => void;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  subtotal,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopySummary = async () => {
    if (items.length === 0) return;
    const lines = items.map((item) => {
      const addonsText =
        item.addons.length > 0
          ? ` (+ ${item.addons.map((a) => a.name).join(', ')})`
          : '';
      const unitWithAddons =
        item.unitPrice + item.addons.reduce((s, a) => s + a.price, 0);
      return `${item.quantity}x ${item.name}${addonsText} — ${formatBRL(
        unitWithAddons * item.quantity
      )}`;
    });

    const summary = [
      `Resumo — ${SANTA_GUAPIRA.name}`,
      ...lines,
      `Subtotal dos itens: ${formatBRL(subtotal)}`,
      `Pedido oficial no iFood: ${SANTA_GUAPIRA.links.ifood}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      <div className="fixed inset-0" aria-hidden="true" onClick={onClose} />

      <aside className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-[#25211E] bg-[#141210] text-[#F5EFE6] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#25211E] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#D92B20]" aria-hidden="true" />
            <h2
              id="cart-drawer-title"
              className="font-display text-2xl font-bold uppercase tracking-wide text-[#F5EFE6]"
            >
              Sua Sacola
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar sacola"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-[#9C9286] hover:bg-[#221E1A] hover:text-[#F5EFE6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D92B20]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="border-b border-[#25211E] bg-[#1B1815] px-6 py-3">
          <div className="flex items-start gap-2.5 text-xs leading-relaxed text-[#CFC6B9]">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#D92B20]" aria-hidden="true" />
            <p>
              Esta sacola local organiza sua escolha neste navegador e{' '}
              <strong className="text-[#F5EFE6]">não é sincronizada com o iFood</strong>. Ao finalizar, abra a loja oficial da Santa Guapira no iFood para confirmar disponibilidade e concluir o pedido.
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="h-10 w-10 text-[#5A524A]" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl font-bold uppercase text-[#F5EFE6]">
                Sacola vazia
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#9C9286]">
                Adicione itens do cardápio ou acesse diretamente a loja oficial no iFood.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-[#25211E]">
              {items.map((item) => {
                const addonsUnit = item.addons.reduce((sum, a) => sum + a.price, 0);
                const lineTotal = (item.unitPrice + addonsUnit) * item.quantity;

                return (
                  <li key={item.cartItemId} className="py-4 first:pt-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-bold uppercase text-[#F5EFE6]">
                          {item.name}
                        </h3>
                        {item.addons.length > 0 && (
                          <p className="mt-1 text-xs text-[#9C9286]">
                            Extras: {item.addons.map((a) => a.name).join(', ')}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.cartItemId)}
                        aria-label={`Remover ${item.name}`}
                        className="inline-flex min-h-[36px] min-w-[36px] shrink-0 items-center justify-center rounded-md text-[#9C9286] hover:bg-[#221E1A] hover:text-[#D92B20]"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-md border border-[#2D2722] bg-[#0E0D0C]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                          aria-label={`Diminuir quantidade de ${item.name}`}
                          className="inline-flex min-h-[38px] min-w-[38px] items-center justify-center text-[#F5EFE6] hover:bg-[#1F1C18]"
                        >
                          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                          aria-label={`Aumentar quantidade de ${item.name}`}
                          className="inline-flex min-h-[38px] min-w-[38px] items-center justify-center text-[#F5EFE6] hover:bg-[#1F1C18]"
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      <span className="font-display text-xl font-bold text-[#F5EFE6] tabular-nums">
                        {formatBRL(lineTotal)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-[#25211E] bg-[#0E0D0C] px-6 py-5">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9C9286]">
              Subtotal dos itens
            </span>
            <span className="font-display text-3xl font-extrabold text-[#F5EFE6] tabular-nums">
              {formatBRL(subtotal)}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[#8E8479]">
            Taxas de entrega, cupons e disponibilidade em tempo real são verificados no iFood.
          </p>

          <div className="mt-4 flex flex-col gap-2.5">
            <a
              href={SANTA_GUAPIRA.links.ifood}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-[#D92B20] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#F5EFE6] transition-colors duration-150 hover:bg-[#B92017]"
            >
              <span>Pedir no iFood oficial</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>

            {items.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-md border border-[#2D2722] bg-[#161412] px-3 py-2 text-xs font-semibold text-[#F5EFE6] transition-colors hover:bg-[#221E1A]"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#D92B20]" aria-hidden="true" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copiar resumo</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClearCart}
                  className="inline-flex min-h-[42px] items-center justify-center rounded-md border border-[#2D2722] bg-transparent px-3 py-2 text-xs font-semibold text-[#9C9286] transition-colors hover:bg-[#1E1A17] hover:text-[#F5EFE6]"
                >
                  Limpar sacola
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
