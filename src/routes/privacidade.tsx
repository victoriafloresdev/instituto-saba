import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de privacidade — Instituto Cultural Saba" },
      {
        name: "description",
        content:
          "Como o Instituto Cultural Saba coleta, usa, guarda e protege os dados pessoais enviados pelo site, conforme a LGPD.",
      },
    ],
  }),
  component: Privacidade,
});

// ---------------------------------------------------------------------------
// PENDENTE DE APROVAÇÃO DA CONTRATANTE — revisar antes de publicar:
//  1. Quem é o controlador (o Instituto com CNPJ, ou Marina como pessoa física).
//  2. O e-mail para pedidos sobre dados pessoais.
//  3. Os prazos de guarda de cada tipo de cadastro.
// ---------------------------------------------------------------------------
const CONTROLADOR = "Instituto Cultural Saba";
const CIDADE = "Belo Horizonte, Minas Gerais";
const EMAIL_PRIVACIDADE = "institutoculturalsaba@gmail.com";
const ATUALIZADA_EM = "23 de setembro de 2026";

const PRAZOS = [
  {
    quem: "Inscrições de audição",
    prazo:
      "até o fim da seleção do elenco do espetáculo, e por mais 1 ano para eventuais substituições",
  },
  { quem: "Banco de talentos", prazo: "até 2 anos, ou até você pedir a exclusão" },
  {
    quem: "Interesse de patrocínio",
    prazo:
      "enquanto durar a conversa; se o patrocínio for fechado, pelo prazo exigido pela Lei Rouanet e pela legislação fiscal",
  },
  { quem: "Cadastro de escolas", prazo: "até o fim da temporada do espetáculo" },
  { quem: "Mensagens de contato", prazo: "até 1 ano depois da resposta" },
];

const SECOES = [
  { id: "responsavel", titulo: "Quem cuida dos seus dados" },
  { id: "dados", titulo: "Quais dados coletamos" },
  { id: "uso", titulo: "Para que usamos" },
  { id: "compartilhamento", titulo: "Com quem compartilhamos" },
  { id: "prazos", titulo: "Por quanto tempo guardamos" },
  { id: "menores", titulo: "Crianças e adolescentes" },
  { id: "seguranca", titulo: "Como protegemos" },
  { id: "direitos", titulo: "Seus direitos" },
  { id: "alteracoes", titulo: "Mudanças nesta política" },
];

const FORMULARIOS = [
  {
    nome: "Audições",
    dados:
      "nome, e-mail, WhatsApp, idade, cidade, modalidade, experiência, link de vídeo ou portfólio, disponibilidade para ensaios e mensagem. Para menores de 18 anos, também nome e contato do responsável.",
  },
  {
    nome: "Patrocínio",
    dados: "nome, empresa, CNPJ ou CPF, e-mail, WhatsApp, valor de interesse e mensagem.",
  },
  {
    nome: "Contrapartida social (escolas)",
    dados:
      "nome da escola e cidade; nome, cargo, e-mail e WhatsApp de quem organiza; número estimado de alunos e faixa etária. Não pedimos dados individuais dos alunos.",
  },
  { nome: "Contato", dados: "nome, e-mail, assunto e mensagem." },
];

