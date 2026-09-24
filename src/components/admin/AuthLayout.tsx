import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Marca } from "@/components/site/Marca";
import { IMAGENS, srcset } from "@/lib/imagens";

interface Props {
  titulo: string;
  descricao?: ReactNode;
  children: ReactNode;
  rodape?: ReactNode;
}

/**
 * Telas de acesso ao painel (entrar, recuperar e redefinir senha).
 * No desktop, o palco à esquerda — a mesma foto e o mesmo traço do site —
 * e o formulário no papel à direita. No celular, só a faixa de palco com a
 * assinatura e o formulário logo abaixo.
 */
export function AuthLayout({ titulo, descricao, children, rodape }: Props) {
  const foto = IMAGENS.arabesque;
  return (
    <div className="papel grid min-h-screen grid-rows-[auto_1fr] lg:grid-cols-[1.1fr_1fr] lg:grid-rows-1">
      <aside className="palco relative isolate flex flex-col justify-between overflow-hidden p-6 lg:p-12">
        <img
          src={`/images/${foto.nome}-1400.webp`}
          srcSet={srcset(foto)}
          sizes="55vw"
          alt=""
          className="absolute inset-0 -z-20 hidden h-full w-full object-cover object-[82%_35%] opacity-55 lg:block"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 hidden h-2/3 bg-gradient-to-t from-palco to-transparent lg:block"
        />
        <span
          aria-hidden="true"
          className="traco pointer-events-none absolute -right-[44%] top-[46%] -z-10 hidden w-[88%] -translate-y-1/2 text-laranja mix-blend-lighten lg:block"
        />

        <Link to="/" className="group inline-flex self-start" aria-label="Voltar para o site">
          <Marca />
        </Link>
        <div className="hidden lg:block">
          <p className="eyebrow suave">Painel administrativo</p>
          <p className="t-titulo mt-3 max-w-[14ch]">
            Os bastidores do <span className="gesto text-laranja">Instituto.</span>
          </p>
        </div>
      </aside>

      <main className="flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="form-editorial w-full max-w-sm">
          <h1 className="t-sub">{titulo}</h1>
          {descricao && <div className="suave mt-2 leading-relaxed">{descricao}</div>}
          <div className="mt-8">{children}</div>
          {rodape && <div className="mt-8 text-[0.9375rem]">{rodape}</div>}
        </div>
      </main>
    </div>
  );
}
