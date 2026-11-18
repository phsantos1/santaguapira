import { CartItem, MenuAddon } from '../types/menu';

const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatBRL(value: number): string {
  if (!Number.isFinite(value) || value < 0) {
    return brlFormatter.format(0);
  }
  return brlFormatter.format(value);
}

/**
 * Sanitiza termo de busca para evitar caracteres de controle e limitar tamanho.
 */
export function sanitizeSearchInput(raw: string): string {
  return raw
    .replace(/[\u0000-\u001F\u007F<>]/g, '')
    .slice(0, 60);
}

/**
 * Valida objetos recuperados do localStorage para prevenir dados malformados.
 */
export function parseSafeCartStorage(rawJson: string | null): CartItem[] {
  if (!rawJson) return [];
  try {
    const parsed: unknown = JSON.parse(rawJson);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((entry): entry is CartItem => {
      if (!entry || typeof entry !== 'object') return false;
      const item = entry as Record<string, unknown>;
      const validAddons =
        Array.isArray(item.addons) &&
        item.addons.every((addon) => {
          if (!addon || typeof addon !== 'object') return false;
          const a = addon as Record<string, unknown>;
          return (
            typeof a.id === 'string' &&
            typeof a.name === 'string' &&
            typeof a.price === 'number' &&
            Number.isFinite(a.price) &&
            a.price >= 0
          );
        });

      return (
        typeof item.cartItemId === 'string' &&
        typeof item.menuItemId === 'string' &&
        typeof item.name === 'string' &&
        typeof item.unitPrice === 'number' &&
        Number.isFinite(item.unitPrice) &&
        item.unitPrice >= 0 &&
        typeof item.quantity === 'number' &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0 &&
        item.quantity <= 99 &&
        typeof item.isPlaceholder === 'boolean' &&
        validAddons
      );
    });
  } catch {
    return [];
  }
}

export function buildCartItemKey(menuItemId: string, addons: MenuAddon[]): string {
  const sortedAddonIds = [...addons].map((a) => a.id).sort().join('|');
  return `${menuItemId}::${sortedAddonIds}`;
}