function Privacidade() {
  return (
    <>
      <section data-surface="palco" className="palco pt-[4.5rem]">
        <div className="container-x pb-[var(--cena-curta)] pt-12 md:pt-16">
          <p className="eyebrow suave">Política de privacidade</p>
          <h1 className="t-titulo mt-4 max-w-[16ch]">
            Seus dados, <span className="gesto gesto--luz">com cuidado.</span>
          </h1>
          <p className="t-lide suave mt-5 max-w-[60ch]">
            Esta página explica, em linguagem simples, como o {CONTROLADOR} usa as informações que
            você envia pelos formulários do site — e como você pode ver, corrigir ou apagar esses
            dados a qualquer momento.
          </p>
          <p className="eyebrow suave mt-8">Atualizada em {ATUALIZADA_EM}</p>
        </div>
      </section>

      <section data-surface="papel" className="papel py-[var(--cena)]">
        <div className="container-x grid gap-12 lg:grid-cols-[15rem_1fr] lg:gap-16">
          <nav aria-label="Nesta página" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="eyebrow suave">Nesta página</p>
              <ol className="mt-4 space-y-2.5 text-[0.9375rem]">
                {SECOES.map((s, i) => (
                  <li key={s.id} className="grid grid-cols-[1.75rem_1fr]">
                    <span className="numeral suave">{String(i + 1).padStart(2, "0")}</span>
                    <a href={`#${s.id}`} className="link-traco">
                      {s.titulo}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="max-w-[68ch] space-y-14">
            <Secao n={1} id="responsavel">
              <p>
                O responsável pelos dados coletados neste site (o “controlador”, nos termos da Lei
                Geral de Proteção de Dados — Lei nº 13.709/2018) é o <strong>{CONTROLADOR}</strong>,
                com sede em {CIDADE}.
              </p>
              <p>
                Para qualquer assunto sobre dados pessoais, escreva para{" "}
                <a href={`mailto:${EMAIL_PRIVACIDADE}`} className="link-traco font-semibold">
                  {EMAIL_PRIVACIDADE}
                </a>
                .
              </p>
            </Secao>

            <Secao n={2} id="dados">
              <p>
                Só coletamos o que você mesmo informa nos formulários. Cada um pede apenas o
                necessário para aquela finalidade:
              </p>
              <dl className="mt-6">
                {FORMULARIOS.map((f) => (
                  <div
                    key={f.nome}
                    className="fio grid gap-1 border-t py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
                  >
                    <dt className="font-semibold">{f.nome}</dt>
                    <dd className="suave leading-relaxed">{f.dados}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6">
                <strong>Navegação.</strong> O site não usa cookies de publicidade nem ferramentas de
                análise de visitas. Como qualquer site, os servidores de hospedagem registram dados
                técnicos de acesso (como endereço IP e tipo de navegador) por segurança. Para exibir
                as fontes tipográficas, o navegador se conecta ao Google Fonts, que também recebe
                esses dados técnicos.
              </p>
            </Secao>

            <Secao n={3} id="uso">
              <ul className="lista-politica">
                <li>
                  <strong>Audições e banco de talentos:</strong> avaliar sua inscrição, entrar em
                  contato sobre a seleção e, no banco de talentos, lembrar de você quando houver uma
                  oportunidade compatível.
                </li>
                <li>
                  <strong>Patrocínio:</strong> conversar sobre o apoio ao projeto e, se o patrocínio
                  for fechado, formalizá-lo e emitir o recibo de mecenato.
                </li>
                <li>
                  <strong>Escolas:</strong> organizar a participação dos alunos na sessão exclusiva
                  da contrapartida social.
                </li>
                <li>
                  <strong>Contato:</strong> responder à sua mensagem.
                </li>
              </ul>
              <p>
                Tratamos esses dados com base no seu <strong>consentimento</strong>, dado na caixa
                de autorização de cada formulário (art. 7º, I, da LGPD), e, no caso do patrocínio,
                também para as etapas que antecedem um contrato com você (art. 7º, V). Não usamos
                seus dados para outras finalidades, não enviamos propaganda sem sua autorização e
                não vendemos dados a ninguém.
              </p>
            </Secao>

            <Secao n={4} id="compartilhamento">
              <p>
                Seus dados só são acessados pela equipe do Instituto e pelos serviços que mantêm o
                site no ar:
              </p>
              <ul className="lista-politica">
                <li>
                  <strong>Supabase</strong>, onde ficam guardados o banco de dados e as imagens do
                  site;
                </li>
                <li>
                  <strong>Vercel</strong>, que hospeda e exibe o site.
                </li>
              </ul>
              <p>
                Esses fornecedores podem manter servidores fora do Brasil. Eles atuam apenas sob
                nossas instruções e oferecem garantias de proteção compatíveis com a LGPD (art. 33).
              </p>
              <p>
                Os dados de quem fecha um patrocínio podem ser informados ao Ministério da Cultura,
                como exige a Lei Rouanet para o registro do recibo de mecenato e a prestação de
                contas do projeto. Fora isso, só compartilhamos dados quando uma lei ou uma ordem
                judicial obrigar.
              </p>
            </Secao>

            <Secao n={5} id="prazos">
              <p>Guardamos seus dados apenas pelo tempo necessário para cada finalidade:</p>
              <dl className="mt-6">
                {PRAZOS.map((p) => (
                  <div
                    key={p.quem}
                    className="fio grid gap-1 border-t py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
                  >
                    <dt className="font-semibold">{p.quem}</dt>
                    <dd className="suave leading-relaxed">{p.prazo}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6">
                Depois desses prazos, os dados são apagados ou anonimizados. Você pode pedir a
                exclusão antes, a qualquer momento.
              </p>
            </Secao>

            <Secao n={6} id="menores">
              <p>
                Inscrições de audição de menores de 18 anos só são aceitas com o nome e o contato de
                um responsável legal e com a autorização dele, como pede a LGPD (art. 14). Se
                percebermos que dados de um menor foram enviados sem essa autorização, eles serão
                apagados.
              </p>
              <p>
                No cadastro de escolas, não pedimos dados dos alunos: apenas o número estimado e a
                faixa etária das turmas.
              </p>
            </Secao>

            <Secao n={7} id="seguranca">
              <p>
                O site usa conexão criptografada (HTTPS). Os dados enviados ficam num banco com
                regras de acesso: o público não consegue ler as inscrições, e só pessoas da equipe
                com login de administrador podem consultá-las no painel.
              </p>
            </Secao>

            <Secao n={8} id="direitos">
              <p>Pela LGPD (art. 18), você pode, a qualquer momento e sem custo:</p>
              <ul className="lista-politica">
                <li>confirmar se temos dados seus e ter acesso a eles;</li>
                <li>corrigir dados incompletos, errados ou desatualizados;</li>
                <li>pedir a exclusão dos seus dados;</li>
                <li>saber com quem compartilhamos seus dados;</li>
                <li>pedir a portabilidade dos dados para outro serviço;</li>
                <li>retirar o seu consentimento — o que não afeta o que já foi feito antes.</li>
              </ul>
              <p>
                Para exercer qualquer um desses direitos, escreva para{" "}
                <a href={`mailto:${EMAIL_PRIVACIDADE}`} className="link-traco font-semibold">
                  {EMAIL_PRIVACIDADE}
                </a>
                . Respondemos em até 15 dias. Se não ficar satisfeito, você também pode procurar a
                Autoridade Nacional de Proteção de Dados (ANPD).
              </p>
            </Secao>

            <Secao n={9} id="alteracoes">
              <p>
                Esta política pode ser atualizada quando o site ou a forma de tratar os dados mudar.
                A data da última atualização fica sempre no topo desta página.
              </p>
              <p className="suave">
                Dúvidas? Fale com a gente pela página de{" "}
                <Link to="/contato" className="link-traco font-semibold">
                  contato
                </Link>
                .
              </p>
            </Secao>
          </article>
        </div>
      </section>
    </>
  );
}

function Secao({ n, id, children }: { n: number; id: string; children: ReactNode }) {
  const titulo = SECOES.find((s) => s.id === id)?.titulo;
  return (
    <section id={id} className="scroll-mt-28">
      <p className="numeral suave text-lg">{String(n).padStart(2, "0")}</p>
      <h2 className="t-sub mt-1">{titulo}</h2>
      <div className="mt-5 space-y-4 text-[1.0625rem] leading-relaxed">{children}</div>
    </section>
  );
}
