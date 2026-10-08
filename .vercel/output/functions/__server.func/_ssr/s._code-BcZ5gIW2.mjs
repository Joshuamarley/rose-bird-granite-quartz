import { i as __toESM } from "../_runtime.mjs";
import { q as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./router-Bg2nttgJ.mjs";
import { i as guide, n as NOTES, t as BY_CODE } from "./market-CWLCJW5m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/s._code-BcZ5gIW2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LevelBar({ lo, hi, px, entryLow, entryHigh }) {
	const span = Math.max(hi - lo, .01);
	const pct = (v) => Math.min(100, Math.max(0, (v - lo) / span * 100));
	const band = entryLow != null && entryHigh != null ? {
		left: pct(entryLow),
		width: Math.max(pct(entryHigh) - pct(entryLow), 1.5)
	} : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-2 rounded-full bg-line",
			children: [band ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-0 h-2 rounded-full bg-brass/50",
				style: {
					left: `${band.left}%`,
					width: `${band.width}%`
				}
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-card bg-cinnabar",
				style: { left: `calc(${pct(px)}% - 6px)` }
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex justify-between font-sans text-xs text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["低 ", lo.toFixed(2)] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["现价 ", px.toFixed(2)] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["高 ", hi.toFixed(2)] })
			]
		})]
	});
}
function StockPage() {
	const { code } = Route.useParams();
	const stock = BY_CODE.get(code);
	const [held, setHeld] = (0, import_react.useState)(false);
	if (!stock) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg px-4 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "没有这只。" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-4 inline-block min-h-11 text-cinnabar",
			children: "返回札记"
		})]
	});
	const g = guide(stock);
	const note = NOTES[stock.code];
	const entry = g.entryLow == null || g.entryHigh == null ? "没有" : `${g.entryLow.toFixed(2)} – ${g.entryHigh.toFixed(2)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-screen max-w-lg px-4 pb-16 pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "inline-flex min-h-11 items-center text-sm text-muted",
				children: "返回札记"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-cinnabar",
				children: [
					note ? `${note.line} · ${note.role}` : "不在昨天的核心池",
					" · ",
					g.pattern
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-serif text-3xl",
				children: stock.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 font-sans text-sm text-muted",
				children: [
					stock.code,
					" · 9月30日收 ",
					stock.px.toFixed(2),
					" · ",
					stock.chg > 0 ? "+" : "",
					stock.chg.toFixed(2),
					"% · 成交 ",
					stock.amt,
					" 亿"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 rounded-2xl border border-line bg-card px-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-2 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "支撑",
								value: g.support == null ? "没有" : g.support.toFixed(2),
								hint: g.support == null ? "全天没有回撤" : "日内最低"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "合适切入",
								value: entry,
								hint: g.where
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "压力",
								value: g.pressure.toFixed(2),
								hint: "日内最高"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelBar, {
						lo: stock.lo,
						hi: stock.hi,
						px: stock.px,
						entryLow: g.entryLow,
						entryHigh: g.entryHigh
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted",
						children: "褐色是切入带，红点是收盘。带在现价下面，就是先别追。"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setHeld(false),
					className: `min-h-11 flex-1 rounded-full text-sm ${held ? "border border-line bg-card" : "bg-ink text-paper"}`,
					children: "还没拿"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setHeld(true),
					className: `min-h-11 flex-1 rounded-full text-sm ${held ? "bg-ink text-paper" : "border border-line bg-card"}`,
					children: "已经拿着"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 space-y-3 text-sm leading-relaxed",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: "现在。 "
					}), held ? g.holding : g.action] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: "不要。 "
					}), g.avoid] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "单只试错半成，确认后长短合计最多 2 成。这是看盘步骤，不是下单指令。行情停在 9 月 30 日收盘。"
					})
				]
			})
		]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-sans text-sm font-semibold leading-tight",
			children: value
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs leading-snug text-brass",
			children: hint
		})
	] });
}
//#endregion
export { StockPage as component };
