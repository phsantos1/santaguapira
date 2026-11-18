import { Clock, ExternalLink, MapPin, Navigation } from 'lucide-react';
import { SANTA_GUAPIRA } from '../data/establishment';
import { Reveal } from './BrandMarks';
import { MediaImage } from './MediaImage';

export function DeliveryAndDining() {
  return (
    <>
      <section
        id="delivery"
        aria-labelledby="delivery-heading"
        className="bg-[#F5EFE6] py-16 text-[#141210] sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <Reveal className="grid grid-cols-1 items-end gap-10 border-b border-[#141210]/15 pb-14 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-7">
              <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-[#D92B20]">
                03 · Delivery Oficial
              </p>
              <h2
                id="delivery-heading"
                className="font-display text-[clamp(2.75rem,6vw,5.25rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-[#141210] [text-wrap:balance]"
              >
                NO TUCURUVI, DO NOSSO BALCÃO ATÉ A SUA PORTA.
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-[#5A524A] sm:text-lg">
                Especialidade em delivery desde 2020. Consulte disponibilidade em tempo real, área de entrega e taxas diretamente na loja da Santa Guapira no iFood.
              </p>
            </div>

            <div className="flex flex-col justify-between gap-6 lg:col-span-5 lg:border-l lg:border-[#141210]/15 lg:pl-10">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5A524A]">
                  <Clock className="h-4 w-4 text-[#D92B20]" aria-hidden="true" />
                  <span>Horário de entrega</span>
                </span>
                <p className="mt-2 font-display text-5xl font-extrabold uppercase tracking-tight text-[#141210] tabular-nums sm:text-6xl">
                  {SANTA_GUAPIRA.deliveryHours}
                </p>
              </div>

              <a
                href={SANTA_GUAPIRA.links.ifood}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-md bg-[#D92B20] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#F5EFE6] transition-colors duration-150 hover:bg-[#B92017] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141210]"
              >
                <span>Pedir pelo iFood</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>

              <p className="text-xs leading-relaxed text-[#5A524A]">
                {SANTA_GUAPIRA.hoursDisclaimer}
              </p>
            </div>
          </Reveal>

          <Reveal
            delayMs={100}
            className="pt-14"
          >
            <div id="salao" className="scroll-mt-20">
              <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-[#D92B20]">
                    04 · Salão Presencial
                  </p>
                  <h2 className="mt-2 font-display text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-[#141210]">
                    PREFERE COMER NA HORA?
                  </h2>
                </div>
                <p className="font-display text-2xl font-bold uppercase tracking-wide text-[#141210] tabular-nums">
                  Salão · {SANTA_GUAPIRA.diningHours}
                </p>
              </div>

              <div className="relative grid grid-cols-1 lg:grid-cols-12 lg:items-center">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-[#141210] lg:col-span-9">
                  <MediaImage
                    src="/src/assets/images/salao_hamburgueria_noturno_1795038464565.jpg"
                    alt="Ambiente noturno conceitual de hamburgueria com mesas de madeira e iluminação quente"
                    darkSurface
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="relative z-10 mt-4 rounded-lg border border-[#141210]/15 bg-[#0E0D0C] p-6 text-[#F5EFE6] sm:p-8 lg:col-span-5 lg:-ml-24 lg:mt-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D92B20]">
                    Atendimento no Local
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-extrabold uppercase leading-none text-[#F5EFE6]">
                    {SANTA_GUAPIRA.addressStreet}
                  </h3>
                  <p className="mt-1 text-sm text-[#CFC6B9]">
                    {SANTA_GUAPIRA.neighborhood}, {SANTA_GUAPIRA.city} — {SANTA_GUAPIRA.state}
                  </p>

                  <dl className="mt-6 space-y-3 border-t border-[#2B2622] pt-5 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="flex items-center gap-2 text-[#9C9286]">
                        <Clock className="h-4 w-4 text-[#D92B20]" aria-hidden="true" />
                        <span>Horário</span>
                      </dt>
                      <dd className="font-semibold text-[#F5EFE6] tabular-nums">
                        {SANTA_GUAPIRA.diningHours}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="flex items-center gap-2 text-[#9C9286]">
                        <MapPin className="h-4 w-4 text-[#D92B20]" aria-hidden="true" />
                        <span>Bairro</span>
                      </dt>
                      <dd className="font-semibold text-[#F5EFE6]">
                        {SANTA_GUAPIRA.neighborhood}
                      </dd>
                    </div>
                  </dl>

                  <a
                    href={SANTA_GUAPIRA.links.mapsRoute}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-[#F5EFE6] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#0E0D0C] transition-colors duration-150 hover:bg-[#EBE2D3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D92B20]"
                  >
                    <Navigation className="h-4 w-4" aria-hidden="true" />
                    <span>Traçar rota no Maps</span>
                  </a>

                  <p className="mt-3 text-[11px] text-[#8E8479]">
                    Imagem conceitual · Substituir por foto oficial do salão
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
