import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/audicoes")({
  head: () => ({ meta: [
    { title: "Audições — Instituto Cultural Sabá" },
    { name: "description", content: "Inscreva-se para as audições do Instituto Cultural Sabá." },
    { property: "og:title", content: "Audições — Instituto Cultural Sabá" },
  ]}),
  component: Audicoes,
});

function Audicoes() {
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);
  const [modalidade, setModalidade] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) { toast.error("É necessário aceitar o consentimento de dados."); return; }
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    const { error } = await supabase.from("auditions").insert({
      nome: String(data.nome), email: String(data.email), whatsapp: String(data.whatsapp),
      idade: Number(data.idade), cidade: String(data.cidade), modalidade: modalidade || null,
      experiencia: String(data.experiencia || "") || null, portfolio: String(data.portfolio || "") || null,
      mensagem: String(data.mensagem || "") || null,
    });
    if (error) { toast.error("Não foi possível enviar sua inscrição. Tente novamente."); return; }
    form.reset();
    setSent(true);
    toast.success("Inscrição enviada com sucesso.");
  }

  if (sent) {
    return (
      <Section>
        <div className="max-w-xl mx-auto text-center p-10 rounded-xl border border-border bg-card">
          <CheckCircle2 className="h-10 w-10 text-primary mx-auto" />
          <h2 className="mt-4 text-3xl">Inscrição recebida!</h2>
          <p className="mt-3 text-muted-foreground">Obrigado por se inscrever. A equipe do Instituto Cultural Sabá entrará em contato pelo e-mail informado.</p>
          <Button className="mt-6" onClick={() => setSent(false)}>Fazer nova inscrição</Button>
        </div>
      </Section>
    );
  }

  return (
    <Section eyebrow="Audições" title="Faça sua inscrição." subtitle="O elenco do Ballet Dom Quixote será formado por bailarinos profissionais selecionados por audição pública e convidados de renome internacional.">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-5 text-muted-foreground leading-relaxed">
          <p>Este formulário registra seu interesse em participar das próximas audições do Instituto Cultural Sabá.</p>
          <ul className="space-y-2 text-sm">
            <li>· Seleção de elenco por audição pública</li>
            <li>· Produção prevista para Belo Horizonte</li>
            <li>· Informações de data e critérios serão comunicadas pela equipe</li>
          </ul>
          <p className="text-sm">A inscrição não substitui um edital ou convocação oficial; a equipe entrará em contato caso haja uma etapa compatível com o seu perfil.</p>
        </div>

        <Card className="lg:col-span-3 p-8">
          <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
            <Field label="Nome completo" name="nome" required />
            <Field label="E-mail" name="email" type="email" required />
            <Field label="WhatsApp" name="whatsapp" required />
            <Field label="Idade" name="idade" type="number" required />
            <Field label="Cidade" name="cidade" required />
            <div>
              <Label className="mb-2 block text-sm">Modalidade artística</Label>
              <Select value={modalidade} onValueChange={setModalidade}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {["Dança contemporânea","Dança urbana","Balé clássico","Jazz","Afro-brasileira","Dança-teatro","Outra"].map(m => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label className="mb-2 block text-sm">Experiência</Label>
              <Textarea name="experiencia" rows={3} placeholder="Formação, cias, projetos anteriores..." />
            </div>
            <Field label="Link de vídeo ou portfólio" name="portfolio" className="sm:col-span-2" placeholder="https://..." />
            <div className="sm:col-span-2">
              <Label className="mb-2 block text-sm">Mensagem / observações</Label>
              <Textarea name="mensagem" rows={3} />
            </div>
            <label className="sm:col-span-2 flex gap-3 items-start text-sm text-muted-foreground">
              <Checkbox checked={consent} onCheckedChange={(v) => setConsent(!!v)} className="mt-0.5" />
              <span>Autorizo o uso dos meus dados para fins de contato e processo seletivo, conforme LGPD.</span>
            </label>
            <div className="sm:col-span-2">
              <Button type="submit" size="lg" className="w-full sm:w-auto">Enviar inscrição</Button>
            </div>
          </form>
        </Card>
      </div>
    </Section>
  );
}

function Field({ label, name, type = "text", required, className, placeholder }: { label: string; name: string; type?: string; required?: boolean; className?: string; placeholder?: string }) {
  return (
    <div className={className}>
      <Label htmlFor={name} className="mb-2 block text-sm">{label}{required && " *"}</Label>
      <Input id={name} name={name} type={type} required={required} placeholder={placeholder} />
    </div>
  );
}
