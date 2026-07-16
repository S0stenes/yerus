// ============================================================
//  CONFIGURAÇÃO CENTRAL DA LANDING PAGE — YERUS
//  Edite este arquivo para trocar textos, contatos e serviços.
//  Os campos marcados com [PLACEHOLDER] devem ser substituídos.
// ============================================================

export const site = {
  name: 'Yerus',
  tagline: 'Nobody grows alone.',
  description:
    'Especialistas em posicionamento de marca através do Marketing Digital. Transformamos ideias em conteúdo e conteúdo em visibilidade.',
  url: 'https://yerus.com.br',

  // ---- CONTATO [PLACEHOLDER] — troque pelos dados reais ----
  contact: {
    // Somente números, com DDI + DDD. Ex.: 5527999999999
    whatsapp: '5527995267806',
    whatsappMessage: 'Olá! Vim pelo site e gostaria de saber mais sobre os serviços da Yerus.',
    email: 'yerusdev@gmail.com',
    instagram: 'agency_yerus', // sem o @
    city: 'Colatina/ES',
  },
} as const;

// Link de WhatsApp pronto (não precisa editar)
export const whatsappLink = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
  site.contact.whatsappMessage,
)}`;
export const instagramLink = `https://instagram.com/${site.contact.instagram}`;
export const emailLink = `mailto:${site.contact.email}`;

// ------------------------- SERVIÇOS -------------------------
export interface Service {
  id: string;
  index: string;
  title: string;
  short: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: 'audiovisual',
    index: '01',
    title: 'Captação e Edição de Vídeo',
    short: 'Reels e vídeos institucionais',
    description:
      'Gravação e edição com foco nos formatos que mais convertem hoje. Do tratamento até a finalização profissional.',
    features: [
      'Gravação com alinhamento de roteiro',
      'Edição com tratamento profissional',
      'Foco em Reels e institucionais',
      'Revisão pós-entrega inclusa',
    ],
  },
  {
    id: 'trafego',
    index: '02',
    title: 'Gestão de Tráfego Pago',
    short: 'Campanhas que geram resultado',
    description:
      'Serviço mensal e contínuo de criação, otimização e acompanhamento estratégico de campanhas de anúncios no Meta Ads.',
    features: [
      'Criação e configuração de campanhas',
      'Otimização contínua no mês',
      'Relatório mensal em vídeo',
      'Suporte e direcionamento de conteúdo',
    ],
  },
  {
    id: 'landing-page',
    index: '03',
    title: 'Landing Page',
    short: 'Páginas feitas para converter',
    description:
      'Desenvolvimento personalizado e exclusivo, sem templates genéricos. Construída sobre princípios de UI/UX para guiar o visitante até a conversão.',
    features: [
      'Prototipagem completa no Figma',
      'Responsiva em todos os dispositivos',
      'Integrações: formulário e WhatsApp',
      'Otimização de velocidade e SEO',
    ],
  },
  {
    id: 'site-institucional',
    index: '04',
    title: 'Site Institucional',
    short: 'Autoridade e presença digital',
    description:
      'Um site que comunica a força da sua marca com estética sofisticada, navegação fluida e desempenho técnico de alto padrão.',
    features: [
      'Design autêntico e sob medida',
      'Estrutura multipáginas',
      'Performance e SEO desde a base',
      'Auxílio com domínio e hospedagem',
    ],
  },
  {
    id: 'ecommerce',
    index: '05',
    title: 'E-commerce',
    short: 'Sua loja pronta para vender',
    description:
      'Criação e personalização da sua loja virtual, integrada, organizada e pronta para escalar as vendas online.',
    features: [
      'Loja personalizada',
      'Configuração de produtos e pagamentos',
      'Identidade visual aplicada',
      'Pronta para tráfego e conversão',
    ],
  },
];

// ------------------------ DIFERENCIAIS ----------------------
export const differentials = [
  {
    title: 'Autenticidade',
    text: 'Cada entrega é pensada exclusivamente para a sua marca.',
  },
  {
    title: 'Suporte',
    text: 'Acompanhamento próximo e orientação em cada etapa para você entender o processo.',
  },
  {
    title: 'Estratégia',
    text: 'Mais que uma execução, damos o direcionamento certo.',
  },
];

// -------------------------- MÉTRICAS ------------------------
// [PLACEHOLDER] Ajuste os números conforme a realidade da Yerus.
// export const stats = [
//   { value: 60, suffix: '+', label: 'Projetos entregues' },
//   { value: 100, suffix: '%', label: 'Foco em resultado' },
//   { value: 4, suffix: 'x', label: 'Mais visibilidade' },
//   { value: 24, suffix: 'h', label: 'Suporte próximo' },
// ];

// -------------------------- PROCESSO ------------------------
export const processSteps = [
  {
    step: '01',
    title: 'Diagnóstico',
    text: 'Entendemos sua marca, seus objetivos e onde ela precisa chegar.',
  },
  {
    step: '02',
    title: 'Estratégia',
    text: 'Definimos o caminho: conteúdo, tráfego e presença digital sob medida.',
  },
  {
    step: '03',
    title: 'Produção',
    text: 'Colocamos a mão na massa: vídeo, campanhas e desenvolvimento.',
  }, 
  {
    step: '04',
    title: 'Crescimento',
    text: 'Otimização contínua para transformar trabalho bem feito em reconhecimento.',
  },
];

// ------------------------- PORTFÓLIO ------------------------
// [PLACEHOLDER] Substitua pelos cases reais e imagens em /public/og ou /public/hero.
export const portfolio = [
  { title: 'Aruna Gastrô Lounge', category: 'Audiovisual + Tráfego', tag: 'Gastronomia' },
  { title: 'Projeto Marca A', category: 'Landing Page', tag: 'Serviços' },
  { title: 'Projeto Marca B', category: 'E-commerce Nuvemshop', tag: 'Varejo' },
  { title: 'Projeto Marca C', category: 'Site Institucional', tag: 'Corporativo' },
];

// ---------------------------- FAQ ---------------------------
export const faq = [
  {
    q: 'Vocês trabalham com marcas de outras cidades?',
    a: 'Sim. O trabalho online (tráfego, landing pages, sites e e-commerce) atende qualquer lugar. Para captação de vídeo em Colatina o deslocamento está incluso; fora da cidade é orçado conforme a distância.',
  },
  {
    q: 'A hospedagem e o domínio estão inclusos?',
    a: 'Não, são de responsabilidade do cliente, com renovação anual. Mas prestamos todo o auxílio na contratação e configuração, orientando em cada etapa.',
  },
  {
    q: 'Como funciona o tráfego pago?',
    a: 'É um serviço mensal com vigência mínima de 4 meses, período necessário para a plataforma aprender e otimizar as entregas.',
  },
  {
    q: 'Quais as formas de pagamento?',
    a: 'Pix, débito ou dinheiro. Cartão de crédito está sujeito à taxa da maquina de cartão.',
  },
];

// ------------------------ NAVEGAÇÃO -------------------------
export const navLinks = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Processo', href: '#processo' },
  // { label: 'Portfólio', href: '#portfolio' },
  { label: 'FAQ', href: '#faq' },
];
