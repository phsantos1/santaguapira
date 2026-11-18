import { SANTA_GUAPIRA } from '../data/establishment';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#25211E] bg-[#0E0D0C] pt-14 pb-24 text-[#B9AFA2] md:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="space-y-3 md:col-span-5">
            <p className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#F5EFE6]">
              {SANTA_GUAPIRA.name}
            </p>
            <p className="text-sm leading-relaxed text-[#9C9286]">
              {SANTA_GUAPIRA.addressFull}
              <br />
              {SANTA_GUAPIRA.specialty}
            </p>
          </div>

          <div className="space-y-2 md:col-span-3">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-[#F5EFE6]">
              Navegação
            </p>
            <ul className="space-y-1.5 text-sm">
              <li>
                <a href="#cardapio" className="hover:text-[#F5EFE6] hover:underline">
                  Cardápio
                </a>
              </li>
              <li>
                <a href="#delivery" className="hover:text-[#F5EFE6] hover:underline">
                  Delivery
                </a>
              </li>
              <li>
                <a href="#salao" className="hover:text-[#F5EFE6] hover:underline">
                  Salão
                </a>
              </li>
              <li>
                <a href="#instagram" className="hover:text-[#F5EFE6] hover:underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-[#F5EFE6] hover:underline">
                  Localização
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2 md:col-span-4">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-[#F5EFE6]">
              Canais Oficiais
            </p>
            <ul className="space-y-1.5 text-sm">
              <li>
                <a
                  href={SANTA_GUAPIRA.links.ifood}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5EFE6] hover:underline"
                >
                  Loja Oficial no iFood
                </a>
              </li>
              <li>
                <a
                  href={SANTA_GUAPIRA.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5EFE6] hover:underline"
                >
                  Instagram ({SANTA_GUAPIRA.links.instagramHandle})
                </a>
              </li>
              <li>
                <a
                  href={SANTA_GUAPIRA.links.bio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5EFE6] hover:underline"
                >
                  Link da Bio Oficial
                </a>
              </li>
              <li>
                <a
                  href={SANTA_GUAPIRA.links.mapsRoute}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5EFE6] hover:underline"
                >
                  Rota no Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 space-y-2 border-t border-[#25211E] pt-6 text-xs leading-relaxed text-[#8E8479]">
          <p>{SANTA_GUAPIRA.paletteNotice}</p>
          <p>
            Privacidade (LGPD): este site não coleta dados pessoais nem transmite pedidos; a sacola permanece armazenada apenas localmente no seu navegador.
          </p>
          <p className="pt-2 text-[#CFC6B9]">
            © {currentYear} {SANTA_GUAPIRA.name}. Horários e cardápio sujeitos à confirmação na loja oficial do iFood.
          </p>
        </div>
      </div>
    </footer>
  );
}
