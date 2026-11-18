import { useEffect, useState } from 'react';
import { Check, Minus, Plus, X } from 'lucide-react';
import { MENU_ADDONS } from '../data/menu';
import { MenuAddon, MenuItem } from '../types/menu';
import { formatBRL } from '../utils/format';

interface ProductModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onConfirmAdd: (item: MenuItem, addons: MenuAddon[], quantity: number) => void;
}

export function ProductModal({
  item,
  onClose,
  onConfirmAdd,
}: ProductModalProps) {
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedAddonIds([]);
    setQuantity(1);
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const availableAddons = MENU_ADDONS.filter((addon) =>
    item.availableAddons.includes(addon.id)
  );

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const selectedAddons = availableAddons.filter((addon) =>
    selectedAddonIds.includes(addon.id)
  );

  const unitTotal =
    item.price + selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  const lineTotal = unitTotal * quantity;

  const handleSubmit = () => {
    onConfirmAdd(item, selectedAddons, quantity);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 backdrop-blur-xs sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div className="fixed inset-0" aria-hidden="true" onClick={onClose} />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-xl border border-[#2A2521] bg-[#141210] text-[#F5EFE6] shadow-2xl sm:rounded-xl">
        <div className="flex items-start justify-between gap-4 border-b border-[#25211E] px-6 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9C9286]">
              Catálogo Santa Guapira · Molhos extras opcionais
            </p>
            <h3
              id="product-modal-title"
              className="mt-1 font-display text-2xl font-bold uppercase text-[#F5EFE6]"
            >
              {item.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar detalhes do item"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-[#9C9286] hover:bg-[#221E1A] hover:text-[#F5EFE6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D92B20]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          <p className="text-sm leading-relaxed text-[#CFC6B9]">
            {item.description}
          </p>

          {availableAddons.length > 0 && (
            <div className="mt-6">
              <h4 className="font-display text-lg font-bold uppercase tracking-wide text-[#F5EFE6]">
                Extras disponíveis
              </h4>

              <ul className="mt-3 divide-y divide-[#25211E] rounded-lg border border-[#25211E] bg-[#1A1714]">
                {availableAddons.map((addon) => {
                  const checked = selectedAddonIds.includes(addon.id);
                  return (
                    <li key={addon.id}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={checked}
                        onClick={() => toggleAddon(addon.id)}
                        className="flex min-h-[48px] w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-[#221E1A] focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#D92B20]"
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                              checked
                                ? 'border-[#D92B20] bg-[#D92B20] text-[#F5EFE6]'
                                : 'border-[#4A423A] bg-[#141210]'
                            }`}
                          >
                            {checked && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                          </span>
                          <span className="text-sm font-medium text-[#F5EFE6]">
                            {addon.name}
                          </span>
                        </span>
                        <span className="text-sm font-semibold text-[#CFC6B9] tabular-nums">
                          + {formatBRL(addon.price)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-[#25211E] bg-[#0E0D0C] px-6 py-4">
          <div className="flex items-center rounded-md border border-[#2D2722] bg-[#161412]">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Diminuir quantidade"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-[#F5EFE6] hover:bg-[#221E1A]"
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="min-w-[2.5rem] text-center text-sm font-bold tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(20, q + 1))}
              aria-label="Aumentar quantidade"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-[#F5EFE6] hover:bg-[#221E1A]"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-md bg-[#D92B20] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F5EFE6] whitespace-nowrap transition-colors hover:bg-[#B92017]"
          >
            <span>Adicionar</span>
            <span className="tabular-nums">· {formatBRL(lineTotal)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
