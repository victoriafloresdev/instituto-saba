import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/projeto")({
  beforeLoad: () => { throw redirect({ to: "/sobre" }); },
  component: () => null,
});
