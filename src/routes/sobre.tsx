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

      <Section numero="01" eyebrow="Por que existimos">
        <div>
          <div className="max-w-3xl">
            <p className="t-lide" data-reveal="rise">
              O Instituto nasceu da experiência de Marina Saba ao buscar a própria
              profissionalização: faltavam oportunidades e <em className="gesto">visibilidade</em>{" "}
              para bailarinos brasileiros, num mercado marcado por influências estrangeiras.
            </p>
            <p
              className="suave mt-8 max-w-[60ch] text-[1.0625rem] leading-relaxed"
              data-reveal="rise"
              style={atraso(80)}
            >
              Por isso, o Instituto cria espaço para que jovens artistas se destaquem, recebam
              suporte técnico e emocional e construam carreiras sólidas — contribuindo para o
              crescimento e a valorização da dança nacional.
            </p>
          </div>
        </div>

        <ol className="mt-[var(--cena-curta)] grid gap-x-[var(--calha)] md:grid-cols-3">
          {PREMISSAS.map((premissa, i) => (
            <li
              key={i}
              className="fio border-t pb-4 pt-7"
              data-reveal="rise"
              style={atraso(i * 100)}
            >
              <span className="numeral text-2xl italic">{["i.", "ii.", "iii."][i]}</span>
              <p className="mt-4 text-xl font-semibold leading-snug">{premissa}</p>
            </li>
          ))}
        </ol>
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
            <p className="eyebrow suave flex gap-3" data-reveal="rise">
              <span className="numeral">02</span>
              <span aria-hidden="true">·</span>
              <span>A idealizadora</span>
            </p>
            <h2 className="t-titulo mt-6" data-reveal="rise" style={atraso(80)}>
              Marina Saba
            </h2>
            <p className="t-lide suave mt-6" data-reveal="rise" style={atraso(140)}>
              Bailarina, empresária e advogada. Idealizadora e fundadora do Instituto.
            </p>
            <p className="suave mt-8 max-w-[56ch] leading-relaxed" data-reveal="rise">
              Graduada em Direito e especialista em direito cultural pela PUC Minas, fundou a
              Boutique 48, loja especializada em artigos de dança. Além do ballet clássico, tem
              formação em dança contemporânea, jazz e sapateado irlandês.
            </p>

            <h3 className="eyebrow suave mt-16">Trajetória</h3>
            <dl className="mt-5">
              {TRAJETORIA.map((t, i) => (
                <div
                  key={t.quando}
                  className="fio grid grid-cols-[5.5rem_1fr] gap-x-5 border-t py-5 last:border-b"
                  data-reveal="rise"
                  style={atraso(i * 60)}
                >
                  <dt className="numeral text-[1.6rem] leading-none">{t.quando}</dt>
                  <dd className="suave leading-relaxed">{t.marco}</dd>
                </div>
              ))}
            </dl>

            <h3 className="eyebrow suave mt-16">Papéis</h3>
            <ul className="mt-5 grid gap-6 sm:grid-cols-3">
              {PAPEIS.map((p) => (
                <li key={p.papel} data-reveal="rise">
                  <p className="text-2xl font-semibold italic leading-tight">{p.papel}</p>
                  <p className="suave mt-2 text-sm">
                    {p.obra}, {p.ano}
                  </p>
                </li>
              ))}
            </ul>

            <blockquote
              className="mt-14 font-display text-[clamp(1.4rem,1.1rem+1vw,1.9rem)] font-medium italic leading-snug"
              data-reveal="rise"
            >
              “Dançar é sonhar, viver emoções que só os privilegiados podem sentir.”
            </blockquote>
          </div>
        </div>
      </section>

      <Section
        numero="03"
        eyebrow="Como funciona"
        tone="palco"
        title={
          <>
            A cultura financiada <span className="gesto gesto--luz">por todos.</span>
          </>
        }
        subtitle="O Instituto viabiliza seus projetos por meio das leis de incentivo à cultura. Pela Lei Rouanet — a Lei Federal de Incentivo à Cultura, criada em 1991 —, empresas e pessoas físicas podem destinar parte do imposto de renda devido a projetos aprovados pelo Ministério da Cultura."
      >
        <div className="grid gap-x-[var(--calha)] gap-y-10 md:grid-cols-2">
          {[
            {
              quem: "Empresas",
              quanto: "até 4%",
              como: "do imposto de renda devido, para empresas tributadas pelo lucro real.",
            },
            {
              quem: "Pessoas físicas",
              quanto: "até 6%",
              como: "do imposto de renda devido, para quem declara pelo modelo completo.",
            },
          ].map((item, i) => (
            <div
              key={item.quem}
              className="fio border-t pt-7"
              data-reveal="rise"
              style={atraso(i * 100)}
            >
              <p className="eyebrow suave">{item.quem}</p>
              <p className="numeral mt-4 text-[clamp(3rem,2rem+4vw,5.5rem)] leading-none text-laranja">
                {item.quanto}
              </p>
              <p className="suave mt-4 max-w-[36ch] leading-relaxed">{item.como}</p>
            </div>
          ))}
        </div>
        <div className="mt-14">
          <Link to="/patrocinio" className="chamada chamada--cheia">
            Saiba como patrocinar <span className="seta">→</span>
          </Link>
        </div>
      </Section>
    </>
  );
}
