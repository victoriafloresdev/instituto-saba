import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { A as ArrowRight, _ as Heart, i as Sparkles, k as Building2, r as Users, v as GraduationCap } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Section } from "./Section-CKYAUsRZ.mjs";
import { t as ImagePlaceholder } from "./ImagePlaceholder-BCLwpPOg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CkuysJjZ.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x pt-16 md:pt-24 pb-20 md:pb-28 grid gap-12 lg:grid-cols-12 lg:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Instituto Cultural Sabá"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-6 text-5xl sm:text-6xl md:text-7xl leading-[0.98] text-foreground",
							children: ["O futuro da dança ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: "text-primary not-italic italic font-display",
								children: "começa aqui."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed",
							children: "Idealizado pela bailarina Marina Sabá, o Instituto Cultural Sabá fortalece a dança no Brasil e cria oportunidades para que jovens talentos sejam reconhecidos e celebrados."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/patrocinio",
										children: ["Seja patrocinador ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									variant: "outline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/audicoes",
										children: "Inscreva-se para audição"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									variant: "ghost",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/programacao",
										children: "Ver programação"
									})
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-5 relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlaceholder, {
							label: "Ensaio",
							aspect: "3/4"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 pt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlaceholder, {
								label: "Cena",
								aspect: "1/1"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlaceholder, {
								label: "Bastidor",
								aspect: "3/4"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute -bottom-6 -left-6 hidden md:block bg-saba-pink text-foreground px-5 py-4 rounded-lg shadow-lg max-w-[220px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-[0.18em] text-primary",
								children: "Temporada"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-xl leading-tight",
								children: "Setembro · 2026"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-foreground/70",
								children: "Belo Horizonte — MG"
							})
						]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			eyebrow: "Nosso propósito",
			title: "Movimento que dá visibilidade, coragem e futuro à dança brasileira.",
			subtitle: "O Instituto Cultural Sabá nasceu da experiência de Marina Sabá e da convicção de que a arte transforma vidas. Criamos espaço para a formação, a profissionalização e a valorização de jovens artistas.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-3 md:items-start",
				children: [
					{
						icon: Sparkles,
						title: "Criação artística",
						text: "Espetáculos que celebram a técnica, a cultura e os talentos da dança brasileira.",
						className: "bg-primary border-primary md:-translate-y-4"
					},
					{
						icon: GraduationCap,
						title: "Formação & oportunidades",
						text: "Suporte técnico e emocional para jovens artistas se desenvolverem profissionalmente.",
						className: "bg-saba-pink border-saba-pink md:translate-y-4"
					},
					{
						icon: Heart,
						title: "Impacto social",
						text: "A arte como instrumento de transformação, acesso e empoderamento.",
						className: "bg-background border-foreground/20"
					}
				].map((f, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: `relative overflow-hidden rounded-[1.5rem] p-8 shadow-[8px_8px_0_var(--foreground)] ${f.className}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "absolute right-5 top-3 font-display text-6xl leading-none text-foreground/15",
							children: ["0", index + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, {
							className: "relative h-7 w-7 text-foreground",
							strokeWidth: 1.5
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "relative mt-8 text-3xl leading-[0.95]",
							children: f.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "relative mt-4 text-sm leading-relaxed text-foreground/75",
							children: f.text
						})
					]
				}, f.title))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			tone: "ink",
			eyebrow: "O espetáculo em números",
			title: "Uma produção que movimenta arte, trabalho e comunidade.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-8 md:grid-cols-4",
				children: [
					{
						n: "30+",
						l: "bailarinos previstos no elenco"
					},
					{
						n: "10+",
						l: "pessoas na equipe artística"
					},
					{
						n: "40+",
						l: "pessoas na equipe técnica"
					},
					{
						n: "1",
						l: "espetáculo exclusivo para escolas públicas"
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-5xl md:text-6xl text-primary",
					children: s.n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-foreground/70",
					children: s.l
				})] }, s.l))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-12 lg:grid-cols-2 lg:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlaceholder, {
				label: "Cena de espetáculo",
				aspect: "4/3"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "eyebrow flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-3.5 w-3.5" }), " Para empresas"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-4xl md:text-5xl",
					children: "Patrocine e conecte sua marca à cultura brasileira."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-muted-foreground leading-relaxed",
					children: "O espetáculo de dança Ballet Dom Quixote está aprovado pela Lei Federal de Incentivo à Cultura. Empresas tributadas pelo lucro real podem destinar até 4% do Imposto de Renda devido para apoiar o projeto."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/patrocinio",
							children: "Quero conversar sobre patrocínio"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/projeto",
							children: "Conhecer o projeto"
						})
					})]
				})
			] })]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			tone: "muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-12 lg:grid-cols-2 lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "order-2 lg:order-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "eyebrow flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3.5 w-3.5" }), " Para artistas"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 text-4xl md:text-5xl",
							children: "Audições abertas para bailarinos e artistas da cena."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-muted-foreground leading-relaxed",
							children: "O elenco do Ballet Dom Quixote será formado por bailarinos profissionais selecionados por audição pública, além de convidados de renome internacional."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/audicoes",
									children: "Fazer inscrição"
								})
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "order-1 lg:order-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlaceholder, {
						label: "Audição",
						aspect: "4/3"
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-12 lg:grid-cols-2 lg:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlaceholder, {
				label: "Oficina em escola",
				aspect: "4/3"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "eyebrow flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-3.5 w-3.5" }), " Para escolas públicas"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-4xl md:text-5xl",
					children: "Cultura viva dentro da sala de aula."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-muted-foreground leading-relaxed",
					children: "Como contrapartida social, o projeto prevê um espetáculo exclusivo para crianças de escolas públicas, com transporte e lanche para os estudantes."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/escolas",
							children: "Cadastrar minha escola"
						})
					})
				})
			] })]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-saba-pink text-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x py-20 md:py-28 text-center max-w-3xl mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Fale com o Instituto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-4xl md:text-6xl leading-tight",
						children: "Vamos construir cultura juntos."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-foreground/70 leading-relaxed",
						children: "Patrocinadores, artistas, escolas e parceiros institucionais: entre em contato e caminhe conosco nesta temporada."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							className: "bg-foreground text-saba-pink hover:bg-foreground/85",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contato",
								children: "Entrar em contato"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							className: "bg-transparent border-foreground/35 text-foreground hover:bg-foreground/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/patrocinio",
								children: "Ser patrocinador"
							})
						})]
					})
				]
			})
		})
	] });
}
//#endregion
export { Home as component };
