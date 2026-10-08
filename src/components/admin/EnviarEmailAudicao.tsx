import { useEffect, useMemo, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import type { ModeloEmail, Status } from "@/lib/database.types";
import { MODELOS_EMAIL, lacunasPendentes, montarHtml, preencher } from "@/lib/email-audicao";

export interface Destinatario {
  id: string;
  nome: string;
  status: Status;
  /** Título do espetáculo da audição; null no banco de talentos. */
  espetaculo: string | null;
}

/**
 * Envio de e-mail aos aprovados: escolhe o modelo, ajusta o texto, confere
 * a prévia e envia. Nada sai sem a confirmação no botão; trechos entre
 * colchetes ([data], [local]) bloqueiam o envio até serem preenchidos.
 */
export function EnviarEmailAudicao({
  aberto,
  aoFechar,
  destinatarios,
  aoEnviar,
}: {
  aberto: boolean;
  aoFechar: () => void;
  destinatarios: Destinatario[];
  aoEnviar: () => void;
}) {
  const sugerido: ModeloEmail = destinatarios.every((d) => d.status === "Aprovado na 2ª fase")
    ? "fase2"
    : "fase1";
  const [modelo, setModelo] = useState<ModeloEmail>(sugerido);
  const [assunto, setAssunto] = useState(MODELOS_EMAIL[sugerido].assunto);
  const [mensagem, setMensagem] = useState(MODELOS_EMAIL[sugerido].mensagem);
  const [enviando, setEnviando] = useState(false);
  const [falhas, setFalhas] = useState<{ nome: string; erro: string }[]>([]);

  // Cada abertura recomeça do modelo sugerido para a seleção.
  useEffect(() => {
    if (!aberto) return;
    trocarModelo(sugerido);
    setFalhas([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aberto]);

  function trocarModelo(novo: ModeloEmail) {
    setModelo(novo);
    setAssunto(MODELOS_EMAIL[novo].assunto);
    setMensagem(MODELOS_EMAIL[novo].mensagem);
  }

  const lacunas = lacunasPendentes(assunto, mensagem);
  const statusEsperado = MODELOS_EMAIL[modelo].status;
  const foraDoStatus = statusEsperado
    ? destinatarios.filter((d) => d.status !== statusEsperado)
    : [];
  const exemplo = destinatarios[0];
  const previa = useMemo(
    () =>
      exemplo
        ? {
            assunto: preencher(assunto, exemplo),
            html: montarHtml(preencher(mensagem, exemplo)),
          }
        : null,
    [assunto, mensagem, exemplo],
  );

  async function enviar() {
    setEnviando(true);
    setFalhas([]);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const resposta = await fetch("/api/audicoes/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token ?? ""}`,
        },
        body: JSON.stringify({
          ids: destinatarios.map((d) => d.id),
          modelo,
          assunto,
          mensagem,
        }),
      });
      const corpo = (await resposta.json().catch(() => null)) as {
        erro?: string;
        enviados?: number;
        falhas?: { nome: string; erro: string }[];
      } | null;
      if (!resposta.ok) {
        toast.error(corpo?.erro ?? "Não foi possível enviar os e-mails.");
        return;
      }
      const enviados = corpo?.enviados ?? 0;
      if (enviados > 0) {
        toast.success(enviados === 1 ? "1 e-mail enviado." : `${enviados} e-mails enviados.`);
      }
      if (corpo?.falhas?.length) {
        setFalhas(corpo.falhas);
        return;
      }
      aoEnviar();
    } catch {
      toast.error("Falha de conexão. Nenhum e-mail foi confirmado; tente de novo.");
    } finally {
      setEnviando(false);
    }
  }

  const total = destinatarios.length;

  return (
    <Dialog open={aberto} onOpenChange={(v) => !v && !enviando && aoFechar()}>
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Enviar e-mail aos aprovados</DialogTitle>
          <DialogDescription>
            {total === 1 ? "1 pessoa selecionada" : `${total} pessoas selecionadas`}. Cada uma
            recebe o próprio e-mail; menores de idade têm o responsável em cópia, quando o contato
            dele for um e-mail.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email-modelo">Modelo</Label>
              <Select value={modelo} onValueChange={(v) => trocarModelo(v as ModeloEmail)}>
                <SelectTrigger id="email-modelo" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(MODELOS_EMAIL) as ModeloEmail[]).map((m) => (
                    <SelectItem key={m} value={m}>
                      {MODELOS_EMAIL[m].rotulo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="email-assunto">Assunto</Label>
              <Input
                id="email-assunto"
                className="mt-1.5"
                value={assunto}
                maxLength={200}
                onChange={(e) => setAssunto(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email-mensagem">Mensagem</Label>
              <Textarea
                id="email-mensagem"
                className="mt-1.5 min-h-[16rem] font-mono text-sm"
                value={mensagem}
                maxLength={5000}
                onChange={(e) => setMensagem(e.target.value)}
              />
              <p className="mt-1.5 text-xs text-muted-foreground">
                {"{nome}"} vira o primeiro nome e {"{espetaculo}"}, o espetáculo da audição. Deixe
                uma linha em branco entre os parágrafos.
              </p>
            </div>

            {lacunas.length > 0 && (
              <p role="alert" className="rounded-md bg-amber-100 px-3 py-2 text-sm text-amber-900">
                Preencha antes de enviar: {lacunas.join(", ")}.
              </p>
            )}
            {foraDoStatus.length > 0 && (
              <p className="rounded-md bg-sky-100 px-3 py-2 text-sm text-sky-900">
                {foraDoStatus.length === 1
                  ? `1 pessoa selecionada não está como “${statusEsperado}”`
                  : `${foraDoStatus.length} pessoas selecionadas não estão como “${statusEsperado}”`}
                : {foraDoStatus.map((d) => d.nome).join(", ")}. Confira se é isso mesmo.
              </p>
            )}
            {falhas.length > 0 && (
              <div role="alert" className="rounded-md bg-rose-100 px-3 py-2 text-sm text-rose-900">
                <p className="font-semibold">Não foram enviados:</p>
                <ul className="mt-1 list-disc pl-5">
                  {falhas.map((f) => (
                    <li key={f.nome}>
                      {f.nome} — {f.erro}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold">
              Prévia{exemplo ? ` — como ${exemplo.nome} vai receber` : ""}
            </p>
            {previa && (
              <div className="mt-1.5 overflow-hidden rounded-md border border-border">
                <p className="border-b border-border bg-muted/50 px-3 py-2 text-sm">
                  <span className="text-muted-foreground">Assunto: </span>
                  {previa.assunto || <em className="text-muted-foreground">sem assunto</em>}
                </p>
                <iframe
                  title="Prévia do e-mail"
                  srcDoc={previa.html}
                  sandbox=""
                  className="h-[26rem] w-full bg-white"
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={aoFechar} disabled={enviando}>
            Cancelar
          </Button>
          <Button
            onClick={() => void enviar()}
            disabled={enviando || lacunas.length > 0 || !assunto.trim() || !mensagem.trim()}
          >
            {enviando ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-1 h-4 w-4" />
            )}
            {enviando
              ? "Enviando…"
              : total === 1
                ? "Enviar para 1 pessoa"
                : `Enviar para ${total} pessoas`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
