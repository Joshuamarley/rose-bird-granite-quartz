import { createFileRoute, Link } from "@tanstack/react-router"
import { useMemo, useState } from "react"
import { guide, NOTES } from "@/lib/guide"
import { coreStocks, searchStocks } from "@/lib/market"

export const Route = createFileRoute("/")({ component: Home })

const LINES = ["全部", "医药", "锂电", "地产", "辅助"] as const

function Home() {
  const [line, setLine] = useState<(typeof LINES)[number]>("全部")
  const [q, setQ] = useState("")
  const cores = useMemo(() => coreStocks(line), [line])
  const hits = useMemo(() => searchStocks(q), [q])

  return (
    <main className="mx-auto min-h-screen max-w-lg px-4 pb-16 pt-6">
      <p className="font-sans text-xs tracking-[0.18em] text-muted">A股复盘 · 2026-09-30</p>
      <h1 className="mt-1 font-serif text-4xl font-semibold">复盘札记</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        给 10 月 8 日用。第 2 阶段轮动分歧，低仓。医药、锂电、地产是方向。基础 0 到 1 成，单只半成，确认后最多 2 成。
      </p>
      <section className="mt-5 rounded-2xl border border-line bg-card px-4 py-3">
        <h2 className="font-serif text-lg">情绪</h2>
        <p className="mt-1 text-sm leading-relaxed">
          弱修复里的分歧。上证 +0.31%，下跌家数仍多。涨停 56，炸板率 18.75%，1 进 2 约 13%。新华传媒 7 板不能当成全面回暖。
        </p>
        <p className="mt-2 text-xs text-muted">价位用的是 9 月 30 日最高、最低、收盘。切入是回撤带，不是叫你在现价买。</p>
      </section>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {LINES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setLine(item)}
            className={`min-h-11 shrink-0 rounded-full px-4 text-sm ${item === line ? "bg-ink text-paper" : "border border-line bg-card text-ink"}`}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="mt-2">
        {cores.map((s) => {
          const g = guide(s)
          const note = NOTES[s.code]
          return (
            <Link
              key={s.code}
              to="/s/$code"
              params={{ code: s.code }}
              className="mt-3 block rounded-2xl border border-line bg-card px-4 py-3"
            >
              <p className="text-xs text-cinnabar">
                {note?.line} · {note?.role} · {g.pattern}
              </p>
              <div className="mt-1 flex items-baseline justify-between gap-3">
                <h2 className="font-serif text-xl">{s.name}</h2>
                <p className={`font-sans text-sm ${s.chg >= 0 ? "text-cinnabar" : "text-pine"}`}>
                  {s.chg > 0 ? "+" : ""}
                  {s.chg.toFixed(2)}%
                </p>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <Level label="支撑" value={g.support == null ? "没有" : g.support.toFixed(2)} />
                <Level
                  label="切入"
                  value={g.entryLow == null || g.entryHigh == null ? "没有" : `${g.entryLow.toFixed(2)}–${g.entryHigh.toFixed(2)}`}
                />
                <Level label="压力" value={g.pressure.toFixed(2)} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{g.where}</p>
            </Link>
          )
        })}
      </section>

      <section className="mt-6">
        <h2 className="font-serif text-lg">查持仓</h2>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="代码或名称"
          className="mt-2 min-h-11 w-full rounded-xl border border-line bg-card px-3 text-base outline-none"
        />
        <div className="mt-2">
          {hits.map((s) => {
            const g = guide(s)
            return (
              <Link
                key={s.code}
                to="/s/$code"
                params={{ code: s.code }}
                className="flex min-h-14 items-center justify-between gap-3 border-b border-line py-2"
              >
                <span>
                  <span className="block font-medium">{s.name}</span>
                  <span className="text-xs text-muted">
                    {s.code} · {NOTES[s.code]?.role ?? "非核心"} · {g.pattern}
                  </span>
                </span>
                <span className="text-right text-xs">
                  <span className="block text-muted">切入 {g.entryLow == null ? "没有" : `${g.entryLow.toFixed(2)}`}</span>
                  <span className="text-muted">压力 {g.pressure.toFixed(2)}</span>
                </span>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}

function Level({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-paper px-1 py-2">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-sans text-xs font-medium leading-tight">{value}</p>
    </div>
  )
}
