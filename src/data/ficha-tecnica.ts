/**
 * Ficha técnica e conteúdo editorial dos espetáculos, por slug.
 *
 * Fica no código até existir a tabela de elenco no banco (plano de
 * alterações, etapa 2). Textos e créditos vêm do material oficial da
 * contratante (DOCUMENTACAO_PDF_INSTITUTO_SABA.md, seção 5).
 *
 * Decisões da contratante aplicadas aqui:
 * - destaque para os diretores e, em especial, para a remontadora;
 * - NÃO mencionar orquestra nem noite de abertura por enquanto;
 * - o elenco de bailarinos entra depois da audição.
 */
export interface Pessoa {
  nome: string;
  funcao: string;
  resumo: string;
  /** Currículo completo, exibido em "Saiba mais". */
  curriculo?: string[];
  foto?: string;
  /** Texto alternativo da foto. */
  alt?: string;
}

export interface Ficha {
  /** Gênero, na linha de apoio abaixo do título. */
  genero?: string;
  /** Créditos da obra original (música, coreografia). */
  obra?: { rotulo: string; valor: string }[];
  /**
   * PROVISÓRIO: enredo do balé de repertório, de domínio público, até a
   * contratante enviar o texto aprovado da montagem.
   */
  sinopse?: string[];
  duracao?: string;
  remontagem?: Pessoa;
  direcao?: Pessoa[];
  equipe?: Pessoa[];
  numeros?: { valor: string; rotulo: string }[];
  projetos?: { titulo: string; texto: string }[];
  /** Número do projeto na Lei Rouanet; exibe os selos obrigatórios. */
  pronac?: string;
}

