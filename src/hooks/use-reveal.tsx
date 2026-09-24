import { useEffect } from "react";

const SELETOR = "[data-reveal]:not([data-shown])";

/**
 * Revela os elementos marcados com data-reveal quando entram na tela.
 *
 * Um único IntersectionObserver para o site inteiro, e um MutationObserver
 * que entrega a ele todo elemento novo que aparecer no DOM. Isso importa na
 * navegação sem recarregar: a URL muda antes de a página nova terminar de
 * renderizar (o loader ainda está buscando dados), então procurar os
 * elementos só no momento da troca de rota deixava a página nova invisível.
 *
 * O visual das revelações mora no CSS (styles.css, seção "Movimento").
 */
export function useReveal(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const revelar = (el: Element) => el.setAttribute("data-shown", "");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(SELETOR).forEach(revelar);
      return;
    }

    const io = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          revelar(entrada.target);
          io.unobserve(entrada.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );

    const observar = (raiz: ParentNode) => {
      if (raiz instanceof Element && raiz.matches(SELETOR)) io.observe(raiz);
      raiz.querySelectorAll?.(SELETOR).forEach((el) => io.observe(el));
    };

    observar(document);

    const mo = new MutationObserver((mudancas) => {
      for (const mudanca of mudancas) {
        mudanca.addedNodes.forEach((no) => {
          if (no instanceof Element) observar(no);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, [enabled]);
}
