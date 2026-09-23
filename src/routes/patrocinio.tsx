import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Info } from "lucide-react";
import { supabase, isSupabaseConfigured, SUPABASE_UNAVAILABLE_MESSAGE } from "@/lib/supabase";
import {
  FORM_LIMITS,
  formString,
  isMoney,
  isValidEmail,
  isValidPhone,
  isWithinLength,
} from "@/lib/form-validation";

export const Route = createFileRoute("/patrocinio")({
  head: () => ({
    meta: [
      { title: "Seja patrocinador — Instituto Cultural Sabá" },
      {
        name: "description",
        content: "Apoie o Ballet Dom Quixote por meio da Lei Federal de Incentivo à Cultura.",
      },
    ],
  }),
  component: Patrocinio,
});

const fmtBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 });
const MAX_MONEY = 1_000_000_000;

function Patrocinio() {
  const [tipo, setTipo] = useState<"PF" | "PJ">("PJ");
  const [momentoPF, setMomentoPF] = useState<"ano-base" | "declaracao">("ano-base");
  const [imposto, setImposto] = useState(100000);
  const [interesse, setInteresse] = useState(20000);
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const limitePct = tipo === "PJ" ? 0.04 : momentoPF === "ano-base" ? 0.06 : 0.03;
  const tetoIncentivo = useMemo(() => Math.max(0, imposto) * limitePct, [imposto, limitePct]);
  const incentivoEstimado = Math.min(Math.max(0, interesse), tetoIncentivo);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    if (!isSupabaseConfigured) {
      toast.error(SUPABASE_UNAVAILABLE_MESSAGE);
      return;
    }
    if (!consent) return toast.error("É necessário aceitar o consentimento de dados.");
    const form = e.currentTarget;
    const data = new FormData(form);
    if (formString(data, "website")) return;

    const nome = formString(data, "nome");
    const empresa = formString(data, "empresa");
    const documento = formString(data, "documento");
    const email = formString(data, "email");
    const whatsapp = formString(data, "whatsapp");
    const valor = formString(data, "valor");
    const mensagem = formString(data, "mensagem");
    if (
      !isWithinLength(nome, FORM_LIMITS.name) ||
      !isValidEmail(email) ||
      !isValidPhone(whatsapp)
    ) {
      toast.error("Confira nome, e-mail e WhatsApp antes de enviar.");
      return;
    }
    if (
      !isWithinLength(empresa, FORM_LIMITS.school, 0) ||
      !isWithinLength(documento, FORM_LIMITS.document, 0) ||
      !isWithinLength(mensagem, FORM_LIMITS.message, 0) ||
      !isMoney(valor)
    ) {
      toast.error("Revise os dados do patrocínio e os limites dos campos.");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("sponsorship_leads").insert({
        nome,
        empresa: empresa || null,
        documento: documento || null,
        email,
        whatsapp,
        valor: valor ? Number(valor) : null,
        mensagem: mensagem || null,
        tipo,
      });
      if (error) {
        toast.error("Não foi possível registrar seu interesse. Tente novamente.");
        return;
      }
      form.reset();
      setConsent(false);
      setSent(true);
      toast.success("Recebemos seu interesse. Retornaremos em breve.");
    } catch {
      toast.error("Não foi possível registrar seu interesse. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Section eyebrow="Seja patrocinador" title="Invista em cultura. Amplie oportunidades.">
        <div className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
          <p>
            O projeto{" "}
            <strong className="text-foreground">Espetáculo de Dança: Ballet Dom Quixote</strong>{" "}
            está aprovado e publicado pela Lei Federal de Incentivo à Cultura, sob PRONAC 255925.
            Seu apoio ajuda a realizar uma grande produção, gerar trabalho e oferecer uma sessão
            exclusiva para crianças de escolas públicas.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3 md:items-start">
          {[
            {
              t: "Benefício fiscal",
              d: "Destine parte do Imposto de Renda devido dentro dos limites previstos em lei.",
              c: "bg-saba-pink border-saba-pink md:-translate-y-4",
            },
            {
              t: "Visibilidade de marca",
              d: "Divulgação no site, programa, redes sociais e materiais impressos e digitais.",
              c: "bg-primary border-primary md:translate-y-4",
            },
            {
              t: "Experiência e impacto",
              d: "Ingressos exclusivos, novidades e associação a uma produção cultural com contrapartida social.",
              c: "bg-background border-foreground/20",
            },
          ].map((b, index) => (
            <Card
              key={b.t}
              className={`relative overflow-hidden rounded-[1.5rem] p-8 shadow-[8px_8px_0_var(--foreground)] ${b.c}`}
            >
              <span className="absolute right-5 top-3 font-display text-6xl leading-none text-foreground/15">
                0{index + 1}
              </span>
              <p className="relative eyebrow text-foreground">{b.t}</p>
              <p className="relative mt-8 text-lg leading-snug text-foreground/80">{b.d}</p>
            </Card>
          ))}
        </div>
      </Section>
      <Section tone="muted" eyebrow="Como participar" title="Pessoa física ou pessoa jurídica.">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-8">
            <p className="eyebrow">Pessoa física</p>
            <h3 className="mt-3 text-3xl">Apoie pelo seu Imposto de Renda.</h3>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>· Declaração pelo modelo completo.</li>
              <li>
                · Até 6% do IR devido no ano-base ou até 3% diretamente na declaração, conforme o
                material do projeto.
              </li>
              <li>· Aporte dentro do período de captação e guarda do recibo de mecenato.</li>
              <li>· Incentivo direto à cultura com dedução fiscal prevista em legislação.</li>
            </ul>
          </Card>
          <Card className="p-8">
            <p className="eyebrow">Pessoa jurídica</p>
            <h3 className="mt-3 text-3xl">Fortaleça sua marca e a cultura.</h3>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>· Empresas tributadas pelo lucro real podem destinar até 4% do IR devido.</li>
              <li>· Aporte dentro do período de captação e registro do recibo de mecenato.</li>
              <li>· Exposição de marca e fortalecimento da imagem institucional.</li>
              <li>· Participação em uma iniciativa cultural com impacto social positivo.</li>
            </ul>
          </Card>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          A aplicação dos incentivos deve ser validada com a equipe contábil ou fiscal responsável.
        </p>
      </Section>
      <Section eyebrow="Simulador informativo" title="Calcule uma estimativa do incentivo.">
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="p-8 space-y-6">
            <div>
              <Label className="mb-3 block">Tipo de patrocinador</Label>
              <RadioGroup
                value={tipo}
                onValueChange={(v) => setTipo(v as "PF" | "PJ")}
                className="flex gap-6"
              >
                <label className="flex items-center gap-2">
                  <RadioGroupItem value="PF" /> Pessoa física
                </label>
                <label className="flex items-center gap-2">
                  <RadioGroupItem value="PJ" /> Pessoa jurídica
                </label>
              </RadioGroup>
            </div>
            {tipo === "PF" && (
              <div>
                <Label className="mb-3 block">Momento da destinação</Label>
                <RadioGroup
                  value={momentoPF}
                  onValueChange={(v) => setMomentoPF(v as "ano-base" | "declaracao")}
                  className="flex flex-col gap-2"
                >
                  <label className="flex items-center gap-2">
                    <RadioGroupItem value="ano-base" /> Durante o ano-base (até 6%)
                  </label>
                  <label className="flex items-center gap-2">
                    <RadioGroupItem value="declaracao" /> Na declaração (até 3%)
                  </label>
                </RadioGroup>
              </div>
            )}
            <div>
              <Label className="mb-2 block">Imposto de Renda devido estimado (R$)</Label>
              <Input
                type="number"
                min="0"
                max={MAX_MONEY}
                step="0.01"
                value={imposto}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setImposto(Number.isFinite(value) ? Math.min(Math.max(0, value), MAX_MONEY) : 0);
                }}
              />
            </div>
            <div>
              <Label className="mb-2 block">Valor que deseja destinar (R$)</Label>
              <Input
                type="number"
                min="0"
                max={MAX_MONEY}
                step="0.01"
                value={interesse}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setInteresse(
                    Number.isFinite(value) ? Math.min(Math.max(0, value), MAX_MONEY) : 0,
                  );
                }}
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Limite usado nesta estimativa: {(limitePct * 100).toFixed(0)}% do IR devido.
              </p>
            </div>
          </Card>
          <Card className="border-foreground/20 bg-saba-pink p-8 text-foreground shadow-[8px_8px_0_var(--foreground)]">
            <p className="eyebrow text-primary">Resultado estimado</p>
            <div className="mt-6 space-y-4">
              <Row label="Teto permitido" value={fmtBRL(tetoIncentivo)} />
              <Row label="Valor informado" value={fmtBRL(interesse)} />
              <Row label="Incentivo estimado" value={fmtBRL(incentivoEstimado)} highlight />
              <Row
                label="Valor acima do limite"
                value={fmtBRL(Math.max(0, interesse - incentivoEstimado))}
              />
            </div>
            <div className="mt-6 flex gap-2 text-xs leading-relaxed text-foreground/70">
              <Info className="h-4 w-4 shrink-0 text-primary" />
              Esta é uma simulação informativa, baseada nos percentuais descritos no material.
              Confirme a elegibilidade e a dedução com sua assessoria contábil.
            </div>
          </Card>
        </div>
      </Section>
      <Section tone="muted" eyebrow="Reconhecimento" title="A arte agradece o seu patrocínio.">
        <p className="max-w-2xl text-muted-foreground">
          Conheça a empresa já citada como patrocinadora master e veja como sua marca pode
          participar deste movimento.
        </p>
        <Button asChild className="mt-6">
          <Link to="/patrocinadores">Ver patrocinadores</Link>
        </Button>
      </Section>
      <Section eyebrow="Fale conosco" title="Vamos conversar sobre patrocínio.">
        {sent ? (
          <div className="max-w-xl rounded-xl border border-border bg-card p-10 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
            <h3 className="mt-4 text-2xl">Interesse registrado</h3>
            <p className="mt-3 text-muted-foreground">
              Nossa equipe entrará em contato para dar continuidade à conversa.
            </p>
          </div>
        ) : (
          <Card className="max-w-3xl p-8">
            <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
              <input
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <Field label="Nome" name="nome" required maxLength={FORM_LIMITS.name} />
              <Field label="Empresa" name="empresa" maxLength={FORM_LIMITS.school} />
              <Field label="CNPJ ou CPF" name="documento" maxLength={FORM_LIMITS.document} />
              <Field
                label="E-mail"
                name="email"
                type="email"
                required
                maxLength={FORM_LIMITS.email}
              />
              <Field label="WhatsApp" name="whatsapp" required maxLength={FORM_LIMITS.phone} />
              <Field
                label="Valor de interesse (R$)"
                name="valor"
                type="number"
                min={0}
                max={1000000000}
                step={0.01}
              />
              <div className="sm:col-span-2">
                <Label className="mb-2 block">Mensagem</Label>
                <Textarea name="mensagem" rows={4} maxLength={FORM_LIMITS.message} />
              </div>
              <label className="sm:col-span-2 flex gap-3 text-sm text-muted-foreground">
                <Checkbox checked={consent} onCheckedChange={(v) => setConsent(!!v)} />
                Autorizo o uso dos meus dados para contato institucional, conforme LGPD.
              </label>
              <div className="sm:col-span-2">
                <Button type="submit" size="lg" disabled={submitting}>
                  {submitting ? "Enviando…" : "Quero conversar sobre patrocínio"}
                </Button>
              </div>
            </form>
          </Card>
        )}
      </Section>
    </>
  );
}
function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-foreground/15 pb-3">
      <span className="text-sm text-foreground/70">{label}</span>
      <span
        className={highlight ? "font-display text-3xl text-primary" : "text-lg text-foreground"}
      >
        {value}
      </span>
    </div>
  );
}
function Field({
  label,
  name,
  type = "text",
  required,
  maxLength,
  min,
  max,
  step,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div>
      <Label htmlFor={name} className="mb-2 block">
        {label}
        {required && " *"}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
}
