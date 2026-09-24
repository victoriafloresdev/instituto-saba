import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { Abertura } from "@/components/site/Abertura";
import { Foto } from "@/components/site/Foto";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "O Instituto — Instituto Cultural Saba" },
      {
        name: "description",
        content:
          "Conheça o Instituto Cultural Saba, sua idealizadora, Marina Saba, e como o Instituto viabiliza projetos por meio das leis de incentivo à cultura.",
      },
    ],
  }),
  component: Sobre,
});

const atraso = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

// Premissas da idealização, no material oficial do Instituto.
const PREMISSAS = [
  "A arte é um instrumento de transformação social.",
  "A dança pode empoderar jovens, oferecendo suporte técnico e emocional.",
  "As leis de incentivo à cultura viabilizam projetos artísticos e fortalecem as políticas públicas de desenvolvimento cultural.",
];

const TRAJETORIA = [
  {
    quando: "Início",
    marco: "Estudos em Belo Horizonte pela metodologia inglesa da Royal Academy of Dance.",
  },
  { quando: "Aos 14", marco: "Convidada para uma vivência na Escola do Teatro Bolshoi no Brasil." },
  {
    quando: "Aos 15",
    marco: "Representou o Brasil nas finais do Youth America Grand Prix, em Nova York.",
  },
  {
    quando: "2018",
    marco:
      "Primeiro lugar no Tanzolymp, em Berlim, e finalista do World Ballet Competition, entre as 12 melhores.",
  },
  {
    quando: "2022",
    marco: "Indicada como Melhor Bailarina de Minas Gerais pelo festival Arte Minas.",
  },
  { quando: "2023", marco: "Segundo lugar no Tanzolymp, em Berlim." },
];

const PAPEIS = [
  { papel: "Kitri", obra: "Dom Quixote", ano: "2022" },
  { papel: "Giselle", obra: "Giselle", ano: "2023" },
  { papel: "Fada Açucarada", obra: "O Quebra-Nozes", ano: "2021" },
];

const LEI = [
  {
    publico: "Para empresas",
    quem: "Pessoa jurídica",
    quanto: "4%",
    como: "do imposto de renda devido, para empresas tributadas pelo lucro real.",
  },
  {
    publico: "Para pessoas",
    quem: "Pessoa física",
    quanto: "6%",
    como: "do imposto de renda devido, para quem declara pelo modelo completo.",
  },
];

const PARTICIPE = [
  {
    to: "/audicoes",
    publico: "Para bailarinos",
    titulo: "Audições",
    texto:
      "O elenco de cada espetáculo é selecionado em audição pública. Há também um banco de talentos aberto o ano todo.",
    acao: "Ver audições",
  },
  {
    to: "/patrocinio",
    publico: "Para empresas e pessoas",
    titulo: "Patrocínio",
    texto:
      "Pela Lei Rouanet, parte do imposto de renda devido vira apoio direto a uma grande produção de dança.",
    acao: "Como patrocinar",
  },
  {
    to: "/escolas",
    publico: "Para escolas públicas",
    titulo: "Contrapartida social",
    texto: "Um espetáculo exclusivo para crianças de escolas públicas, com transporte e lanche.",
    acao: "Cadastrar escola",
  },
] as const;

