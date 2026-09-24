/**
 * Catálogo das fotografias do site, geradas a partir do material da
 * contratante em public/images (WebP monocromático, várias larguras).
 *
 * Todas são PROVISÓRIAS: vêm do PDF institucional e ainda aguardam
 * crédito do fotógrafo e autorização de uso (ver PAUTA_REUNIAO_CONTRATANTE,
 * item 3). Quando chegarem as definitivas, basta trocar aqui.
 */
export interface Imagem {
  nome: string;
  larguras: number[];
  /** Proporção largura/altura do arquivo, para reservar espaço (CLS). */
  proporcao: number;
  alt: string;
}

export const IMAGENS = {
  arabesque: {
    nome: "palco-arabesque",
    larguras: [800, 1400, 2400],
    proporcao: 3 / 2,
    alt: "Bailarina de tutu branco em arabesque sobre o palco, com a plateia vazia ao fundo",
  },
  pointe: {
    nome: "palco-pointe",
    larguras: [800],
    proporcao: 788 / 1183,
    alt: "Bailarina na ponta dos pés, braços abertos, sob a luz do palco",
  },
  tutus: {
    nome: "tutus",
    larguras: [1000, 2000],
    proporcao: 3 / 2,
    alt: "Tutus brancos em movimento, desfocados pela velocidade do giro",
  },
  bastidores: {
    nome: "bastidores",
    larguras: [900, 1600],
    proporcao: 3 / 2,
    alt: "Bailarinas de tutu na coxia, à espera da entrada em cena",
  },
  recolhimento: {
    nome: "recolhimento",
    larguras: [900, 1600],
    proporcao: 3 / 2,
    alt: "Bailarina curvada sobre as pernas, em recolhimento, no escuro",
  },
  romantico: {
    nome: "romantico",
    larguras: [900, 1600],
    proporcao: 3 / 2,
    alt: "Bailarina de tutu romântico em pose sobre um praticável no palco escuro",
  },
  estudio: {
    nome: "estudio",
    larguras: [1000, 1600],
    proporcao: 3 / 2,
    alt: "Bailarina contemporânea em espacate no chão do estúdio",
  },
  marinaSentada: {
    nome: "marina-sentada",
    larguras: [760],
    proporcao: 759 / 1138,
    alt: "Retrato de Marina Saba, idealizadora do Instituto, sentada, de terno escuro",
  },
  marinaRetrato: {
    nome: "marina-retrato",
    larguras: [600, 919],
    proporcao: 2 / 3,
    alt: "Retrato de corpo inteiro de Marina Saba, de terno escuro, contra fundo claro",
  },
} satisfies Record<string, Imagem>;

export type NomeImagem = keyof typeof IMAGENS;

export function srcset(img: Imagem): string {
  return img.larguras.map((w) => `/images/${img.nome}-${w}.webp ${w}w`).join(", ");
}

export function srcPadrao(img: Imagem): string {
  const meio = img.larguras[Math.min(1, img.larguras.length - 1)];
  return `/images/${img.nome}-${meio}.webp`;
}

/**
 * Fotos de palco usadas quando um espetáculo ainda não tem imagem própria
 * cadastrada no painel. A escolha é fixa por posição, para a mesma entrada
 * não trocar de foto a cada visita.
 */
export const FOTOS_DE_RESERVA: NomeImagem[] = ["romantico", "recolhimento", "bastidores"];
