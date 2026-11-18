export interface EstablishmentConfig {
  name: string;
  shortName: string;
  neighborhood: string;
  city: string;
  state: string;
  addressFull: string;
  addressStreet: string;
  specialty: string;
  deliveryHours: string;
  diningHours: string;
  hoursDisclaimer: string;
  paletteNotice: string;
  links: {
    ifood: string;
    instagram: string;
    instagramHandle: string;
    bio: string;
    mapsRoute: string;
  };
}

export const SANTA_GUAPIRA: EstablishmentConfig = {
  name: 'Santa Guapira Hamburgueria',
  shortName: 'Santa Guapira',
  neighborhood: 'Tucuruvi',
  city: 'São Paulo',
  state: 'SP',
  addressStreet: 'Av. Guapira, 753',
  addressFull: 'Av. Guapira, 753 — Tucuruvi, São Paulo, SP',
  specialty: 'Delivery desde 2020',
  deliveryHours: '17h às 23h45',
  diningHours: '18h às 23h',
  hoursDisclaimer:
    'Horários e informações operacionais fornecidos pela empresa; consulte o iFood para disponibilidade, taxa e prazo de entrega em tempo real.',
  paletteNotice:
    'Direção visual provisória em carvão profundo, creme quente e vermelho vibrante, sujeita ao alinhamento com a identidade oficial da marca.',
  links: {
    ifood:
      'https://www.ifood.com.br/delivery/sao-paulo-sp/santa-guapira-hamburgueria-tucuruvi/2200b468-f4c0-4975-a9f8-ea6004c2ee5e',
    instagram: 'https://www.instagram.com/santaguapira/',
    instagramHandle: '@santaguapira',
    bio: 'https://bit.ly/m/santaguapira',
    mapsRoute:
      'https://www.google.com/maps/search/?api=1&query=Av.+Guapira,+753,+Tucuruvi,+Sao+Paulo,+SP',
  },
};
