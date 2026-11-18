import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ExternalLink,
  Info,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { SANTA_GUAPIRA } from '../data/establishment';
import {
  MENU_ADDONS,
  MENU_CATALOG_NOTICE,
  MENU_CATEGORIES,
  MENU_ITEMS,
} from '../data/menu';
import { CatalogStatus, MenuCategoryId, MenuItem } from '../types/menu';
import { formatBRL, sanitizeSearchInput } from '../utils/format';
import { Reveal } from './BrandMarks';
import { MediaImage } from './MediaImage';

interface MenuSectionProps {
  onQuickAdd: (item: MenuItem) => void;
  onSelectForCustomization: (item: MenuItem) => void;
}

const INITIAL_ALL_LIMIT = 12;

export function MenuSection({
  onQuickAdd,
  onSelectForCustomization,
}: MenuSectionProps) {
  const [status, setStatus] = useState<CatalogStatus>('loading');
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<'all' | MenuCategoryId>('hamburgueres');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllItems, setShowAllItems] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const loadCatalog = () => {
    setStatus('loading');
    const timer = window.setTimeout(() => {
      try {
        if (!Array.isArray(MENU_ITEMS)) {
          throw new Error('Catálogo indisponível');
        }
        setItems(MENU_ITEMS);
        setStatus('ready');
      } catch {
        setStatus('error');
      }
    }, 140);

    return () => window.clearTimeout(timer);
  };

  useEffect(() => {
    const cleanup = loadCatalog();
    return cleanup;
  }, []);

  const categoryMap = useMemo(() => {
    const map = new Map<MenuCategoryId, string>();
    MENU_CATEGORIES.forEach((cat) => map.set(cat.id, cat.label));
    return map;
  }, []);

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory =
        normalizedQuery.length > 0 ||
        activeCategory === 'all' ||
        item.category === activeCategory;
      const matchesSearch =
        normalizedQuery.length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchTerm]);

  const handleCategoryChange = (cat: 'all' | MenuCategoryId) => {
    setActiveCategory(cat);
    setShowAllItems(false);
  };

  const handleQuickAddClick = (item: MenuItem) => {
    onQuickAdd(item);
    setRecentlyAddedId(item.id);
    window.setTimeout(() => {
      setRecentlyAddedId((current) => (current === item.id ? null : current));
    }, 1200);
  };

  const isViewingAllUnfiltered =
    activeCategory === 'all' && searchTerm.trim().length === 0;

  const visibleItems = useMemo(() => {
    if (isViewingAllUnfiltered && !showAllItems) {
      return filteredItems.slice(0, INITIAL_ALL_LIMIT);
    }
    return filteredItems;
  }, [filteredItems, isViewingAllUnfiltered, showAllItems]);

  const showSpotlight =
    status === 'ready' &&
    searchTerm.trim() === '' &&
    visibleItems.length > 2;

  const spotlightItem = showSpotlight ? visibleItems[0] : null;
  const gridItems = showSpotlight ? visibleItems.slice(1) : visibleItems;

  return (
    <section
      id="cardapio"
      aria-labelledby="cardapio-heading"
      className="bg-[#0E0D0C] bg-grain-subtle py-16 text-[#F5EFE6] sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal className="flex flex-col gap-6 border-b border-[#25211E] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-[#D92B20]">
              02 · Cardápio Completo
            </p>
            <h2
              id="cardapio-heading"
              className="font-display text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold uppercase leading-[0.94] tracking-tight text-[#F5EFE6] [text-wrap:balance]"
            >
              ESCOLHA SEU BURGER E MONTE O PEDIDO
            </h2>
          </div>

          <a
            href={SANTA_GUAPIRA.links.ifood}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-[#F5EFE6] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0E0D0C] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#EBE2D3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D92B20]"
          >
            <span>Pedir na loja oficial do iFood</span>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>

        <div className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:order-2 lg:w-72 lg:shrink-0">
              <label htmlFor="menu-search" className="sr-only">
                Buscar item no cardápio
              </label>
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#9C9286]"
                aria-hidden="true"
              />
              <input
                id="menu-search"
                type="search"
                value={searchTerm}
                maxLength={60}
                onChange={(e) => setSearchTerm(sanitizeSearchInput(e.target.value))}
                placeholder="Buscar em todo o cardápio..."
                className="min-h-[44px] w-full rounded-lg border border-[#2B2622] bg-[#161412] py-2 pr-3.5 pl-10 text-sm text-[#F5EFE6] placeholder:text-[#8E8479] focus:border-[#D92B20] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D92B20]/40"
              />
            </div>

            <div
              role="tablist"
              aria-label="Filtrar categorias do cardápio"
              className="flex flex-wrap items-center gap-1.5 rounded-lg border border-[#25211E] bg-[#161412] p-1 lg:order-1"
            >
              {MENU_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={searchTerm.trim() === '' && activeCategory === category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`min-h-[38px] rounded-md px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D92B20] ${
                    searchTerm.trim() === '' && activeCategory === category.id
                      ? 'bg-[#D92B20] text-[#F5EFE6]'
                      : 'text-[#B9AFA2] hover:text-[#F5EFE6]'
                  }`}
                >
                  {category.label}
                </button>
              ))}
              <button
                type="button"
                role="tab"
                aria-selected={searchTerm.trim() === '' && activeCategory === 'all'}
                onClick={() => handleCategoryChange('all')}
                className={`min-h-[38px] rounded-md px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D92B20] ${
                  searchTerm.trim() === '' && activeCategory === 'all'
                    ? 'bg-[#D92B20] text-[#F5EFE6]'
                    : 'text-[#B9AFA2] hover:text-[#F5EFE6]'
                }`}
              >
                Todos ({items.length})
              </button>
            </div>
          </div>

          {searchTerm.trim().length > 0 && (
            <p className="text-xs text-[#9C9286]">
              Exibindo {filteredItems.length} resultado(s) em todo o cardápio para “{searchTerm.trim()}”.
            </p>
          )}
        </div>

        {status === 'loading' && (
          <div
            aria-live="polite"
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[1, 2, 3].map((slot) => (
              <div
                key={slot}
                className="overflow-hidden rounded-lg border border-[#25211E] bg-[#161412] p-4"
              >
                <div className="aspect-[4/3] w-full animate-pulse rounded bg-[#221E1A]" />
                <div className="mt-4 h-4 w-24 animate-pulse rounded bg-[#221E1A]" />
                <div className="mt-2 h-6 w-3/4 animate-pulse rounded bg-[#221E1A]" />
              </div>
            ))}
          </div>
        )}

        {status === 'error' && (
          <div
            role="alert"
            className="mt-10 flex flex-col items-start gap-4 rounded-lg border border-[#5B2622] bg-[#181312] p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#D92B20]" aria-hidden="true" />
              <div>
                <h3 className="font-display text-2xl font-bold uppercase text-[#F5EFE6]">
                  Erro ao carregar o cardápio
                </h3>
                <p className="mt-1 text-sm text-[#CFC6B9]">
                  Tente recarregar ou acesse diretamente a loja oficial no iFood.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={loadCatalog}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#F5EFE6] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#0E0D0C] hover:bg-[#EBE2D3]"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              <span>Recarregar</span>
            </button>
          </div>
        )}

        {status === 'ready' && filteredItems.length === 0 && (
          <div className="mt-10 rounded-lg border border-[#25211E] bg-[#161412] p-10 text-center">
            <p className="font-display text-3xl font-bold uppercase text-[#F5EFE6]">
              Nenhum item encontrado
            </p>
            <p className="mt-2 text-sm text-[#B9AFA2]">
              Limpe a busca ou confira todas as opções disponíveis na loja oficial do iFood.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('hamburgueres');
                }}
                className="min-h-[44px] rounded-md border border-[#3B352F] px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#F5EFE6] hover:bg-[#221E1A]"
              >
                Voltar para Hambúrgueres
              </button>
              <a
                href={SANTA_GUAPIRA.links.ifood}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#D92B20] px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#F5EFE6] hover:bg-[#B92017]"
              >
                <span>Abrir iFood oficial</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}

        {status === 'ready' && spotlightItem && (
          <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-lg border border-[#28231F] bg-[#151311] lg:grid-cols-12">
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#1D1A17] lg:col-span-7 lg:aspect-auto lg:min-h-[360px]">
              <MediaImage
                src={spotlightItem.imageUrl}
                alt={spotlightItem.imageAlt}
                darkSurface
                fallbackTitle={spotlightItem.placeholderNote}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-between gap-6 p-6 sm:p-8 lg:col-span-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#D92B20]">
                  <span>{categoryMap.get(spotlightItem.category)}</span>
                  {spotlightItem.serveNote && (
                    <>
                      <span aria-hidden="true"> · </span>
                      <span className="text-[#CFC6B9]">{spotlightItem.serveNote}</span>
                    </>
                  )}
                </p>

                <h3 className="mt-3 font-display text-3xl font-extrabold uppercase leading-none text-[#F5EFE6] sm:text-4xl">
                  {spotlightItem.name}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-[#CFC6B9] sm:text-base">
                  {spotlightItem.description}
                </p>
              </div>

              <div className="space-y-4 border-t border-[#28231F] pt-5">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-display text-3xl font-bold text-[#F5EFE6] tabular-nums">
                      {formatBRL(spotlightItem.price)}
                    </span>
                    {spotlightItem.originalPrice && (
                      <span className="text-sm text-[#8E8479] line-through tabular-nums">
                        {formatBRL(spotlightItem.originalPrice)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#9C9286]">Foto ilustrativa</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleQuickAddClick(spotlightItem)}
                    className={`inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5EFE6] ${
                      recentlyAddedId === spotlightItem.id
                        ? 'bg-[#F5EFE6] text-[#0E0D0C]'
                        : 'bg-[#D92B20] text-[#F5EFE6] hover:bg-[#B92017]'
                    }`}
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {recentlyAddedId === spotlightItem.id ? 'Adicionado' : 'Adicionar'}
                    </span>
                  </button>

                  {spotlightItem.availableAddons.length > 0 && MENU_ADDONS.length > 0 && (
                    <button
                      type="button"
                      onClick={() => onSelectForCustomization(spotlightItem)}
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-md border border-[#352F2A] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F5EFE6] whitespace-nowrap shrink-0 transition-colors hover:border-[#F5EFE6] hover:bg-[#1F1C18]"
                    >
                      <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                      <span>Molhos extras</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {status === 'ready' && gridItems.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gridItems.map((item) => {
              const hasAddons = item.availableAddons.length > 0 && MENU_ADDONS.length > 0;
              const isJustAdded = recentlyAddedId === item.id;

              return (
                <article
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-lg border border-[#25211E] bg-[#151311] transition-[transform,border-color] duration-150 hover:-translate-y-0.5 hover:border-[#3D3630]"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#1D1A17]">
                    <MediaImage
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      darkSurface
                      fallbackTitle={item.placeholderNote}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <p className="text-xs font-medium text-[#9C9286]">
                        <span>{categoryMap.get(item.category) ?? item.category}</span>
                        {item.serveNote && (
                          <>
                            <span aria-hidden="true"> · </span>
                            <span className="text-[#CFC6B9]">{item.serveNote}</span>
                          </>
                        )}
                      </p>

                      <h3 className="mt-1.5 font-display text-2xl font-bold uppercase leading-tight text-[#F5EFE6]">
                        {item.name}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-[#B9AFA2]">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-5 border-t border-[#25211E] pt-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-2xl font-bold text-[#F5EFE6] tabular-nums">
                            {formatBRL(item.price)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs text-[#8E8479] line-through tabular-nums">
                              {formatBRL(item.originalPrice)}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#8E8479]">
                          Foto ilustrativa
                        </span>
                      </div>

                      <div className="mt-3.5 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleQuickAddClick(item)}
                          className={`inline-flex min-h-[42px] flex-1 items-center justify-center gap-1.5 rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5EFE6] ${
                            isJustAdded
                              ? 'bg-[#F5EFE6] text-[#0E0D0C]'
                              : 'bg-[#D92B20] text-[#F5EFE6] hover:bg-[#B92017]'
                          }`}
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{isJustAdded ? 'Adicionado' : 'Adicionar'}</span>
                        </button>

                        {hasAddons && (
                          <button
                            type="button"
                            onClick={() => onSelectForCustomization(item)}
                            aria-label={`Selecionar molhos extras para ${item.name}`}
                            className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-md border border-[#352F2A] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#F5EFE6] whitespace-nowrap shrink-0 transition-colors hover:border-[#F5EFE6] hover:bg-[#1F1C18]"
                          >
                            <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Extras</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {status === 'ready' && isViewingAllUnfiltered && filteredItems.length > INITIAL_ALL_LIMIT && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllItems((prev) => !prev)}
              className="inline-flex min-h-[46px] items-center justify-center rounded-md border border-[#352F2A] bg-[#161412] px-7 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F5EFE6] transition-colors hover:border-[#F5EFE6] hover:bg-[#221E1A]"
            >
              {showAllItems
                ? 'Mostrar menos itens'
                : `Ver todos os ${filteredItems.length} itens`}
            </button>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3 rounded-lg border border-[#25211E] bg-[#151311] px-5 py-4 text-xs leading-relaxed text-[#B9AFA2] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2.5 sm:items-center">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#D92B20] sm:mt-0" aria-hidden="true" />
            <p>{MENU_CATALOG_NOTICE.body}</p>
          </div>
          <a
            href={SANTA_GUAPIRA.links.ifood}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-[#F5EFE6] underline underline-offset-4 hover:text-[#D92B20]"
          >
            <span>Abrir iFood</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
