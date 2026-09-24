import { createFileRoute, redirect } from "@tanstack/react-router";

// O elenco passou a viver dentro de cada espetáculo, porque "cada evento
// muda o elenco" (plano de alterações, seção 2). O endereço antigo leva ao
// espetáculo em cartaz em vez de virar um link quebrado.
export const Route = createFileRoute("/elenco")({
  beforeLoad: () => {
    throw redirect({ to: "/espetaculo" });
  },
  component: () => null,
});
