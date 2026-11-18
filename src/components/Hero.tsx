import { ArrowDown, ExternalLink } from 'lucide-react';
import { SANTA_GUAPIRA } from '../data/establishment';
import { GuapiraSeal } from './BrandMarks';
import { MediaImage } from './MediaImage';

export function Hero() {
  return (
    <section
      id="topo"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100svh-3.5rem)] flex-col justify-between overflow-hidden bg-[#0E0D0C] text-[#F5EFE6] md:min-h-[calc(100svh-4rem)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <MediaImage
          src="/src/assets/images/hero_campaign_wide_1795038740985.jpg"
          alt="Hambúrguer duplo artesanal da Santa Guapira com queijo cheddar derretido, bacon crocante e pão brioche sob iluminação dramática"
          eager
          darkSurface
          className="h-full w-full object-cover object-[78%_center] sm:object-[70%_center]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0E0D0C] via-[#0E0D0C]/80 to-[#0E0D0C]/25 lg:via-[#0E0D0C]/65 lg:to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0E0D0C] via-transparent to-[#0E0D0C]/35"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pt-12 pb-8 sm:px-6 lg:justify-center lg:px-10 lg:py-16">
        <div className="flex items-end justify-between gap-8">
          <div className="max-w-2xl space-y-5 animate-hero-enter">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#E3D9CB]">
              <span>{SANTA_GUAPIRA.name}</span>
              <span aria-hidden="true"> · </span>
              <span>{SANTA_GUAPIRA.neighborhood}, {SANTA_GUAPIRA.city}</span>
            </p>

            <h1
              id="hero-heading"
              className="font-display text-[clamp(3.5rem,9vw,7.25rem)] font-extrabold uppercase leading-[0.88] tracking-tight text-[#F5EFE6] [text-wrap:balance]"
            >
              A FOME
              <br />
              CHAMOU?
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-[#E3D9CB] sm:text-lg">
              Chapa quente no Tucuruvi desde 2020. Peça pelo iFood das 17h às 23h45 ou chegue junto no salão da Av. Guapira, 753.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 animate-hero-enter-delay">
              <a
                href={SANTA_GUAPIRA.links.ifood}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-md bg-[#D92B20] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-[#F5EFE6] whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#B92017] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5EFE6]"
              >
                <span>Pedir agora</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#cardapio"
                className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-md border border-[#F5EFE6]/35 bg-[#0E0D0C]/60 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-[#F5EFE6] backdrop-blur-xs whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#F5EFE6] hover:bg-[#1A1714] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D92B20]"
              >
                <span>Explorar cardápio</span>
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <p className="text-[11px] text-[#A89E92]">
              Chamada editorial sugerida · Pedidos oficiais via loja no iFood
            </p>
          </div>

          <div className="hidden lg:block shrink-0 pb-2 text-[#F5EFE6]/85">
            <GuapiraSeal className="h-32 w-32" />
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-[#F5EFE6]/15 bg-[#0E0D0C]/85 backdrop-blur-xs">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-4 sm:grid-cols-4 sm:px-6 lg:px-10">
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-wider text-[#9C9286]">
              Delivery
            </dt>
            <dd className="mt-0.5 font-display text-lg font-bold tracking-wide text-[#F5EFE6] tabular-nums sm:text-xl">
              {SANTA_GUAPIRA.deliveryHours}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-wider text-[#9C9286]">
              Salão
            </dt>
            <dd className="mt-0.5 font-display text-lg font-bold tracking-wide text-[#F5EFE6] tabular-nums sm:text-xl">
              {SANTA_GUAPIRA.diningHours}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-wider text-[#9C9286]">
              Endereço
            </dt>
            <dd className="mt-0.5 font-display text-lg font-bold tracking-wide text-[#F5EFE6] sm:text-xl">
              {SANTA_GUAPIRA.addressStreet}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-wider text-[#9C9286]">
              Tucuruvi · SP
            </dt>
            <dd className="mt-0.5 font-display text-lg font-bold tracking-wide text-[#D92B20] sm:text-xl">
              {SANTA_GUAPIRA.specialty}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
