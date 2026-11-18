import { ExternalLink, Instagram, Link2, MapPin, Navigation } from 'lucide-react';
import { SANTA_GUAPIRA } from '../data/establishment';
import { Reveal } from './BrandMarks';

const INSTAGRAM_GALLERY_SLOTS = [
  {
    id: 'ig-01',
    index: '01',
    title: 'Foto oficial autorizada',
    note: 'Espaço reservado para registro real da chapa ou bastidores de @santaguapira.',
  },
  {
    id: 'ig-02',
    index: '02',
    title: 'Bastidores do delivery',
    note: 'Nenhuma publicação ou métrica é simulada sem autorização do perfil.',
  },
  {
    id: 'ig-03',
    index: '03',
    title: 'Novidades no feed',
    note: 'Conecte o feed oficial da Meta ou envie fotografias aprovadas da marca.',
  },
];

export function InstagramAndLocation() {
  return (
    <>
      <section
        id="instagram"
        aria-labelledby="instagram-heading"
        className="bg-[#141210] py-16 text-[#F5EFE6] sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <Reveal className="flex flex-col gap-6 border-b border-[#28231F] pb-10 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-[#D92B20]">
                05 · Social
              </p>
              <h2
                id="instagram-heading"
                className="font-display text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-[#F5EFE6]"
              >
                {SANTA_GUAPIRA.links.instagramHandle}
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-[#B9AFA2] sm:text-base">
                Acompanhe os canais oficiais da Santa Guapira. A galeria abaixo aguarda autorização oficial de imagens para exibição ao vivo.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={SANTA_GUAPIRA.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-md bg-[#D92B20] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F5EFE6] whitespace-nowrap transition-colors hover:bg-[#B92017] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5EFE6]"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                <span>Seguir no Instagram</span>
              </a>

              <a
                href={SANTA_GUAPIRA.links.bio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-md border border-[#352F2A] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F5EFE6] whitespace-nowrap transition-colors hover:border-[#F5EFE6] hover:bg-[#1F1C18] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D92B20]"
              >
                <Link2 className="h-4 w-4" aria-hidden="true" />
                <span>Link da Bio</span>
              </a>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {INSTAGRAM_GALLERY_SLOTS.map((slot) => (
              <div
                key={slot.id}
                className="flex aspect-[4/3] flex-col justify-between rounded-lg border border-dashed border-[#342E28] bg-[#191613] p-6"
              >
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#8E8479]">
                  <span>{slot.index} · {SANTA_GUAPIRA.links.instagramHandle}</span>
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold uppercase text-[#F5EFE6]">
                    {slot.title}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#9C9286]">
                    {slot.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="localizacao"
        aria-labelledby="localizacao-heading"
        className="bg-[#F5EFE6] py-16 text-[#141210] sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-7">
              <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-[#D92B20]">
                06 · Localização
              </p>
              <h2
                id="localizacao-heading"
                className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-[#141210] [text-wrap:balance]"
              >
                {SANTA_GUAPIRA.addressStreet} — {SANTA_GUAPIRA.neighborhood}
              </h2>
              <p className="text-base leading-relaxed text-[#5A524A]">
                São Paulo, SP · Delivery das {SANTA_GUAPIRA.deliveryHours} e salão das {SANTA_GUAPIRA.diningHours}.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
              <a
                href={SANTA_GUAPIRA.links.mapsRoute}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-md bg-[#141210] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#F5EFE6] whitespace-nowrap transition-colors hover:bg-[#2A2521] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D92B20]"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                <span>Abrir rota no Maps</span>
              </a>

              <a
                href={SANTA_GUAPIRA.links.ifood}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-md bg-[#D92B20] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#F5EFE6] whitespace-nowrap transition-colors hover:bg-[#B92017] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141210]"
              >
                <span>Pedir no iFood</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <div className="mt-8 flex items-center gap-2 border-t border-[#141210]/15 pt-5 text-xs text-[#5A524A]">
            <MapPin className="h-4 w-4 shrink-0 text-[#D92B20]" aria-hidden="true" />
            <span>
              {SANTA_GUAPIRA.addressFull} · Canais de telefone/WhatsApp serão exibidos após confirmação oficial.
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
