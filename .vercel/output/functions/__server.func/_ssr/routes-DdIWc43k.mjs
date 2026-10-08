import { i as __toESM } from "../_runtime.mjs";
import { q as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as searchStocks, i as guide, n as NOTES, r as coreStocks } from "./market-CWLCJW5m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DdIWc43k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LINES = [
	"全部",
	"医药",
	"锂电",
	"地产",
	"辅助"
];
function Home() {
	const [line, setLine] = (0, import_react.useState)("全部");
	const [q, setQ] = (0, import_react.useState)("");
	const cores = (0, import_react.useMemo)(() => coreStocks(line), [line]);
	const hits = (0, import_react.useMemo)(() => searchStocks(q), [q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-screen max-w-lg px-4 pb-16 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-sans text-xs tracking-[0.18em] text-muted",
				children: "A股复盘 · 2026-09-30"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-serif text-4xl font-semibold",
				children: "复盘札记"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: "给 10 月 8 日用。第 2 阶段轮动分歧，低仓。医药、锂电、地产是方向。基础 0 到 1 成，单只半成，确认后最多 2 成。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5 rounded-2xl border border-line bg-card px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-lg",
						children: "情绪"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-relaxed",
						children: "弱修复里的分歧。上证 +0.31%，下跌家数仍多。涨停 56，炸板率 18.75%，1 进 2 约 13%。新华传媒 7 板不能当成全面回暖。"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: "价位用的是 9 月 30 日最高、最低、收盘。切入是回撤带，不是叫你在现价买。"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex gap-2 overflow-x-auto pb-1",
				children: LINES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setLine(item),
					className: `min-h-11 shrink-0 rounded-full px-4 text-sm ${item === line ? "bg-ink text-paper" : "border border-line bg-card text-ink"}`,
					children: item
				}, item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-2",
				children: cores.map((s) => {
					const g = guide(s);
					const note = NOTES[s.code];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/s/$code",
						params: { code: s.code },
						className: "mt-3 block rounded-2xl border border-line bg-card px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-cinnabar",
								children: [
									note?.line,
									" · ",
									note?.role,
									" · ",
									g.pattern
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-serif text-xl",
									children: s.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: `font-sans text-sm ${s.chg >= 0 ? "text-cinnabar" : "text-pine"}`,
									children: [
										s.chg > 0 ? "+" : "",
										s.chg.toFixed(2),
										"%"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid grid-cols-3 gap-2 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Level, {
										label: "支撑",
										value: g.support == null ? "没有" : g.support.toFixed(2)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Level, {
										label: "切入",
										value: g.entryLow == null || g.entryHigh == null ? "没有" : `${g.entryLow.toFixed(2)}–${g.entryHigh.toFixed(2)}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Level, {
										label: "压力",
										value: g.pressure.toFixed(2)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-muted",
								children: g.where
							})
						]
					}, s.code);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-lg",
						children: "查持仓"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "代码或名称",
						className: "mt-2 min-h-11 w-full rounded-xl border border-line bg-card px-3 text-base outline-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2",
						children: hits.map((s) => {
							const g = guide(s);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/s/$code",
								params: { code: s.code },
								className: "flex min-h-14 items-center justify-between gap-3 border-b border-line py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-medium",
									children: s.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted",
									children: [
										s.code,
										" · ",
										NOTES[s.code]?.role ?? "非核心",
										" · ",
										g.pattern
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-right text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block text-muted",
										children: ["切入 ", g.entryLow == null ? "没有" : `${g.entryLow.toFixed(2)}`]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted",
										children: ["压力 ", g.pressure.toFixed(2)]
									})]
								})]
							}, s.code);
						})
					})
				]
			})
		]
	});
}
function Level({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-paper px-1 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-sans text-xs font-medium leading-tight",
			children: value
		})]
	});
}
//#endregion
export { Home as component };
