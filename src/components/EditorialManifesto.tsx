import { ArrowUpRight } from 'lucide-react';
import { SANTA_GUAPIRA } from '../data/establishment';
import { Reveal } from './BrandMarks';
import { MediaImage } from './MediaImage';

export function EditorialManifesto() {
  return (
    <section
      aria-labelledby="manifesto-heading"
      className="bg-[#F5EFE6] py-16 text-[#141210] sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="space-y-8 lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-[#D92B20]">
                01 · Presença Local
              </span>
              <span className="h-px flex-1 bg-[#141210]/15" aria-hidden="true" />
            </div>

            <h2
              id="manifesto-heading"
              className="font-display text-[clamp(2.5rem,5.5vw,4.75rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-[#141210] [text-wrap:balance]"
            >
              DO TUCURUVI PARA A SUA MESA. DIRETO AO PONTO.
            </h2>

            <p className="max-w-xl text-base leading-relaxed text-[#5A524A] sm:text-lg">
              Desde 2020, a Santa Guapira concentra sua operação no delivery pela Zona Norte de São Paulo — e abre as portas do salão na Av. Guapira, 753 para quem quer sair da caixa e comer na hora.
            </p>

            <div className="grid grid-cols-1 gap-6 border-t border-[#141210]/15 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#5A524A]">
                  Canal de Entrega
                </p>
                <p className="mt-1 font-display text-2xl font-bold uppercase text-[#141210]">
                  iFood Oficial · {SANTA_GUAPIRA.deliveryHours}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#5A524A]">
                  Atendimento Presencial
                </p>
                <p className="mt-1 font-display text-2xl font-bold uppercase text-[#141210]">
                  Av. Guapira, 753 · {SANTA_GUAPIRA.diningHours}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <a
                href={SANTA_GUAPIRA.links.ifood}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 border-b-2 border-[#D92B20] pb-1 font-display text-xl font-bold uppercase tracking-wide text-[#141210] transition-colors hover:text-[#D92B20]"
              >
                <span>Ir para a loja no iFood</span>
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </a>

              <a
                href="#salao"
                className="inline-flex min-h-[44px] items-center gap-2 pb-1 font-display text-xl font-bold uppercase tracking-wide text-[#5A524A] transition-colors hover:text-[#141210]"
              >
                <span>Conhecer o salão</span>
              </a>
            </div>
          </Reveal>

          <Reveal delayMs={120} className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[3/4] overflow-hidden rounded-lg bg-[#141210]">
                <MediaImage
                  src="/src/assets/images/editorial_vertical_smash_1795038740692.jpg"
                  alt="Hambúrguer duplo com queijo derretido e crosta caramelizada sobre pedra escura"
                  darkSurface
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-[#5A524A] sm:mt-0 sm:bg-[#F5EFE6] sm:px-5 sm:py-3.5 sm:border sm:border-[#141210]/15 sm:absolute sm:-bottom-5 sm:-left-6">
                <span className="font-display text-base font-bold uppercase tracking-wider text-[#141210]">
                  Tucuruvi · Zona Norte
                </span>
                <span className="ml-4 text-[11px] text-[#5A524A]">
                  Foto ilustrativa editorial
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