function Sobre() {
  return (
    <>
      <Abertura
        eyebrow="O Instituto"
        linhas={[
          "Visibilidade,",
          "formação e",
          <span key="g" className="gesto gesto--luz">
            coragem.
          </span>,
        ]}
        lide="O Instituto Cultural Saba existe para fortalecer a dança no Brasil e revelar jovens talentos do país para o mundo."
        foto="bastidores"
        foco="60% 50%"
      />

      <Section
        numero="01"
        eyebrow="Por que existimos"
        title={
          <>
            Um palco para o <span className="gesto">talento brasileiro.</span>
          </>
        }
        subtitle={
          <>
            O Instituto nasceu da experiência de Marina Saba ao buscar a própria profissionalização:
            faltavam oportunidades e visibilidade para bailarinos brasileiros, num mercado marcado
            por influências estrangeiras.
          </>
        }
      >
        <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed" data-reveal="rise">
          Por isso, o Instituto cria espaço para que jovens artistas se destaquem, recebam suporte
          técnico e emocional e construam carreiras sólidas — contribuindo para o crescimento e a
          valorização da dança nacional.
        </p>

        <h3 className="eyebrow suave mt-[var(--cena-curta)]" data-reveal="rise">
          Em que acreditamos
        </h3>
        <ul className="mt-5 grid gap-5 md:grid-cols-3">
          {PREMISSAS.map((premissa, i) => (
            <li
              key={i}
              className={`flex flex-col rounded-lg p-7 md:p-8 ${
                i === 0 ? "palco" : "fio border bg-[#efe7d8]"
              }`}
              data-reveal="rise"
              style={atraso(i * 90)}
            >
              <span className={`numeral text-3xl leading-none ${i === 0 ? "text-laranja" : ""}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-5 text-xl font-semibold leading-snug">{premissa}</p>
            </li>
          ))}
        </ul>
      </Section>

      <section data-surface="papel" className="papel pb-[var(--cena)]">
        <div className="container-x grid gap-y-14 md:grid-cols-12 md:gap-x-[var(--calha)]">
          <div className="md:col-span-5 md:-ml-[var(--margem)]">
            <div className="md:sticky md:top-24">
              <Foto
                nome="marinaRetrato"
                enquadramento="2 / 3"
                foco="50% 20%"
                sizes="(min-width: 768px) 40vw, 100vw"
                cortina
              />
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <p className="eyebrow suave flex gap-2.5" data-reveal="rise">
              <span className="numeral">02</span>
              <span aria-hidden="true">·</span>
              <span>A idealizadora</span>
            </p>
            <h2 className="t-titulo mt-4" data-reveal="rise" style={atraso(60)}>
              Marina Saba
            </h2>
            <p className="t-lide suave mt-5" data-reveal="rise" style={atraso(120)}>
              Bailarina, empresária e advogada. Idealizadora e fundadora do Instituto.
            </p>

            <div className="fio mt-10 rounded-lg border bg-[#efe7d8] p-6 md:p-7" data-reveal="rise">
              <p className="eyebrow suave">Formação</p>
              <p className="mt-3 leading-relaxed">
                Graduada em Direito e especialista em direito cultural pela PUC Minas, fundou a
                Boutique 48, loja especializada em artigos de dança. Além do ballet clássico, tem
                formação em dança contemporânea, jazz e sapateado irlandês.
              </p>
            </div>

            <h3 className="eyebrow suave mt-14">Trajetória</h3>
            <ol className="mt-5">
              {TRAJETORIA.map((t, i) => (
                <li
                  key={t.quando}
                  className="fio grid grid-cols-[5.5rem_1fr] gap-x-5 border-t py-5 last:border-b"
                  data-reveal="rise"
                  style={atraso(i * 60)}
                >
                  <span className="numeral text-[1.6rem] leading-none text-[#8f3412]">
                    {t.quando}
                  </span>
                  <span className="leading-relaxed">{t.marco}</span>
                </li>
              ))}
            </ol>

            <h3 className="eyebrow suave mt-14">Papéis de destaque</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {PAPEIS.map((p, i) => (
                <li
                  key={p.papel}
                  className="fio rounded-lg border bg-[#efe7d8] p-5"
                  data-reveal="rise"
                  style={atraso(i * 70)}
                >
                  <p className="font-display text-2xl font-semibold italic leading-tight">
                    {p.papel}
                  </p>
                  <p className="suave mt-2 text-sm">
                    {p.obra} · {p.ano}
                  </p>
                </li>
              ))}
            </ul>

            <figure
              className="palco mt-14 rounded-lg p-7 md:p-9"
              data-surface="palco"
              data-reveal="rise"
            >
              <blockquote className="font-display text-[clamp(1.4rem,1.1rem+1vw,1.9rem)] font-medium italic leading-snug">
                <span aria-hidden="true" className="text-laranja">
                  “
                </span>
                Dançar é sonhar, viver emoções que só os privilegiados podem sentir.
                <span aria-hidden="true" className="text-laranja">
                  ”
                </span>
              </blockquote>
              <figcaption className="eyebrow suave mt-5">Marina Saba</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <Section
        numero="03"
        eyebrow="Como o Instituto se financia"
        tone="palco"
        title={
          <>
            A cultura financiada <span className="gesto gesto--luz">por todos.</span>
          </>
        }
        subtitle="O Instituto viabiliza seus projetos por meio das leis de incentivo à cultura. Pela Lei Rouanet — a Lei Federal de Incentivo à Cultura, criada em 1991 —, empresas e pessoas físicas podem destinar parte do imposto de renda devido a projetos aprovados pelo Ministério da Cultura."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {LEI.map((item, i) => (
            <article
              key={item.quem}
              className="flex flex-col rounded-lg bg-[rgb(227_217_199/0.07)] p-7 md:p-9"
              data-reveal="rise"
              style={atraso(i * 100)}
            >
              <p className="eyebrow suave">{item.publico}</p>
              <h3 className="t-sub mt-2">{item.quem}</h3>
              <p className="mt-6 flex items-baseline gap-3">
                <span className="suave text-lg">até</span>
                <span className="numeral text-[clamp(3.2rem,2.2rem+4vw,5.5rem)] leading-none text-laranja">
                  {item.quanto}
                </span>
              </p>
              <p className="suave mt-3 max-w-[36ch] leading-relaxed">{item.como}</p>
            </article>
          ))}
        </div>
        <div className="mt-12">
          <Link to="/patrocinio" className="chamada chamada--cheia">
            Saiba como patrocinar <span className="seta">→</span>
          </Link>
        </div>
      </Section>

      <Section
        numero="04"
        eyebrow="Participe"
        title={
          <>
            Faça parte <span className="gesto">da próxima temporada.</span>
          </>
        }
      >
        <ul className="grid gap-5 md:grid-cols-3">
          {PARTICIPE.map((item, i) => (
            <li
              key={item.to}
              className="fio flex flex-col rounded-lg border bg-[#efe7d8] p-7 md:p-8"
              data-reveal="rise"
              style={atraso(i * 90)}
            >
              <p className="eyebrow suave">{item.publico}</p>
              <h3 className="t-sub mt-3">{item.titulo}</h3>
              <p className="suave mt-3 leading-relaxed">{item.texto}</p>
              <div className="mt-auto pt-8">
                <Link to={item.to} className="link-traco font-semibold">
                  {item.acao} →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