const FICHAS: Record<string, Ficha> = {
  "ballet-dom-quixote": {
    genero: "Balé clássico de repertório",
    obra: [
      { rotulo: "Música", valor: "Ludwig Minkus" },
      { rotulo: "Coreografia original", valor: "Marius Petipa" },
    ],
    sinopse: [
      "Em uma praça de Barcelona, Kitri, filha do estalajadeiro Lorenzo, está apaixonada pelo barbeiro Basílio. O pai, porém, quer casá-la com Gamache, um nobre rico e vaidoso.",
      "A chegada de Dom Quixote e de seu fiel escudeiro, Sancho Pança, muda o rumo da história. O cavaleiro sonhador vê em Kitri a sua amada Dulcineia e, entre ciganos, moinhos e um sonho povoado por dríades, acaba ajudando os jovens apaixonados.",
      "Com a música vibrante de Minkus e a coreografia de Petipa, Dom Quixote é um dos balés mais alegres e virtuosos do repertório clássico — uma celebração da dança espanhola, do humor e do amor.",
    ],
    remontagem: {
      nome: "Maria Vakhrusheva",
      funcao: "Remontagem",
      resumo:
        "Formada em Ballet Clássico e Repertório pela Academia Vaganova, foi bailarina do Kirov Ballet, no Mariinsky.",
      curriculo: [
        "Nascida na Rússia, é formada em Ballet Clássico e Repertório pela Academia Vaganova, onde concluiu o bacharelado e o curso de formação para professores e coreógrafos, atuando nessas disciplinas na própria Academia.",
        "Foi bailarina do Kirov Ballet, no Mariinsky; professora e ensaiadora do Ballet Nacional de Israel; e trabalhou na Escola Internacional de Ballet, em Tóquio.",
        "É jurada e professora em festivais de dança no Brasil e no exterior.",
      ],
      foto: "/images/equipe-maria-183.webp",
    },
    direcao: [
      {
        nome: "Tíndaro Silvano",
        funcao: "Direção geral",
        resumo:
          "Coreógrafo com passagem pelo Ballet Guaíra, Ballet Gulbenkian e Ballet do Theatro Municipal.",
        curriculo: [
          "Nascido em Belo Horizonte, em 1956, iniciou os estudos de dança aos 18 anos no Palácio das Artes. Atuou no Ballet Guaíra, no Ballet Gulbenkian e no Ballet do Theatro Municipal.",
          "Como coreógrafo, colaborou com companhias internacionais e criou 15 espetáculos premiados para a Companhia de Dança de Minas Gerais entre 1988 e 1996.",
          "Teve residências artísticas em Paris, dirigiu a Cia de Dança do Palácio das Artes e atua como coreógrafo em instituições de diversos países.",
        ],
        foto: "/images/equipe-tindaro-276.webp",
      },
      {
        nome: "Everson Botelho (Beka)",
        funcao: "Direção artística",
        resumo:
          "Bailarino, professor e diretor, com apresentações em mais de 35 países e passagem pelo Grupo Corpo.",
        curriculo: [
          "Natural de São Paulo, formou-se pela Especial Academia de Ballet. Atuou na Companhia de Dança do Palácio das Artes, na São Paulo Companhia de Dança e no Grupo Corpo.",
          "Apresentou-se em mais de 35 países e participou de eventos como o Festival de Dança de Joinville e o Prix de Lausanne, além de competições em Cuba, Argentina, Japão, Hungria e Bulgária.",
          "Foi diretor artístico do Núcleo de Dança de Barueri. Aperfeiçoa-se na metodologia russa da Escola do Teatro Bolshoi no Brasil, e é jurado e professor convidado em festivais e companhias.",
        ],
        foto: "/images/equipe-everson-600.webp",
      },
    ],
    equipe: [
      {
        nome: "Marina Saba",
        funcao: "Produção e idealização",
        resumo: "Bailarina, empresária e advogada, idealizadora do Instituto Cultural Saba.",
        foto: "/images/marina-sentada-760.webp",
      },
      {
        nome: "Daphne Chequer",
        funcao: "Produção",
        resumo:
          "Há mais de 15 anos na cena cultural de Belo Horizonte, Rio de Janeiro e São Paulo.",
        curriculo: [
          "Tem formação técnica em dança pelo Cefart/Palácio das Artes, graduação em Educação Física e pós-graduação em Gestão de Empreendimentos Culturais pela PUC.",
          "É produtora e diretora artística da Marilu Dias Escola de Dança. Foi assistente de direção nas cerimônias dos Jogos Paralímpicos Rio 2016 e professora e ensaiadora da Sesc Companhia de Dança e da São Paulo Companhia de Dança.",
          "Foi bailarina do Ballet Jovem do Palácio das Artes e da Companhia Mário Nascimento.",
        ],
        foto: "/images/equipe-daphne-600.webp",
      },
      {
        nome: "Renata Araujo",
        funcao: "Equipe artística",
        resumo: "Professora, ensaiadora e coreógrafa, dedicada à formação de novos bailarinos.",
        curriculo: [
          "Iniciou os estudos de ballet em Belo Horizonte e formou-se pela Royal Ballet em 2001. Estudou com Tércia Cançado e Ramon Moreno.",
          "Trabalhou em escolas como Primeiro Ato e Ballet Jovem do Palácio das Artes, como professora, ensaiadora e coreógrafa. Participou do Festival de Dança de Joinville, do Tanzolymp, em Berlim, e do Prix de Lausanne 2020.",
        ],
        foto: "/images/equipe-renata-600.webp",
      },
      {
        nome: "Natalia Samarino",
        funcao: "Historiadora da dança",
        resumo:
          "Bailarina, diretora artística do Pas de Quatre Centro de Dança e autora de Histórias do Ballet.",
      },
    ],
    numeros: [
      { valor: "30+", rotulo: "bailarinos no elenco" },
      { valor: "10+", rotulo: "pessoas na equipe artística" },
      { valor: "40+", rotulo: "pessoas na equipe técnica" },
    ],
    pronac: "255925",
    projetos: [
      {
        titulo: "Contrapartida social",
        texto:
          "Um espetáculo exclusivo para crianças de escolas públicas, com transporte e lanche garantidos.",
      },
    ],
  },
};

FICHAS["o-quebra-nozes"] = {
  genero: "Balé clássico de repertório",
  obra: [
    { rotulo: "Música", valor: "Piotr Ilitch Tchaikovsky" },
    { rotulo: "Coreografia original", valor: "Marius Petipa e Lev Ivanov" },
  ],
  sinopse: [
    "Na véspera de Natal, a pequena Clara ganha de presente um quebra-nozes em forma de soldado. À meia-noite, a sala se transforma: os brinquedos ganham vida e o Quebra-Nozes lidera uma batalha contra o Rei dos Ratos.",
    "Vitorioso, ele se torna um príncipe e leva Clara em uma viagem pela Terra da Neve até o Reino dos Doces, onde a Fada Açucarada os recebe com danças de todos os cantos do mundo.",
  ],
};

export function fichaDoEspetaculo(slug: string): Ficha | undefined {
  return FICHAS[slug];
}
